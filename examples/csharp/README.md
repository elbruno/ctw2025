# C# con GitHub Copilot

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot con C# para desarrollo de aplicaciones y integración con servicios de AI.

## 📁 Estructura de ejemplos

### 🔰 [Básicos](./basic/)
- Sintaxis básica con Copilot
- Generación de métodos simples
- Patrones comunes de C#

### 🤖 [Integración con AI](./ai-integration/)
- Llamadas a APIs de OpenAI
- Integración con Azure Cognitive Services
- Procesamiento de lenguaje natural

### 🧪 [Testing](./testing/)
- Generación automática de pruebas unitarias
- Mocking con GitHub Copilot
- Casos de prueba comprehensivos

### 🏗️ [Patrones](./patterns/)
- Patrones de diseño con Copilot
- SOLID principles
- Clean Architecture

## 🚀 Primeros pasos

### Prerequisitos

```bash
# Instalar .NET SDK (versión 8.0 o superior)
dotnet --version

# Crear nuevo proyecto
dotnet new console -n CopilotExample
cd CopilotExample
```

### Configuración de VS Code

1. Instala las extensiones necesarias:
   - C# for Visual Studio Code
   - GitHub Copilot
   - GitHub Copilot Chat

2. Configuración recomendada en `settings.json`:
```json
{
    "omnisharp.enableRoslynAnalyzers": true,
    "github.copilot.enable": {
        "csharp": true
    }
}
```

## 💡 Tips específicos para C#

### Prompts efectivos en C#

```csharp
// ✅ Buen prompt - específico y con contexto
// Método que convierte temperatura de Celsius a Fahrenheit
// Debe validar que el input no sea menor a -273.15 (cero absoluto)
// Retorna double, lanza ArgumentOutOfRangeException si es inválido
public double CelsiusToFahrenheit(double celsius)
{
    // Copilot generará una implementación completa
}

// ✅ Otro buen ejemplo - con tipo de retorno específico
// Clase que representa un cliente con validación de email
// Implementa INotifyPropertyChanged para binding
public class Customer : INotifyPropertyChanged
{
    // Copilot generará propiedades, validación y eventos
}
```

### Usando Copilot Chat para C#

Comandos útiles en el chat:
- `/explain` - Explica código C# complejo
- `/fix` - Sugiere correcciones para errores
- `/optimize` - Optimiza rendimiento del código
- `/tests` - Genera pruebas unitarias

### Patrones que Copilot maneja bien

1. **Repository Pattern**
2. **Dependency Injection**
3. **Async/Await patterns**
4. **LINQ queries**
5. **Exception handling**
6. **Logging patterns**

## 🔧 Herramientas recomendadas

- **NuGet packages**: 
  - Microsoft.Extensions.*
  - Newtonsoft.Json / System.Text.Json
  - xUnit / NUnit / MSTest
  - Moq / FakeItEasy
  
- **Analyzers**:
  - Microsoft.CodeAnalysis.Analyzers
  - StyleCop.Analyzers
  - SonarAnalyzer.CSharp

## 📚 Recursos adicionales

- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [C# Programming Guide](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [.NET API Browser](https://docs.microsoft.com/en-us/dotnet/api/)