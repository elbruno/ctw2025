import React, { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Prompt: Componente React funcional para lista de tareas con funcionalidad CRUD
 * Debe usar hooks modernos, estado local, funciones memoizadas y renders optimizados
 * Incluir funciones de agregar, completar, eliminar, editar y filtrar tareas
 */

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'pending' | 'completed';

interface FilterOption {
  label: string;
  value: FilterType;
}

const TodoList: React.FC = () => {
  // Prompt: Estados principales usando useState
  // Incluir lista de tareas, filtro activo, tarea en edición y texto de nueva tarea
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTaskText, setNewTaskText] = useState('');

  // Prompt: useEffect para inicializar datos de ejemplo al montar componente
  useEffect(() => {
    const sampleTodos: Todo[] = [
      {
        id: generateId(),
        text: 'Aprender React con GitHub Copilot',
        completed: true,
        createdAt: new Date(Date.now() - 86400000), // Ayer
      },
      {
        id: generateId(),
        text: 'Crear componente de perfil de usuario',
        completed: false,
        createdAt: new Date(Date.now() - 3600000), // Hace 1 hora
      },
      {
        id: generateId(),
        text: 'Implementar hooks personalizados',
        completed: false,
        createdAt: new Date(), // Ahora
      },
    ];
    setTodos(sampleTodos);
  }, []);

  /**
   * Prompt: Función para generar ID único usando timestamp y random
   * Debe retornar string único para identificar tareas
   */
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  /**
   * Prompt: Opciones de filtro memoizadas con useMemo
   * Debe incluir todas, pendientes y completadas
   */
  const filterOptions: FilterOption[] = useMemo(() => [
    { label: '📋 Todas', value: 'all' },
    { label: '⏳ Pendientes', value: 'pending' },
    { label: '✅ Completadas', value: 'completed' },
  ], []);

  /**
   * Prompt: Tareas filtradas usando useMemo para optimizar renders
   * Debe filtrar según el tipo de filtro activo
   */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  /**
   * Prompt: Estadísticas calculadas con useMemo
   * Debe incluir total, completadas y pendientes
   */
  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
  }), [todos]);

  /**
   * Prompt: Función para agregar nueva tarea usando useCallback
   * Debe validar texto no vacío y agregar tarea al inicio de la lista
   */
  const addTask = useCallback(() => {
    if (newTaskText.trim()) {
      const newTodo: Todo = {
        id: generateId(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos(prev => [newTodo, ...prev]);
      setNewTaskText('');
    }
  }, [newTaskText]);

  /**
   * Prompt: Función para alternar estado completado usando useCallback
   * Debe encontrar tarea por ID y cambiar su estado
   */
  const toggleTask = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  /**
   * Prompt: Función para eliminar tarea usando useCallback
   * Debe filtrar array removiendo tarea con ID específico
   */
  const deleteTask = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  /**
   * Prompt: Función para iniciar edición usando useCallback
   * Debe establecer tarea en estado de edición
   */
  const startEditing = useCallback((todo: Todo) => {
    setEditingTodo({ ...todo });
  }, []);

  /**
   * Prompt: Función para guardar edición usando useCallback
   * Debe actualizar texto de la tarea y salir del modo edición
   */
  const saveEdit = useCallback((newText: string) => {
    if (editingTodo && newText.trim()) {
      setTodos(prev => prev.map(todo =>
        todo.id === editingTodo.id 
          ? { ...todo, text: newText.trim() }
          : todo
      ));
      setEditingTodo(null);
    }
  }, [editingTodo]);

  /**
   * Prompt: Función para cancelar edición usando useCallback
   * Debe limpiar estado de edición sin guardar cambios
   */
  const cancelEdit = useCallback(() => {
    setEditingTodo(null);
  }, []);

  /**
   * Prompt: Función para manejar tecla Enter en inputs
   * Debe ejecutar acción correspondiente según el contexto
   */
  const handleKeyPress = useCallback((
    e: React.KeyboardEvent,
    action: () => void
  ) => {
    if (e.key === 'Enter') {
      action();
    }
  }, []);

  /**
   * Prompt: Función para obtener mensaje cuando no hay tareas
   * Debe retornar mensaje contextual según el filtro activo
   */
  const getEmptyMessage = useCallback((): string => {
    switch (filter) {
      case 'completed':
        return '🎉 ¡No hay tareas completadas aún!';
      case 'pending':
        return '✨ ¡Todas las tareas están completadas!';
      default:
        return '📝 No hay tareas. ¡Agrega una nueva tarea para comenzar!';
    }
  }, [filter]);

  // Prompt: Estilos CSS-in-JS organizados por componente
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    addTaskForm: {
      display: 'flex',
      marginBottom: '20px',
      gap: '10px',
    },
    taskInput: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    },
    filters: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    stats: {
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    taskList: {
      backgroundColor: 'white',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #eee',
      transition: 'background-color 0.2s',
    },
    taskItemCompleted: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #eee',
      transition: 'background-color 0.2s',
      opacity: 0.7,
      backgroundColor: '#f1f3f4',
    },
    taskContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flex: 1,
    },
    taskText: {
      flex: 1,
      fontSize: '16px',
    },
    taskTextCompleted: {
      flex: 1,
      fontSize: '16px',
      textDecoration: 'line-through',
    },
    taskDate: {
      color: '#6c757d',
      fontSize: '12px',
    },
    taskActions: {
      display: 'flex',
      gap: '5px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6c757d',
      fontStyle: 'italic',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '300px',
    },
    modalActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px',
      justifyContent: 'flex-end',
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    buttonPrimary: { backgroundColor: '#007bff', color: 'white' },
    buttonSuccess: { backgroundColor: '#28a745', color: 'white' },
    buttonSecondary: { backgroundColor: '#6c757d', color: 'white' },
    buttonDanger: { backgroundColor: '#dc3545', color: 'white' },
    buttonFilter: { backgroundColor: '#e9ecef', color: '#495057' },
    buttonFilterActive: { backgroundColor: '#007bff', color: 'white' },
    buttonSmall: { padding: '4px 8px', fontSize: '12px' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Lista de Tareas con GitHub Copilot</h2>
      
      {/* Formulario para agregar tarea */}
      <div style={styles.addTaskForm}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, addTask)}
          style={styles.taskInput}
        />
        <button
          onClick={addTask}
          style={{ ...styles.button, ...styles.buttonPrimary }}
        >
          ➕ Agregar
        </button>
      </div>

      {/* Filtros */}
      <div style={styles.filters}>
        {filterOptions.map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            style={{
              ...styles.button,
              ...(filter === filterOption.value ? styles.buttonFilterActive : styles.buttonFilter),
            }}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Estadísticas */}
      <div style={styles.stats}>
        <p>
          📊 Total: {stats.total} | 
          ✅ Completadas: {stats.completed} | 
          ⏳ Pendientes: {stats.pending}
        </p>
      </div>

      {/* Lista de tareas */}
      {filteredTodos.length > 0 ? (
        <div style={styles.taskList}>
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              style={todo.completed ? styles.taskItemCompleted : styles.taskItem}
            >
              <div style={styles.taskContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTask(todo.id)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={todo.completed ? styles.taskTextCompleted : styles.taskText}>
                  {todo.text}
                </span>
                <small style={styles.taskDate}>
                  {todo.createdAt.toLocaleString()}
                </small>
              </div>
              <div style={styles.taskActions}>
                <button
                  onClick={() => startEditing(todo)}
                  disabled={todo.completed}
                  style={{
                    ...styles.button,
                    ...styles.buttonSmall,
                    ...styles.buttonSecondary,
                    opacity: todo.completed ? 0.6 : 1,
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSmall,
                    ...styles.buttonDanger,
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p>{getEmptyMessage()}</p>
        </div>
      )}

      {/* Modal de edición */}
      {editingTodo && (
        <div style={styles.modalOverlay} onClick={cancelEdit}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Editar Tarea</h3>
            <input
              type="text"
              defaultValue={editingTodo.text}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  saveEdit(target.value);
                }
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                margin: '10px 0',
              }}
              autoFocus
            />
            <div style={styles.modalActions}>
              <button
                onClick={() => {
                  const input = document.querySelector(
                    '.modal input'
                  ) as HTMLInputElement;
                  if (input) saveEdit(input.value);
                }}
                style={{ ...styles.button, ...styles.buttonSuccess }}
              >
                💾 Guardar
              </button>
              <button
                onClick={cancelEdit}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;