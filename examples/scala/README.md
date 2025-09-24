# Scala con GitHub Copilot y Frameworks de AI

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot con Scala y frameworks de inteligencia artificial.

## 📁 Estructura de ejemplos

### ⚡ [Básicos](./basic/)
- Sintaxis básica con Copilot
- Programación funcional
- Case classes y pattern matching

### 🚀 [Apache Spark MLlib](./spark/)
- Machine learning distribuido
- DataFrames y Datasets
- Pipelines de ML

### 🔢 [Breeze](./breeze/)
- Computación numérica
- Álgebra lineal
- Análisis estadístico

## 🚀 Primeros pasos

### Prerrequisitos

```bash
# Scala 2.13 o 3.x
scala -version

# sbt (Scala Build Tool)
sbt version

# Java 8 o superior (para Spark)
java -version
```

### Configuración del proyecto (build.sbt)

```scala
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / scalaVersion := "2.13.12"

lazy val root = (project in file("."))
  .settings(
    name := "copilot-ai-scala",
    
    libraryDependencies ++= Seq(
      // Spark MLlib
      "org.apache.spark" %% "spark-core" % "3.5.0",
      "org.apache.spark" %% "spark-sql" % "3.5.0",
      "org.apache.spark" %% "spark-mllib" % "3.5.0",
      
      // Breeze
      "org.scalanlp" %% "breeze" % "2.1.0",
      "org.scalanlp" %% "breeze-viz" % "2.1.0",
      
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      
      // JSON
      "io.circe" %% "circe-core" % "0.14.6",
      "io.circe" %% "circe-generic" % "0.14.6",
      "io.circe" %% "circe-parser" % "0.14.6"
    )
  )
```

### Configuración de VS Code

Extensiones recomendadas:
- Scala (Metals)
- GitHub Copilot
- GitHub Copilot Chat

Configuración en `settings.json`:
```json
{
    "github.copilot.enable": {
        "scala": true
    },
    "metals.serverVersion": "latest.snapshot"
}
```

## 💡 Tips específicos para Scala

### Prompts efectivos en Scala

```scala
// ✅ Buen prompt - específico con tipos y funcional
/**
 * Función que procesa una lista de números usando programación funcional
 * Debe filtrar números pares, elevarlos al cuadrado y retornar la suma
 * Tipo: List[Int] => Int
 */
def processNumbers(numbers: List[Int]): Int = {
  // Copilot generará implementación funcional
}

// ✅ Case class con validación
/**
 * Case class que representa un modelo de ML con validación
 * Debe incluir hiperparámetros y métodos para serialización JSON
 */
case class MLModel(
  algorithm: String,
  hyperparameters: Map[String, Double],
  accuracy: Double
) {
  // Copilot generará validación y métodos
}
```

### Usando Copilot Chat para Scala

Comandos útiles:
- `/explain` - Explica código Scala funcional
- `/fix` - Sugiere correcciones idiomáticas
- `/optimize` - Optimiza usando colecciones inmutables
- `/refactor` - Refactoriza usando patrones funcionales

### Patrones que Copilot maneja bien

1. **Pattern matching exhaustivo**
2. **Higher-order functions**
3. **Monads y for-comprehensions**
4. **Case classes y ADTs**
5. **Implicits y type classes**
6. **Collections y transformaciones**
7. **Actor model (Akka)**
8. **Functional error handling**

## 🧪 Testing con ScalaTest

```scala
// Prompt: Genera tests para la función processNumbers
// Debe usar property-based testing y casos edge
class ProcessNumbersSpec extends AnyFunSuite with Matchers {
  // Copilot generará tests comprehensivos
}
```

## 📊 Frameworks de AI recomendados

### Apache Spark MLlib
- Machine learning distribuido
- Algoritmos escalables
- DataFrames y Datasets
- Pipelines de ML

### Breeze
- Computación numérica para Scala
- Álgebra lineal eficiente
- Análisis estadístico
- Visualización

### Otros frameworks
- **Smile**: Machine learning platform
- **Saddle**: Data manipulation library
- **Spire**: Numeric abstractions
- **Cats**: Functional programming abstractions

## 🔧 Herramientas de desarrollo

### Build tools
- **sbt**: Build tool estándar para Scala
- **Mill**: Build tool alternativo más rápido
- **Gradle**: Con plugin de Scala

### REPL y notebooks
- **Scala REPL**: Interactivo incluido
- **Ammonite**: REPL mejorado
- **Jupyter Scala**: Notebooks interactivos
- **Zeppelin**: Notebooks para big data

### Formateo y linting
- **Scalafmt**: Formateo automático
- **Scalafix**: Refactoring y linting
- **WartRemover**: Detección de anti-patrones

## 🚀 Conceptos únicos de Scala

### Programación funcional avanzada
```scala
// Higher-kinded types
def traverse[F[_]: Applicative, A, B](fa: List[A])(f: A => F[B]): F[List[B]]

// Type classes
trait Monoid[A] {
  def empty: A
  def combine(x: A, y: A): A
}

// For-comprehensions
for {
  a <- Option(1)
  b <- Option(2)
  c <- Option(3)
} yield a + b + c
```

### Pattern matching avanzado
```scala
// Extractors personalizados
object Email {
  def unapply(str: String): Option[(String, String)] = {
    val parts = str.split("@")
    if (parts.length == 2) Some(parts(0), parts(1)) else None
  }
}

// Guard conditions
x match {
  case n if n > 0 => "positive"
  case Email(name, domain) => s"email: $name at $domain"
  case _ => "other"
}
```

## 📚 Recursos adicionales

- [Scala Documentation](https://docs.scala-lang.org/)
- [Scala School](https://twitter.github.io/scala_school/)
- [Functional Programming in Scala](https://www.manning.com/books/functional-programming-in-scala)
- [Apache Spark Documentation](https://spark.apache.org/docs/latest/)
- [Breeze Documentation](https://github.com/scalanlp/breeze)

## 🌟 Ventajas de Scala para AI

1. **Expresividad**: Sintaxis concisa y potente
2. **Type safety**: Sistema de tipos avanzado
3. **Concurrencia**: Actor model y futures
4. **Interoperabilidad**: Compatible con Java ecosystem
5. **Big Data**: Spark nativo en Scala
6. **Functional**: Paradigma funcional puro
7. **Performance**: Compilado a bytecode JVM