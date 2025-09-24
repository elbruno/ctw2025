import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Prompt: Hook personalizado React para integración con ChatGPT/OpenAI
 * Debe manejar estado de conversación, loading, errores y rate limiting
 * Implementar persistencia local y optimización de performance
 */

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface UseChatGPTOptions {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  persistSessions?: boolean;
  autoSave?: boolean;
}

interface UseChatGPTReturn {
  // Estado actual
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  sendMessage: (content: string, sessionId?: string) => Promise<ChatMessage | null>;
  createNewSession: (title?: string) => ChatSession;
  selectSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearSession: (sessionId: string) => void;
  exportSession: (sessionId: string, format?: 'json' | 'markdown') => string;
  
  // Utilidades
  getTotalTokensUsed: (sessionId?: string) => number;
  getSessionCost: (sessionId: string) => number;
}

/**
 * Prompt: Hook principal para manejo de ChatGPT
 * Debe implementar todas las funcionalidades de chat con AI
 */
const useChatGPT = (options: UseChatGPTOptions = {}): UseChatGPTReturn => {
  const {
    apiKey = process.env.REACT_APP_OPENAI_API_KEY || '',
    model = 'gpt-3.5-turbo',
    maxTokens = 1000,
    temperature = 0.7,
    persistSessions = true,
    autoSave = true
  } = options;

  // Estados principales
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref para cancelar requests
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Prompt: useEffect para cargar sesiones desde localStorage al inicializar
   * Debe manejar errores de parsing y datos corruptos
   */
  useEffect(() => {
    if (persistSessions) {
      loadSessionsFromStorage();
    }
  }, [persistSessions]);

  /**
   * Prompt: useEffect para auto-guardar sesiones cuando cambien
   * Debe usar debounce para evitar guardado excesivo
   */
  useEffect(() => {
    if (autoSave && persistSessions && sessions.length > 0) {
      const timeoutId = setTimeout(() => {
        saveSessionsToStorage();
      }, 1000); // Debounce de 1 segundo

      return () => clearTimeout(timeoutId);
    }
  }, [sessions, autoSave, persistSessions]);

  /**
   * Prompt: Función para generar ID único usando timestamp y random
   */
  const generateId = useCallback((): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }, []);

  /**
   * Prompt: Función para crear nueva sesión de chat
   * Debe generar ID único y configurar sesión inicial
   */
  const createNewSession = useCallback((title?: string): ChatSession => {
    const session: ChatSession = {
      id: generateId(),
      title: title || `Chat ${new Date().toLocaleDateString()}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSessions(prev => [session, ...prev]);
    setCurrentSession(session);
    
    return session;
  }, [generateId]);

  /**
   * Prompt: Función para enviar mensaje a OpenAI API
   * Debe manejar rate limiting, errores y cancelación de requests
   */
  const sendMessage = useCallback(async (
    content: string, 
    sessionId?: string
  ): Promise<ChatMessage | null> => {
    // Cancelar request anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    let targetSession = sessionId 
      ? sessions.find(s => s.id === sessionId)
      : currentSession;

    if (!targetSession) {
      targetSession = createNewSession();
    }

    // Crear mensaje del usuario
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    // Actualizar sesión con mensaje del usuario
    const updatedSession = {
      ...targetSession,
      messages: [...targetSession.messages, userMessage],
      updatedAt: new Date()
    };

    setSessions(prev => prev.map(s => 
      s.id === updatedSession.id ? updatedSession : s
    ));
    
    if (currentSession?.id === updatedSession.id) {
      setCurrentSession(updatedSession);
    }

    setIsLoading(true);
    setError(null);

    // Crear controlador de abort para este request
    abortControllerRef.current = new AbortController();

    try {
      // Preparar mensajes para la API
      const apiMessages = updatedSession.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          model,
          messages: apiMessages,
          max_tokens: maxTokens,
          temperature,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data: OpenAIResponse = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'No response',
        timestamp: new Date(),
        tokens: data.usage?.total_tokens
      };

      // Actualizar sesión con respuesta del asistente
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, assistantMessage],
        updatedAt: new Date()
      };

      setSessions(prev => prev.map(s => 
        s.id === finalSession.id ? finalSession : s
      ));
      
      if (currentSession?.id === finalSession.id) {
        setCurrentSession(finalSession);
      }

      setIsLoading(false);
      return assistantMessage;

    } catch (err: any) {
      setIsLoading(false);
      
      if (err.name === 'AbortError') {
        return null; // Request fue cancelado
      }

      const errorMessage = handleApiError(err);
      setError(errorMessage);

      // Crear mensaje de error para mostrar al usuario
      const errorResponseMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      };

      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorResponseMessage],
        updatedAt: new Date()
      };

      setSessions(prev => prev.map(s => 
        s.id === errorSession.id ? errorSession : s
      ));
      
      if (currentSession?.id === errorSession.id) {
        setCurrentSession(errorSession);
      }

      return errorResponseMessage;
    }
  }, [
    sessions, 
    currentSession, 
    apiKey, 
    model, 
    maxTokens, 
    temperature, 
    generateId, 
    createNewSession
  ]);

  /**
   * Prompt: Función para seleccionar sesión activa
   * Debe actualizar currentSession y limpiar errores
   */
  const selectSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setError(null);
    }
  }, [sessions]);

  /**
   * Prompt: Función para eliminar sesión
   * Debe actualizar lista y seleccionar otra sesión si es necesario
   */
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    
    if (currentSession?.id === sessionId) {
      setSessions(prev => {
        setCurrentSession(prev[0] || null);
        return prev;
      });
    }
  }, [currentSession]);

  /**
   * Prompt: Función para limpiar mensajes de sesión
   * Debe mantener la sesión pero vaciar los mensajes
   */
  const clearSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, messages: [], updatedAt: new Date() }
        : session
    ));
    
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => prev ? { ...prev, messages: [] } : null);
    }
    
    setError(null);
  }, [currentSession]);

  /**
   * Prompt: Función para exportar sesión como JSON o Markdown
   * Debe formatear mensajes de manera legible
   */
  const exportSession = useCallback((
    sessionId: string, 
    format: 'json' | 'markdown' = 'json'
  ): string => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return '';

    if (format === 'markdown') {
      let markdown = `# ${session.title}\n\n`;
      markdown += `*Creado: ${session.createdAt.toLocaleString()}*\n\n`;
      
      session.messages.forEach(message => {
        const roleIcon = message.role === 'user' ? '👤' : '🤖';
        markdown += `## ${roleIcon} ${message.role.toUpperCase()}\n\n`;
        markdown += `${message.content}\n\n`;
        markdown += `*${message.timestamp.toLocaleString()}*\n\n---\n\n`;
      });
      
      return markdown;
    }

    return JSON.stringify(session, null, 2);
  }, [sessions]);

  /**
   * Prompt: Función para calcular tokens totales usados
   * Debe sumar tokens de todos los mensajes de una sesión
   */
  const getTotalTokensUsed = useCallback((sessionId?: string): number => {
    const targetSessions = sessionId 
      ? sessions.filter(s => s.id === sessionId)
      : sessions;

    return targetSessions.reduce((total, session) => {
      return total + session.messages.reduce((sessionTotal, message) => {
        return sessionTotal + (message.tokens || 0);
      }, 0);
    }, 0);
  }, [sessions]);

  /**
   * Prompt: Función para calcular costo estimado de sesión
   * Debe usar precios actuales de OpenAI (aproximados)
   */
  const getSessionCost = useCallback((sessionId: string): number => {
    const tokens = getTotalTokensUsed(sessionId);
    const costPerToken = model.includes('gpt-4') ? 0.00003 : 0.000002; // Precios aproximados
    return tokens * costPerToken;
  }, [getTotalTokensUsed, model]);

  /**
   * Prompt: Función para manejar errores de API
   * Debe extraer mensaje útil para mostrar al usuario
   */
  const handleApiError = (error: any): string => {
    if (error.message?.includes('API key')) {
      return 'API key inválida o no configurada';
    }
    
    if (error.message?.includes('429')) {
      return 'Límite de rate excedido. Intenta nuevamente en unos momentos';
    }
    
    if (error.message?.includes('insufficient_quota')) {
      return 'Cuota de API agotada. Verifica tu billing en OpenAI';
    }
    
    if (error.name === 'TypeError' && error.message?.includes('fetch')) {
      return 'Error de conexión. Verifica tu conexión a internet';
    }
    
    return error.message || 'Error desconocido al comunicarse con la API';
  };

  /**
   * Prompt: Función para cargar sesiones desde localStorage
   * Debe manejar errores de parsing y datos corruptos
   */
  const loadSessionsFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem('chat-sessions');
      if (stored) {
        const parsedSessions = JSON.parse(stored).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setSessions(parsedSessions);
        
        // Seleccionar la sesión más reciente si existe
        if (parsedSessions.length > 0) {
          setCurrentSession(parsedSessions[0]);
        }
      }
    } catch (error) {
      console.error('Error loading sessions from storage:', error);
      setSessions([]);
    }
  }, []);

  /**
   * Prompt: Función para guardar sesiones en localStorage
   * Debe manejar errores de quota exceeded
   */
  const saveSessionsToStorage = useCallback(() => {
    try {
      localStorage.setItem('chat-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions to storage:', error);
      // Aquí podrías implementar limpieza de sesiones viejas si la quota está llena
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Mantener solo las 10 sesiones más recientes
        const recentSessions = sessions.slice(0, 10);
        setSessions(recentSessions);
        try {
          localStorage.setItem('chat-sessions', JSON.stringify(recentSessions));
        } catch (retryError) {
          console.error('Failed to save even reduced sessions:', retryError);
        }
      }
    }
  }, [sessions]);

  return {
    // Estado
    currentSession,
    sessions,
    isLoading,
    error,
    
    // Acciones
    sendMessage,
    createNewSession,
    selectSession,
    deleteSession,
    clearSession,
    exportSession,
    
    // Utilidades
    getTotalTokensUsed,
    getSessionCost
  };
};

export default useChatGPT;