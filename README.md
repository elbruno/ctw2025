# CTW 2025 - Tutorial: GitHub Copilot y Frameworks de AI

¡Bienvenido a este tutorial completo sobre GitHub Copilot y frameworks de inteligencia artificial! Este repositorio contiene ejemplos prácticos, guías paso a paso y mejores prácticas para usar GitHub Copilot con C#, Python, Java y Scala.

## 📚 Contenido

- [🚀 Introducción a GitHub Copilot](#-introducción-a-github-copilot)
- [🛠️ Configuración inicial](#️-configuración-inicial)
- [💻 Ejemplos por lenguaje](#-ejemplos-por-lenguaje)
  - [C# con GitHub Copilot](#c-con-github-copilot)
  - [Python con Frameworks de AI](#python-con-frameworks-de-ai)
  - [Java con Frameworks de AI](#java-con-frameworks-de-ai)
  - [Scala con Frameworks de AI](#scala-con-frameworks-de-ai)
- [📖 Mejores prácticas](#-mejores-prácticas)
- [🔧 Tips y trucos avanzados](#-tips-y-trucos-avanzados)
- [📚 Recursos adicionales](#-recursos-adicionales)

## 🚀 Introducción a GitHub Copilot

GitHub Copilot es un asistente de programación con IA que te ayuda a escribir código más rápido y eficientemente. Utiliza el modelo OpenAI Codex para sugerir código y funciones completas en tiempo real.

### ¿Qué puede hacer GitHub Copilot?

- ✅ Autocompletar líneas de código
- ✅ Generar funciones completas basadas en comentarios
- ✅ Sugerir algoritmos y estructuras de datos
- ✅ Ayudar con documentación y comentarios
- ✅ Convertir código entre diferentes lenguajes
- ✅ Generar pruebas unitarias
- ✅ Refactorizar código existente

## 🛠️ Configuración inicial

### Prerrequisitos

1. **Visual Studio Code** o **Visual Studio**
2. **Extensión de GitHub Copilot**
3. **Suscripción activa de GitHub Copilot**
4. **SDKs de los lenguajes** que vas a usar

### Instalación paso a paso

#### 1. Instalar GitHub Copilot

```bash
# Para VS Code
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

#### 2. Configurar los entornos de desarrollo

**Para C#:**
```bash
# Instalar .NET SDK
dotnet --version
```

**Para Python:**
```bash
# Instalar Python y pip
python --version
pip install --upgrade pip
```

**Para Java:**
```bash
# Verificar Java
java -version
javac -version
```

**Para Scala:**
```bash
# Instalar Scala y sbt
scala -version
sbt version
```

## 💻 Ejemplos por lenguaje

### C# con GitHub Copilot

Explora ejemplos prácticos de C# potenciados por GitHub Copilot:

- [🔗 Ejemplos básicos de C#](./examples/csharp/)
- [🤖 Integración con APIs de AI](./examples/csharp/ai-integration/)
- [🧪 Generación de pruebas automáticas](./examples/csharp/testing/)
- [🏗️ Patrones de arquitectura](./examples/csharp/patterns/)

### Python con Frameworks de AI

Descubre cómo usar GitHub Copilot con los frameworks de AI más populares:

- [🐍 Ejemplos básicos de Python](./examples/python/)
- [🧠 TensorFlow y Keras](./examples/python/tensorflow/)
- [⚡ PyTorch](./examples/python/pytorch/)
- [🤗 Hugging Face Transformers](./examples/python/huggingface/)
- [📊 Scikit-learn](./examples/python/sklearn/)
- [💬 LangChain](./examples/python/langchain/)

### Java con Frameworks de AI

Aprende a integrar GitHub Copilot con frameworks de AI en Java:

- [☕ Ejemplos básicos de Java](./examples/java/)
- [🧠 Deep Learning con DJL](./examples/java/djl/)
- [📊 Weka para Machine Learning](./examples/java/weka/)
- [🔧 Spring Boot con AI](./examples/java/spring-ai/)

### Scala con Frameworks de AI

Explora el poder de Scala y GitHub Copilot para AI:

- [⚡ Ejemplos básicos de Scala](./examples/scala/)
- [🚀 Spark MLlib](./examples/scala/spark/)
- [🔢 Breeze para computación numérica](./examples/scala/breeze/)

## 📖 Mejores prácticas

### 🎯 Escribir prompts efectivos

1. **Sé específico**: Describe claramente lo que quieres
2. **Usa comentarios descriptivos**: Copilot entiende mejor el contexto
3. **Proporciona ejemplos**: Muestra el patrón que esperas
4. **Incluye el tipo de retorno**: Especifica qué tipo de datos esperas

```csharp
// ✅ Buen prompt
// Función que valida un email usando regex y retorna bool
public bool ValidateEmail(string email)
{
    // GitHub Copilot generará el código aquí
}

// ❌ Mal prompt
// validar email
```

### 🔄 Iteración y refinamiento

- Acepta sugerencias parciales y continúa escribiendo
- Usa `Ctrl+Enter` para ver múltiples sugerencias
- Refina los prompts basándote en los resultados
- Combina sugerencias de Copilot con tu experiencia

### 🧪 Verificación y testing

- Siempre revisa el código generado
- Escribe pruebas para validar la funcionalidad
- Usa herramientas de análisis estático
- Considera casos edge y manejo de errores

## 🔧 Tips y trucos avanzados

### 💬 GitHub Copilot Chat

Usa el chat integrado para:
- Explicar código complejo
- Generar documentación
- Refactorizar código existente
- Crear pruebas unitarias
- Optimizar rendimiento

### ⚡ Atajos de teclado útiles

| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Aceptar sugerencia | `Tab` | `Tab` |
| Ver sugerencias | `Ctrl+Enter` | `Cmd+Enter` |
| Siguiente sugerencia | `Alt+]` | `Option+]` |
| Sugerencia anterior | `Alt+[` | `Option+[` |
| Abrir chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |

### 🎨 Personalización

Configura GitHub Copilot según tus preferencias:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false
  },
  "github.copilot.advanced": {
    "length": 500,
    "temperature": 0.1
  }
}
```

## 📚 Recursos adicionales

### 📖 Documentación oficial

- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [OpenAI Codex](https://openai.com/codex/)

### 🎓 Cursos y tutoriales

- [GitHub Copilot Fundamentals](https://github.com/skills/copilot-codespaces-vscode)
- [AI for Developers](https://learn.microsoft.com/en-us/ai/)

### 🛠️ Herramientas complementarias

- [GitHub Codespaces](https://github.com/features/codespaces)
- [Visual Studio IntelliCode](https://visualstudio.microsoft.com/services/intellicode/)
- [Tabnine](https://www.tabnine.com/)

### 🌐 Comunidad

- [GitHub Community](https://github.com/community)
- [Stack Overflow - GitHub Copilot](https://stackoverflow.com/questions/tagged/github-copilot)
- [Reddit - r/MachineLearning](https://www.reddit.com/r/MachineLearning/)

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork este repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**¡Feliz coding con GitHub Copilot! 🚀✨**