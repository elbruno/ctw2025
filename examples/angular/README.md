# Angular con GitHub Copilot

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot para desarrollar aplicaciones Angular modernas con TypeScript.

## 📁 Estructura de ejemplos

### 🔰 [Básicos](./basic/)
- Componentes con formularios reactivos
- Manejo de estado con RxJS
- Validación y eventos
- Ciclo de vida de componentes

### 🤖 [Integración con AI](./ai-integration/)
- Servicios para APIs de AI
- Interceptores HTTP
- Manejo de errores
- Observables avanzados

### 🧪 [Testing](./testing/)
- Pruebas unitarias con Jasmine/Karma
- Testing de componentes
- Mocking de servicios
- E2E testing

## 🚀 Primeros pasos

### Prerrequisitos

```bash
# Instalar Node.js y npm
node --version  # v18+
npm --version   # v9+

# Instalar Angular CLI globalmente
npm install -g @angular/cli
```

### Configuración del proyecto

```bash
# Clonar e instalar dependencias
cd examples/angular
npm install

# Servir la aplicación en desarrollo
ng serve

# Construir para producción
ng build
```

## 💡 Tips específicos para Angular

### Prompts efectivos en Angular

```typescript
// ✅ Buen prompt - específico con decoradores y tipos
// Componente para mostrar lista de usuarios con paginación
// Debe usar @Input para datos, @Output para eventos
// Implementar OnInit y OnDestroy
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
  // Copilot generará propiedades y métodos
}

// ✅ Servicio con inyección de dependencias
// Servicio para manejo de autenticación con JWT
// Debe inyectar HttpClient y Router
// Implementar login, logout y verificación de token
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Copilot generará métodos de autenticación
}
```

### Usando Copilot Chat para Angular

Comandos útiles en el chat:
- `/explain` - Explica código Angular y RxJS
- `/fix` - Sugiere correcciones para errores de TypeScript
- `/optimize` - Optimiza rendimiento y OnPush strategy
- `/tests` - Genera tests con TestBed y mocking

### Patrones que Copilot maneja bien

1. **Reactive Forms**: FormBuilder, validators, form controls
2. **RxJS Observables**: Operators, subscriptions, async pipe
3. **Dependency Injection**: Services, providers, tokens
4. **Component Communication**: @Input, @Output, EventEmitter
5. **HTTP Interceptors**: Error handling, authentication
6. **Guards**: CanActivate, CanDeactivate, resolve
7. **Pipes**: Custom transformation pipes
8. **Directives**: Structural and attribute directives

## 🎨 Características únicas de Angular

### 🔧 Arquitectura basada en componentes
- **Decoradores**: @Component, @Injectable, @Directive
- **Módulos**: Organización y lazy loading
- **Inyección de dependencias**: Jerarquía de injectors

### 📊 RxJS y programación reactiva
```typescript
// Prompt: Stream de datos reactivo con RxJS operators
// Debe combinar múltiples observables y manejar errores
searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.searchService.search(term)),
  catchError(error => of([]))
);
```

### 🎯 Two-Way Data Binding
```typescript
// Prompt: Formulario con binding bidireccional
// Debe sincronizar vista y modelo automáticamente
<input [(ngModel)]="user.name" #nameInput="ngModel" required>
<div *ngIf="nameInput.invalid && nameInput.touched">
  Nombre es requerido
</div>
```

### 🛡️ TypeScript estricto
```typescript
// Prompt: Interface para tipado estricto
// Debe definir estructura de datos con propiedades opcionales
interface User {
  id: number;
  name: string;
  email: string;
  profile?: UserProfile;
}
```

## 🧪 Testing con Angular

### Configuración de pruebas

```typescript
// Prompt: Test setup para componente con dependencias
// Debe configurar TestBed, providers y mocking
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    // Copilot generará configuración completa
  });
});
```

### Casos de prueba comunes

1. **Component rendering**: Verificar que el componente se renderiza correctamente
2. **Input/Output testing**: Probar @Input properties y @Output events
3. **Service injection**: Mockear servicios inyectados
4. **Form validation**: Validar formularios reactivos
5. **HTTP calls**: Probar llamadas HTTP con HttpClientTestingModule

## 🔧 Herramientas recomendadas

### Extensiones de VS Code
- **Angular Language Service**: Intellisense para templates
- **Angular Snippets**: Snippets para código Angular
- **Auto Rename Tag**: Sincronizar tags HTML
- **Bracket Pair Colorizer**: Mejor visualización de brackets

### Linting y formateo
```json
{
  "scripts": {
    "lint": "ng lint",
    "format": "prettier --write src/**/*.{ts,html,scss}",
    "test": "ng test --watch=false --browsers=ChromeHeadless"
  }
}
```

## 📚 Recursos adicionales

### 📖 Documentación oficial
- [Angular Docs](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular CLI](https://cli.angular.io/)

### 🎓 Cursos y tutoriales
- [Angular University](https://angular-university.io/)
- [Tour of Heroes Tutorial](https://angular.io/tutorial)

### 🛠️ Herramientas complementarias
- [Angular DevTools](https://angular.io/guide/devtools)
- [Augury](https://augury.rangle.io/)
- [Nx Workspace](https://nx.dev/)

## 🌟 Ventajas de Angular para desarrollo empresarial

### ✅ Ventajas principales
- **Framework completo**: Todo incluido (routing, forms, HTTP, testing)
- **TypeScript nativo**: Tipado estricto y mejor tooling
- **Arquitectura escalable**: Módulos, lazy loading, inyección de dependencias
- **Ecosystem maduro**: Angular Material, CDK, Flex Layout
- **CLI potente**: Generación de código, builds optimizados
- **Enterprise ready**: Soporte LTS, testing integrado

### 📊 Casos de uso ideales
- **Aplicaciones empresariales grandes**
- **SPAs complejas con múltiples módulos**
- **Aplicaciones que requieren tipado estricto**
- **Proyectos con equipos grandes**
- **Aplicaciones con requisitos de testing exhaustivo**

---

## 🤝 Contribuyendo

Para contribuir con nuevos ejemplos:

1. Sigue la estructura de carpetas establecida
2. Incluye comentarios descriptivos para Copilot
3. Agrega tests para nuevos componentes
4. Actualiza la documentación

---

**¡Feliz coding con Angular y GitHub Copilot! 🚀⚡**