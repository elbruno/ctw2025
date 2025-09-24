import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

/**
 * Prompt: Componente Angular para lista de tareas con funcionalidad CRUD
 * Debe usar RxJS observables, filtros y manejo de estado reactivo
 * Incluir funciones de agregar, completar, eliminar y filtrar tareas
 */
@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-container">
      <h2>📝 Lista de Tareas con GitHub Copilot</h2>
      
      <!-- Formulario para agregar tarea -->
      <div class="add-task-form">
        <input 
          #taskInput
          type="text" 
          placeholder="Nueva tarea..." 
          class="task-input"
          (keyup.enter)="addTask(taskInput.value); taskInput.value=''"
        >
        <button 
          (click)="addTask(taskInput.value); taskInput.value=''"
          class="btn btn-primary"
        >
          ➕ Agregar
        </button>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <button 
          *ngFor="let filter of filterOptions" 
          (click)="setFilter(filter.value)"
          [class.active]="currentFilter === filter.value"
          class="btn btn-filter"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Estadísticas -->
      <div class="stats">
        <p>
          📊 Total: {{ (todos$ | async)?.length || 0 }} | 
          ✅ Completadas: {{ completedCount$ | async }} | 
          ⏳ Pendientes: {{ pendingCount$ | async }}
        </p>
      </div>

      <!-- Lista de tareas -->
      <div class="task-list">
        <div 
          *ngFor="let todo of filteredTodos$ | async; trackBy: trackByTodo" 
          class="task-item"
          [class.completed]="todo.completed"
        >
          <div class="task-content">
            <input 
              type="checkbox" 
              [checked]="todo.completed"
              (change)="toggleTask(todo.id)"
              class="task-checkbox"
            >
            <span 
              class="task-text"
              [class.line-through]="todo.completed"
            >
              {{ todo.text }}
            </span>
            <small class="task-date">{{ todo.createdAt | date:'short' }}</small>
          </div>
          <div class="task-actions">
            <button 
              (click)="editTask(todo)"
              class="btn btn-sm btn-secondary"
              [disabled]="todo.completed"
            >
              ✏️
            </button>
            <button 
              (click)="deleteTask(todo.id)"
              class="btn btn-sm btn-danger"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay tareas -->
      <div *ngIf="(filteredTodos$ | async)?.length === 0" class="empty-state">
        <p>{{ getEmptyMessage() }}</p>
      </div>

      <!-- Modal de edición -->
      <div *ngIf="editingTodo" class="modal-overlay" (click)="cancelEdit()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h3>Editar Tarea</h3>
          <input 
            #editInput
            type="text" 
            [value]="editingTodo.text"
            class="form-control"
          >
          <div class="modal-actions">
            <button 
              (click)="saveEdit(editInput.value)"
              class="btn btn-success"
            >
              💾 Guardar
            </button>
            <button 
              (click)="cancelEdit()"
              class="btn btn-secondary"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .todo-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .add-task-form {
      display: flex;
      margin-bottom: 20px;
      gap: 10px;
    }

    .task-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary { background-color: #007bff; color: white; }
    .btn-secondary { background-color: #6c757d; color: white; }
    .btn-danger { background-color: #dc3545; color: white; }
    .btn-success { background-color: #28a745; color: white; }
    .btn-filter { background-color: #e9ecef; color: #495057; }
    .btn-filter.active { background-color: #007bff; color: white; }
    .btn-sm { padding: 4px 8px; font-size: 12px; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .stats {
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .task-list {
      background-color: white;
      border-radius: 4px;
      overflow: hidden;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s;
    }

    .task-item:hover {
      background-color: #f8f9fa;
    }

    .task-item.completed {
      opacity: 0.7;
      background-color: #f1f3f4;
    }

    .task-content {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    .task-checkbox {
      transform: scale(1.2);
    }

    .task-text {
      flex: 1;
      font-size: 16px;
    }

    .task-text.line-through {
      text-decoration: line-through;
    }

    .task-date {
      color: #6c757d;
      font-size: 12px;
    }

    .task-actions {
      display: flex;
      gap: 5px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-style: italic;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      justify-content: flex-end;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 10px 0;
    }
  `]
})
export class TodoListComponent implements OnInit {
  // Prompt: Usar BehaviorSubject para manejo de estado reactivo
  // Debe permitir emisión de nuevos valores y subscripción a cambios
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private filterSubject = new BehaviorSubject<FilterType>('all');
  currentFilter: FilterType = 'all';

  editingTodo: Todo | null = null;

  // Prompt: Configurar opciones de filtro con labels y valores
  filterOptions = [
    { label: '📋 Todas', value: 'all' as FilterType },
    { label: '⏳ Pendientes', value: 'pending' as FilterType },
    { label: '✅ Completadas', value: 'completed' as FilterType }
  ];

  // Prompt: Crear observables derivados para estadísticas
  // Usar operadores RxJS para calcular contadores en tiempo real
  completedCount$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.completed).length)
  );

  pendingCount$ = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.completed).length)
  );

  // Prompt: Observable para tareas filtradas según el filtro actual
  filteredTodos$ = this.todos$.pipe(
    map(todos => {
      switch (this.currentFilter) {
        case 'completed':
          return todos.filter(todo => todo.completed);
        case 'pending':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    })
  );

  ngOnInit(): void {
    // Prompt: Inicializar con datos de ejemplo
    // Crear array de tareas con diferentes estados
    this.initializeSampleData();
  }

  /**
   * Prompt: Método para agregar nueva tarea
   * Debe validar texto no vacío y crear tarea con ID único
   */
  addTask(text: string): void {
    if (text.trim()) {
      const newTodo: Todo = {
        id: this.generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };

      const currentTodos = this.todosSubject.value;
      this.todosSubject.next([...currentTodos, newTodo]);
    }
  }

  /**
   * Prompt: Método para alternar estado completado de tarea
   * Debe encontrar tarea por ID y cambiar su estado
   */
  toggleTask(id: string): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(updatedTodos);
  }

  /**
   * Prompt: Método para eliminar tarea
   * Debe filtrar array removiendo tarea con ID específico
   */
  deleteTask(id: string): void {
    const currentTodos = this.todosSubject.value;
    const filteredTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(filteredTodos);
  }

  /**
   * Prompt: Método para iniciar edición de tarea
   * Debe establecer tarea en estado de edición
   */
  editTask(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  /**
   * Prompt: Método para guardar edición de tarea
   * Debe actualizar texto y salir del modo edición
   */
  saveEdit(newText: string): void {
    if (this.editingTodo && newText.trim()) {
      const currentTodos = this.todosSubject.value;
      const updatedTodos = currentTodos.map(todo =>
        todo.id === this.editingTodo!.id 
          ? { ...todo, text: newText.trim() }
          : todo
      );
      this.todosSubject.next(updatedTodos);
      this.editingTodo = null;
    }
  }

  /**
   * Prompt: Método para cancelar edición
   * Debe limpiar estado de edición sin guardar cambios
   */
  cancelEdit(): void {
    this.editingTodo = null;
  }

  /**
   * Prompt: Método para establecer filtro activo
   * Debe actualizar filtro actual y filtrar tareas mostradas
   */
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  /**
   * Prompt: Función para trackBy en ngFor
   * Debe retornar identificador único para optimizar renderizado
   */
  trackByTodo(index: number, todo: Todo): string {
    return todo.id;
  }

  /**
   * Prompt: Método para obtener mensaje cuando no hay tareas
   * Debe retornar mensaje contextual según el filtro activo
   */
  getEmptyMessage(): string {
    switch (this.currentFilter) {
      case 'completed':
        return '🎉 ¡No hay tareas completadas aún!';
      case 'pending':
        return '✨ ¡Todas las tareas están completadas!';
      default:
        return '📝 No hay tareas. ¡Agrega una nueva tarea para comenzar!';
    }
  }

  /**
   * Prompt: Método privado para generar ID único
   * Debe retornar string único basado en timestamp y random
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Prompt: Método privado para inicializar datos de ejemplo
   * Debe crear varias tareas con diferentes estados y fechas
   */
  private initializeSampleData(): void {
    const sampleTodos: Todo[] = [
      {
        id: this.generateId(),
        text: 'Aprender Angular con GitHub Copilot',
        completed: true,
        createdAt: new Date(Date.now() - 86400000) // Ayer
      },
      {
        id: this.generateId(),
        text: 'Crear componente de perfil de usuario',
        completed: false,
        createdAt: new Date(Date.now() - 3600000) // Hace 1 hora
      },
      {
        id: this.generateId(),
        text: 'Implementar validación de formularios',
        completed: false,
        createdAt: new Date() // Ahora
      }
    ];

    this.todosSubject.next(sampleTodos);
  }
}

/**
 * Prompt: Interface para definir estructura de tarea
 * Debe incluir ID único, texto, estado y fecha de creación
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Prompt: Tipo para filtros de tareas
 * Debe incluir opciones: todas, pendientes, completadas
 */
export type FilterType = 'all' | 'pending' | 'completed';