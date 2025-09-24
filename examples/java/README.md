# Java con GitHub Copilot y Frameworks de AI

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot con Java y frameworks de inteligencia artificial.

## 📁 Estructura de ejemplos

### ☕ [Básicos](./basic/)
- Sintaxis básica con Copilot
- POO y patrones comunes
- Collections y Streams

### 🧠 [Deep Java Library (DJL)](./djl/)
- Framework de deep learning para Java
- Modelos pre-entrenados
- Inferencia y entrenamiento

### 📊 [Weka](./weka/)
- Machine learning clásico
- Clustering y clasificación
- Evaluación de modelos

### 🔧 [Spring AI](./spring-ai/)
- Integración con Spring Boot
- APIs REST para AI
- Microservicios inteligentes

## 🚀 Primeros pasos

### Prerrequisitos

```bash
# Java 11 o superior
java -version
javac -version

# Maven o Gradle
mvn --version
# o
gradle --version
```

### Configuración del proyecto

#### Maven (pom.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>copilot-ai-java</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <!-- DJL Dependencies -->
        <dependency>
            <groupId>ai.djl</groupId>
            <artifactId>api</artifactId>
            <version>0.24.0</version>
        </dependency>
        
        <!-- Weka -->
        <dependency>
            <groupId>nz.ac.waikato.cms.weka</groupId>
            <artifactId>weka-stable</artifactId>
            <version>3.8.6</version>
        </dependency>
        
        <!-- Testing -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

### Configuración de VS Code

Extensiones recomendadas:
- Extension Pack for Java
- GitHub Copilot
- GitHub Copilot Chat
- Maven for Java
- Gradle for Java

Configuración en `settings.json`:
```json
{
    "java.configuration.updateBuildConfiguration": "automatic",
    "java.compile.nullAnalysis.mode": "automatic",
    "github.copilot.enable": {
        "java": true
    }
}
```

## 💡 Tips específicos para Java

### Prompts efectivos en Java

```java
// ✅ Buen prompt - específico con tipos y excepciones
/**
 * Método que procesa una lista de números y calcula estadísticas
 * @param numbers Lista de Double, puede contener nulls
 * @return Map con estadísticas (mean, median, std, min, max)
 * @throws IllegalArgumentException si la lista está vacía
 */
public Map<String, Double> calculateStatistics(List<Double> numbers) {
    // Copilot generará implementación completa con validaciones
}

// ✅ Clase con patrón Builder
/**
 * Clase que representa un modelo de ML con patrón Builder
 * Debe incluir validación de parámetros y serialización JSON
 */
public class MLModelConfig {
    // Copilot generará campos, builder y métodos
}
```

### Usando Copilot Chat para Java

Comandos útiles:
- `/explain` - Explica código Java complejo
- `/fix` - Sugiere correcciones para errores
- `/optimize` - Optimiza rendimiento y uso de memoria
- `/tests` - Genera tests con JUnit
- `/refactor` - Refactoriza usando patrones de diseño

### Patrones que Copilot maneja bien

1. **Singleton y Factory patterns**
2. **Builder pattern**
3. **Observer pattern**
4. **Stream API y lambdas**
5. **Exception handling**
6. **Generics y wildcards**
7. **Annotations**
8. **Spring annotations y DI**

## 🧪 Testing con JUnit

```java
// Prompt: Genera tests para el método calculateStatistics
// Debe incluir casos edge, nulls y listas vacías
@Test
public void testCalculateStatistics() {
    // Copilot generará múltiples casos de prueba
}
```

## 📊 Frameworks de AI recomendados

### Deep Java Library (DJL)
- Framework nativo de Java para deep learning
- Compatible con TensorFlow, PyTorch, MXNet
- Inferencia y entrenamiento
- Modelos pre-entrenados

### Weka
- Biblioteca clásica de machine learning
- Algoritmos de clasificación, clustering, regresión
- Interfaz gráfica y API
- Amplia documentación

### Spring AI
- Integración de AI con Spring ecosystem
- APIs REST para modelos de ML
- Microservicios inteligentes
- Observabilidad y métricas

## 🔧 Herramientas de desarrollo

### Build tools
- **Maven**: Gestión de dependencias tradicional
- **Gradle**: Build tool más moderno y flexible

### IDEs
- **IntelliJ IDEA**: IDE completo con excelente soporte para AI
- **Eclipse**: IDE tradicional con plugins
- **VS Code**: Editor ligero con extensiones Java

### Testing
- **JUnit 5**: Framework de testing moderno
- **Mockito**: Mocking framework
- **AssertJ**: Assertions fluidas

## 📚 Recursos adicionales

- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [Deep Java Library](https://djl.ai/)
- [Weka Documentation](https://waikato.github.io/weka-wiki/)
- [Spring AI](https://spring.io/projects/spring-ai)
- [Java Design Patterns](https://java-design-patterns.com/)