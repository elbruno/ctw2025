import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Prompt: Componente Angular para mostrar y editar perfil de usuario
 * Debe incluir validación de formularios, eventos y manejo de estado
 * Usar reactive forms y validadores personalizados
 */
@Component({
  selector: 'app-user-profile',
  template: `
    <div class="user-profile-container">
      <h2>👤 Perfil de Usuario</h2>
      
      <!-- Modo vista -->
      <div *ngIf="!isEditing" class="profile-view">
        <div class="profile-info">
          <p><strong>Nombre:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Edad:</strong> {{ user.age }}</p>
          <p><strong>Departamento:</strong> {{ user.department }}</p>
        </div>
        <button (click)="enableEditing()" class="btn btn-primary">
          ✏️ Editar Perfil
        </button>
      </div>

      <!-- Modo edición -->
      <form *ngIf="isEditing" [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input 
            id="name" 
            type="text" 
            formControlName="name"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('name')"
          >
          <div *ngIf="isFieldInvalid('name')" class="invalid-feedback">
            El nombre es requerido y debe tener al menos 2 caracteres
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email" 
            type="email" 
            formControlName="email"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('email')"
          >
          <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
            Ingrese un email válido
          </div>
        </div>

        <div class="form-group">
          <label for="age">Edad:</label>
          <input 
            id="age" 
            type="number" 
            formControlName="age"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('age')"
          >
          <div *ngIf="isFieldInvalid('age')" class="invalid-feedback">
            La edad debe estar entre 18 y 120 años
          </div>
        </div>

        <div class="form-group">
          <label for="department">Departamento:</label>
          <select 
            id="department" 
            formControlName="department"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('department')"
          >
            <option value="">Seleccionar departamento</option>
            <option value="Engineering">Ingeniería</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Ventas</option>
            <option value="HR">Recursos Humanos</option>
            <option value="Finance">Finanzas</option>
          </select>
          <div *ngIf="isFieldInvalid('department')" class="invalid-feedback">
            Debe seleccionar un departamento
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="profileForm.invalid" class="btn btn-success">
            💾 Guardar Cambios
          </button>
          <button type="button" (click)="cancelEditing()" class="btn btn-secondary">
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-profile-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .profile-info {
      margin-bottom: 20px;
    }

    .profile-info p {
      margin: 8px 0;
      padding: 8px;
      background-color: white;
      border-radius: 4px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }

    .btn-primary { background-color: #007bff; color: white; }
    .btn-success { background-color: #28a745; color: white; }
    .btn-secondary { background-color: #6c757d; color: white; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .form-actions {
      margin-top: 20px;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  @Input() user: User = {
    name: '',
    email: '',
    age: 0,
    department: ''
  };

  @Output() userUpdated = new EventEmitter<User>();
  @Output() editingCancelled = new EventEmitter<void>();

  profileForm: FormGroup;
  isEditing = false;

  constructor(private formBuilder: FormBuilder) {
    // Prompt: Crear formulario reactivo con validadores
    // Incluir validaciones personalizadas para edad y email
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Prompt: Inicializar formulario con valores del usuario
    // Usar patchValue para establecer valores iniciales
    this.updateFormValues();
  }

  /**
   * Prompt: Método para habilitar modo edición
   * Debe actualizar los valores del formulario con los datos actuales del usuario
   */
  enableEditing(): void {
    this.isEditing = true;
    this.updateFormValues();
  }

  /**
   * Prompt: Método para cancelar edición
   * Debe resetear el formulario y volver al modo vista
   */
  cancelEditing(): void {
    this.isEditing = false;
    this.profileForm.reset();
    this.updateFormValues();
    this.editingCancelled.emit();
  }

  /**
   * Prompt: Método para manejar envío del formulario
   * Debe validar datos y emitir evento con usuario actualizado
   */
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.profileForm.value
      };
      
      this.user = updatedUser;
      this.isEditing = false;
      this.userUpdated.emit(updatedUser);
      
      console.log('Usuario actualizado:', updatedUser);
    }
  }

  /**
   * Prompt: Método para verificar si un campo tiene errores
   * Debe retornar true si el campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Prompt: Método privado para actualizar valores del formulario
   * Debe usar patchValue para sincronizar con el objeto user
   */
  private updateFormValues(): void {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      age: this.user.age,
      department: this.user.department
    });
  }
}

/**
 * Prompt: Interface para definir estructura del usuario
 * Debe incluir propiedades básicas con tipos explícitos
 */
export interface User {
  name: string;
  email: string;
  age: number;
  department: string;
}