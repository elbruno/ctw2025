# React con GitHub Copilot

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot para desarrollar aplicaciones React modernas con TypeScript y hooks.

## 📁 Estructura de ejemplos

### 🔰 [Básicos](./basic/)
- Componentes funcionales con hooks
- Manejo de estado con useState y useEffect
- Formularios controlados
- Optimización con useMemo y useCallback

### 🤖 [Integración con AI](./ai-integration/)
- Hooks personalizados para APIs
- Context API para estado global
- Suspense y Error Boundaries
- Fetch de datos con hooks

### 🧪 [Testing](./testing/)
- Testing con Jest y React Testing Library
- Mocking de hooks y APIs
- Test de componentes y hooks personalizados
- Snapshot testing

## 🚀 Primeros pasos

### Prerrequisitos

```bash
# Instalar Node.js y npm
node --version  # v18+
npm --version   # v9+

# Crear nueva aplicación React (opcional)
npx create-react-app my-app --template typescript
```

### Configuración del proyecto

```bash
# Clonar e instalar dependencias
cd examples/react
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 💡 Tips específicos para React

### Prompts efectivos en React

```tsx
// ✅ Buen prompt - específico con hooks y tipos
// Componente funcional para lista de productos con filtros
// Debe usar useState para filtros, useEffect para fetch de datos
// Implementar useMemo para cálculos pesados y useCallback para funciones
const ProductList: React.FC<ProductListProps> = ({ category }) => {
  // Copilot generará hooks y lógica del componente
};

