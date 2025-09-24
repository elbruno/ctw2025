import React, { useState, useEffect, useCallback } from 'react';

/**
 * Prompt: Componente React funcional para mostrar y editar perfil de usuario
 * Debe usar hooks (useState, useEffect, useCallback), validación y manejo de estado
 * Implementar modo vista y edición con formulario controlado
 */

interface User {
  name: string;
  email: string;
  age: number;
  department: string;
}

interface UserProfileProps {
  initialUser: User;
  onUserUpdated: (user: User) => void;
  onEditingCancelled: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  department?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  initialUser,
  onUserUpdated,
  onEditingCancelled,
}) => {
  // Prompt: Definir estados usando useState hook
  // Incluir estado para modo edición, datos del formulario y errores
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(initialUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Prompt: useEffect para detectar cambios en initialUser
  // Debe sincronizar formData cuando cambie el usuario inicial
  useEffect(() => {
    setFormData(initialUser);
    setHasChanges(false);
  }, [initialUser]);

  // Prompt: useEffect para detectar cambios en el formulario
  // Debe comparar formData con initialUser para establecer hasChanges
  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(initialUser);
    setHasChanges(hasFormChanges);
  }, [formData, initialUser]);

  /**
   * Prompt: Función de validación usando useCallback
   * Debe validar todos los campos y retornar objeto con errores
   */
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }

    // Validación de la edad
    if (!formData.age || formData.age < 18 || formData.age > 120) {
      newErrors.age = 'La edad debe estar entre 18 y 120 años';
    }

    // Validación del departamento
    if (!formData.department) {
      newErrors.department = 'Debe seleccionar un departamento';
    }

    return newErrors;
  }, [formData]);

  /**
   * Prompt: Función para manejar cambios en inputs usando useCallback
   * Debe actualizar formData y limpiar errores del campo modificado
   */
  const handleInputChange = useCallback((
    field: keyof User,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Prompt: Función para habilitar modo edición
   * Debe limpiar errores y establecer isEditing en true
   */
  const handleEnableEditing = useCallback(() => {
    setIsEditing(true);
    setErrors({});
  }, []);

  /**
   * Prompt: Función para cancelar edición
   * Debe resetear formData, errores y cambiar a modo vista
   */
  const handleCancelEditing = useCallback(() => {
    setFormData(initialUser);
    setErrors({});
    setIsEditing(false);
    setHasChanges(false);
    onEditingCancelled();
  }, [initialUser, onEditingCancelled]);

  /**
   * Prompt: Función para manejar envío del formulario
   * Debe validar, y si es válido, emitir evento con usuario actualizado
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onUserUpdated(formData);
      setIsEditing(false);
      setHasChanges(false);
      console.log('Usuario actualizado:', formData);
    }
  }, [formData, validateForm, onUserUpdated]);

  // Prompt: Lista de opciones para el select de departamento
  const departmentOptions = [
    { value: '', label: 'Seleccionar departamento' },
    { value: 'Engineering', label: 'Ingeniería' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Ventas' },
    { value: 'HR', label: 'Recursos Humanos' },
    { value: 'Finance', label: 'Finanzas' },
  ];

  // Prompt: CSS-in-JS styles usando objeto de estilos
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    profileInfo: {
      marginBottom: '20px',
    },
    profileItem: {
      margin: '8px 0',
      padding: '8px',
      backgroundColor: 'white',
      borderRadius: '4px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    inputError: {
      padding: '8px 12px',
      border: '1px solid #dc3545',
      borderRadius: '4px',
      fontSize: '14px',
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    error: {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '4px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    successButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    disabledButton: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    changesIndicator: {
      color: '#ffc107',
      fontSize: '12px',
      fontStyle: 'italic',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>👤 Perfil de Usuario</h2>
      
      {!isEditing ? (
        // Modo vista
        <div>
          <div style={styles.profileInfo}>
            <div style={styles.profileItem}>
              <strong>Nombre:</strong> {initialUser.name}
            </div>
            <div style={styles.profileItem}>
              <strong>Email:</strong> {initialUser.email}
            </div>
            <div style={styles.profileItem}>
              <strong>Edad:</strong> {initialUser.age}
            </div>
            <div style={styles.profileItem}>
              <strong>Departamento:</strong> {initialUser.department}
            </div>
          </div>
          <button
            onClick={handleEnableEditing}
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            ✏️ Editar Perfil
          </button>
        </div>
      ) : (
        // Modo edición
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              style={errors.name ? styles.inputError : styles.input}
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={errors.email ? styles.inputError : styles.input}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="age" style={styles.label}>
              Edad:
            </label>
            <input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              style={errors.age ? styles.inputError : styles.input}
            />
            {errors.age && <div style={styles.error}>{errors.age}</div>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="department" style={styles.label}>
              Departamento:
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              style={errors.department ? { ...styles.select, borderColor: '#dc3545' } : styles.select}
            >
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.department && <div style={styles.error}>{errors.department}</div>}
          </div>

          {hasChanges && (
            <div style={styles.changesIndicator}>
              ⚠️ Hay cambios sin guardar
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              style={{
                ...styles.button,
                ...styles.successButton,
                ...(Object.keys(errors).length > 0 ? styles.disabledButton : {}),
              }}
            >
              💾 Guardar Cambios
            </button>
            <button
              type="button"
              onClick={handleCancelEditing}
              style={{ ...styles.button, ...styles.secondaryButton }}
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;