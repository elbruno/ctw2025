import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * Prompt: Servicio Angular para integración con APIs de ChatGPT/OpenAI
 * Debe manejar autenticación, rate limiting y streaming de respuestas
 * Implementar patrón Observer para actualizaciones en tiempo real
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OpenAIResponse {
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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly API_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly API_KEY = 'your-openai-api-key'; // En producción usar environment
  
  // Prompt: BehaviorSubject para manejo de estado reactivo
  // Debe mantener sesiones activas y mensajes en tiempo real
  private _currentSession = new BehaviorSubject<ChatSession | null>(null);
  private _sessions = new BehaviorSubject<ChatSession[]>([]);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);
  
  // Observables públicos para componentes
  public currentSession$ = this._currentSession.asObservable();
  public sessions$ = this._sessions.asObservable();
  public isLoading$ = this._isLoading.asObservable();
  public error$ = this._error.asObservable();
  
  // Subject para streaming de mensajes (para futuras implementaciones)
  private _messageStream = new Subject<Partial<ChatMessage>>();
  public messageStream$ = this._messageStream.asObservable();

  constructor(private http: HttpClient) {
    this.loadSessionsFromStorage();
  }

  /**
   * Prompt: Método para crear nueva sesión de chat
   * Debe generar ID único y configurar sesión inicial
   */
  createNewSession(title?: string): ChatSession {
    const session: ChatSession = {
      id: this.generateId(),
      title: title || `Chat ${new Date().toLocaleDateString()}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentSessions = this._sessions.value;
    this._sessions.next([session, ...currentSessions]);
    this._currentSession.next(session);
    
    this.saveSessionsToStorage();
    return session;
  }

  /**
   * Prompt: Método para enviar mensaje a OpenAI API
   * Debe manejar rate limiting, errores y streaming
   */
  sendMessage(content: string, sessionId?: string): Observable<ChatMessage> {
    let session = sessionId 
      ? this._sessions.value.find(s => s.id === sessionId)
      : this._currentSession.value;

    if (!session) {
      session = this.createNewSession();
    }

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    this.addMessageToSession(session.id, userMessage);
    this._isLoading.next(true);
    this._error.next(null);

    // Preparar contexto para la API
    const messages = session.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json'
    });

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false // Para streaming usar true y manejar SSE
    };

    return this.http.post<OpenAIResponse>(this.API_URL, payload, { headers }).pipe(
      map(response => {
        const assistantMessage: ChatMessage = {
          id: this.generateId(),
          role: 'assistant',
          content: response.choices[0]?.message?.content || 'No response',
          timestamp: new Date(),
          tokens: response.usage?.total_tokens
        };

        this.addMessageToSession(session!.id, assistantMessage);
        return assistantMessage;
      }),
      tap(() => this._isLoading.next(false)),
      catchError(error => {
        this._isLoading.next(false);
        this._error.next(this.handleError(error));
        
        // Crear mensaje de error para mostrar al usuario
        const errorMessage: ChatMessage = {
          id: this.generateId(),
          role: 'assistant',
          content: `Error: ${this.handleError(error)}`,
          timestamp: new Date()
        };
        
        this.addMessageToSession(session!.id, errorMessage);
        return of(errorMessage);
      })
    );
  }

  /**
   * Prompt: Método para seleccionar sesión activa
   * Debe actualizar BehaviorSubject y notificar componentes
   */
  selectSession(sessionId: string): void {
    const session = this._sessions.value.find(s => s.id === sessionId);
    if (session) {
      this._currentSession.next(session);
    }
  }

  /**
   * Prompt: Método para eliminar sesión
   * Debe actualizar lista y seleccionar otra sesión si es necesario
   */
  deleteSession(sessionId: string): void {
    const sessions = this._sessions.value.filter(s => s.id !== sessionId);
    this._sessions.next(sessions);

    const currentSession = this._currentSession.value;
    if (currentSession?.id === sessionId) {
      this._currentSession.next(sessions[0] || null);
    }

    this.saveSessionsToStorage();
  }

  /**
   * Prompt: Método para limpiar mensajes de sesión
   * Debe mantener la sesión pero vaciar los mensajes
   */
  clearSession(sessionId: string): void {
    const sessions = this._sessions.value.map(session => 
      session.id === sessionId 
        ? { ...session, messages: [], updatedAt: new Date() }
        : session
    );
    
    this._sessions.next(sessions);
    
    const currentSession = this._currentSession.value;
    if (currentSession?.id === sessionId) {
      this._currentSession.next({ ...currentSession, messages: [] });
    }

    this.saveSessionsToStorage();
  }

  /**
   * Prompt: Método para exportar sesión como JSON o Markdown
   * Debe formatear mensajes de manera legible
   */
  exportSession(sessionId: string, format: 'json' | 'markdown' = 'json'): string {
    const session = this._sessions.value.find(s => s.id === sessionId);
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
  }

  /**
   * Prompt: Método privado para agregar mensaje a sesión
   * Debe actualizar sesión existente y notificar cambios
   */
  private addMessageToSession(sessionId: string, message: ChatMessage): void {
    const sessions = this._sessions.value.map(session => 
      session.id === sessionId 
        ? { 
            ...session, 
            messages: [...session.messages, message],
            updatedAt: new Date()
          }
        : session
    );
    
    this._sessions.next(sessions);
    
    const currentSession = this._currentSession.value;
    if (currentSession?.id === sessionId) {
      this._currentSession.next({
        ...currentSession,
        messages: [...currentSession.messages, message]
      });
    }

    this.saveSessionsToStorage();
  }

  /**
   * Prompt: Método para generar ID único
   * Debe usar timestamp y random para garantizar unicidad
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Prompt: Método para manejar errores de API
   * Debe extraer mensaje de error útil para mostrar al usuario
   */
  private handleError(error: any): string {
    if (error.error?.error?.message) {
      return error.error.error.message;
    }
    
    if (error.status === 401) {
      return 'API key inválida o expirada';
    }
    
    if (error.status === 429) {
      return 'Límite de rate excedido. Intenta nuevamente en unos momentos';
    }
    
    if (error.status === 0) {
      return 'Error de conexión. Verifica tu conexión a internet';
    }
    
    return error.message || 'Error desconocido';
  }

  /**
   * Prompt: Método para cargar sesiones desde localStorage
   * Debe manejar errores de parsing y datos corruptos
   */
  private loadSessionsFromStorage(): void {
    try {
      const stored = localStorage.getItem('chat-sessions');
      if (stored) {
        const sessions = JSON.parse(stored).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        this._sessions.next(sessions);
      }
    } catch (error) {
      console.error('Error loading sessions from storage:', error);
      this._sessions.next([]);
    }
  }

  /**
   * Prompt: Método para guardar sesiones en localStorage
   * Debe manejar errores de quota exceeded
   */
  private saveSessionsToStorage(): void {
    try {
      const sessions = this._sessions.value;
      localStorage.setItem('chat-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions to storage:', error);
      // Aquí podrías implementar limpieza de sesiones viejas si la quota está llena
    }
  }
}