// ✅ Hook personalizado para manejo de formularios
// Hook que debe manejar validación, estado y envío
// Retornar valores, errores, handlers y estado de loading
const useForm = <T>(initialValues: T, validationRules: ValidationRules<T>) => {
  // Copilot generará lógica del hook personalizado
};
```

### Usando Copilot Chat para React

Comandos útiles en el chat:
- `/explain` - Explica hooks y patrones de React
- `/fix` - Sugiere correcciones para hooks y renders
- `/optimize` - Optimiza renders y performance
- `/tests` - Genera tests con React Testing Library

### Patrones que Copilot maneja bien

1. **Hooks modernos**: useState, useEffect, useContext, useReducer
2. **Custom Hooks**: Lógica reutilizable y separación de concerns
3. **Performance optimization**: useMemo, useCallback, React.memo
4. **Context API**: Providers y consumers para estado global
5. **Error Boundaries**: Manejo de errores en componentes
6. **Suspense**: Loading states y lazy loading
7. **Controlled Components**: Formularios controlados
8. **Higher-Order Components**: Composición y reutilización

## 🎨 Características únicas de React

### 🪝 Hooks - La revolución funcional
```tsx
// Prompt: Hook personalizado para fetch de datos con loading y error
// Debe manejar estados de loading, data y error
// Incluir cleanup y cancelación de requests
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Copilot generará useEffect con fetch y cleanup
  
  return { data, loading, error };
};
```

### ⚡ Programación funcional
```tsx
// Prompt: Componente funcional puro con memoización
// Debe usar React.memo para evitar re-renders innecesarios
// Optimizar con useCallback para funciones pasadas como props
const MemoizedUserCard = React.memo<UserCardProps>(({ user, onEdit }) => {
  // Copilot generará componente optimizado
});
```

### 🎯 JSX - JavaScript y HTML unificados
```tsx
// Prompt: Renderizado condicional complejo con JSX
// Debe manejar múltiples estados: loading, error, vacío, con datos
// Usar fragments, operadores ternarios y && conditional
const DataDisplay: React.FC = () => {
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <DataList items={data} />
      )}
    </>
  );
};
```

### 🔄 Unidirectional Data Flow
```tsx
// Prompt: Flujo de datos unidireccional con lifting state up
// Componente padre debe manejar estado y pasar callbacks a hijos
// Implementar comunicación entre componentes hermanos
const ParentComponent: React.FC = () => {
  const [sharedState, setSharedState] = useState(initialState);
  
  const handleChildAction = useCallback((action: Action) => {
    // Copilot generará lógica de actualización de estado
  }, []);

  return (
    <>
      <ChildA onAction={handleChildAction} />
      <ChildB data={sharedState} />
    </>
  );
};
```

## 🧪 Testing con React Testing Library

### Configuración de pruebas

```tsx
// Prompt: Test setup para componente con props y context
// Debe usar render, screen y user events
// Mockear hooks personalizados y APIs
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('UserProfile Component', () => {
  const mockProps = {
    user: { id: 1, name: 'John Doe' },
    onUpdate: jest.fn()
  };

  // Copilot generará tests completos
});
```

### Casos de prueba comunes

1. **Component rendering**: Verificar que elementos se renderizan
2. **User interactions**: Simular clicks, typing, form submission
3. **Props testing**: Verificar que props se usan correctamente
4. **State changes**: Probar cambios de estado con user actions
5. **Custom hooks**: Testing de hooks aislados
6. **Context providers**: Testing con providers mockados

## 🔧 Herramientas recomendadas

### Extensiones de VS Code
- **ES7+ React/Redux/React-Native snippets**: Snippets útiles
- **Bracket Pair Colorizer**: Visualización de JSX
- **Auto Rename Tag**: Renombrar tags JSX automáticamente
- **Simple React Snippets**: Snippets básicos de React

### Linting y formateo
```json
{
  "scripts": {
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src/ --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md}",
    "test": "react-scripts test --watchAll=false"
  }
}
```

### Librerías complementarias populares
- **React Router**: Routing declarativo
- **React Query**: Data fetching y caching
- **Formik/React Hook Form**: Manejo de formularios
- **Styled Components**: CSS-in-JS
- **Material-UI/Chakra UI**: Component libraries

## 📚 Recursos adicionales

### 📖 Documentación oficial
- [React Docs](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)
- [Create React App](https://create-react-app.dev/)

### 🎓 Cursos y tutoriales
- [React Official Tutorial](https://react.dev/learn)
- [React Patterns](https://reactpatterns.com/)
- [Epic React by Kent C. Dodds](https://epicreact.dev/)

### 🛠️ Herramientas complementarias
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Storybook](https://storybook.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🌟 Ventajas de React para desarrollo moderno

### ✅ Ventajas principales
- **Simplicidad conceptual**: Solo es una library para UI
- **Hooks modernos**: Programación funcional y reutilización de lógica
- **Ecosystem gigante**: Miles de librerías y herramientas
- **Performance**: Virtual DOM y optimizaciones automáticas
- **Flexibilidad**: Se adapta a cualquier arquitectura
- **Community**: Comunidad más grande del frontend

### 📊 Casos de uso ideales
- **SPAs dinámicas y interactivas**
- **Aplicaciones con updates frecuentes de UI**
- **Proyectos que requieren máxima flexibilidad**
- **Startups y desarrollo ágil**
- **Aplicaciones con requisitos de performance**
- **Proyectos con equipos que prefieren JavaScript puro**

## 🆚 React vs Angular - Diferencias clave

### 🔧 Arquitectura
- **React**: Library minimalista, arquitectura flexible
- **Angular**: Framework completo, arquitectura opinionada

### 💻 Sintaxis
- **React**: JSX, hooks, programación funcional
- **Angular**: TypeScript, decoradores, templates separados

### 🎯 Curva de aprendizaje
- **React**: Más simple de empezar, más decisiones que tomar
- **Angular**: Más complejo inicialmente, pero más estructurado

### 🚀 Performance
- **React**: Virtual DOM, optimizaciones manuales con memo/callback
- **Angular**: Change detection, OnPush strategy, optimizaciones automáticas

---

## 🤝 Contribuyendo

Para contribuir con nuevos ejemplos:

1. Sigue las convenciones de hooks modernos
2. Incluye TypeScript types explícitos
3. Agrega tests con React Testing Library
4. Documenta hooks personalizados

---

**¡Feliz coding con React y GitHub Copilot! 🚀⚛️**