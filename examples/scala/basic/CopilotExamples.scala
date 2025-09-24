package com.example.copilot

import scala.util.{Try, Success, Failure, Random}
import scala.concurrent.{Future, ExecutionContext}
import scala.concurrent.duration._
import java.time.LocalDateTime
import java.io.{File, PrintWriter}
import scala.io.Source

/**
 * Ejemplos básicos de Scala con GitHub Copilot
 * Demuestra cómo escribir prompts efectivos para generar código Scala funcional
 */
object CopilotExamples extends App {
  
  implicit val ec: ExecutionContext = ExecutionContext.global
  
  println("⚡ Ejemplos básicos de Scala con GitHub Copilot")
  println("=" * 60)
  
  // Ejemplo 1: Programación funcional básica
  demonstrateFunctionalProgramming()
  
  // Ejemplo 2: Case classes y pattern matching
  demonstratePatternMatching()
  
  // Ejemplo 3: Collections y transformaciones
  demonstrateCollections()
  
  // Ejemplo 4: Manejo de errores funcional
  demonstrateErrorHandling()
  
  // Ejemplo 5: Concurrencia con Futures
  demonstrateConcurrency()
  
  println("\n✅ Todos los ejemplos completados!")
  
  /**
   * Prompt: Método que demuestra programación funcional en Scala
   * Debe incluir higher-order functions, currying y composición
   */
  def demonstrateFunctionalProgramming(): Unit = {
    println("\n🔄 Ejemplo 1: Programación funcional")
    
    // Higher-order functions
    val numbers = (1 to 10).toList
    
    val isEven: Int => Boolean = _ % 2 == 0
    val square: Int => Int = x => x * x
    val addTen: Int => Int = _ + 10
    
    // Composición de funciones
    val evenSquaredPlusTen = numbers
      .filter(isEven)
      .map(square andThen addTen)
    
    println(s"Números pares, al cuadrado y +10: $evenSquaredPlusTen")
    
    // Currying example
    def multiply(x: Int)(y: Int): Int = x * y
    val multiplyByFive = multiply(5)(_)
    
    val multipliedNumbers = numbers.take(5).map(multiplyByFive)
    println(s"Números multiplicados por 5: $multipliedNumbers")
    
    // Fold operations
    val sum = numbers.foldLeft(0)(_ + _)
    val product = numbers.foldLeft(1)(_ * _)
    val concatenated = numbers.map(_.toString).foldLeft("")(_ + _)
    
    println(s"Suma: $sum, Producto: $product, Concatenado: $concatenated")
    
    // Partial functions
    val partialFunction: PartialFunction[Any, String] = {
      case i: Int if i > 0 => s"Positive integer: $i"
      case s: String if s.nonEmpty => s"Non-empty string: $s"
      case d: Double => s"Double: $d"
    }
    
    val testValues = List(5, "hello", -3, 3.14, "")
    val results = testValues.collect(partialFunction)
    println(s"Partial function results: $results")
  }
  
  /**
   * Ejemplo de case classes y pattern matching
   */
  def demonstratePatternMatching(): Unit = {
    println("\n🎯 Ejemplo 2: Case classes y pattern matching")
    
    // Crear diferentes tipos de figuras
    val shapes = List(
      Circle(5.0),
      Rectangle(4.0, 6.0),
      Triangle(3.0, 4.0, 5.0),
      Circle(3.0)
    )
    
    println("Análisis de figuras:")
    shapes.foreach { shape =>
      val area = calculateArea(shape)
      val description = describeShape(shape)
      println(s"  $description -> Área: ${area}")
    }
    
    // Pattern matching con guards
    val numbers = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val classified = numbers.map(classifyNumber)
    println(s"\nClasificación de números: $classified")
    
    // Destructuring en pattern matching
    val people = List(
      Person("Ana", 25, "ana@example.com"),
      Person("Carlos", 17, "carlos@test.com"),
      Person("María", 30, "maria@company.com")
    )
    
    println("\nAnálisis de personas:")
    people.foreach { person =>
      val status = person match {
        case Person(name, age, email) if age >= 18 && email.contains("@company.com") =>
          s"$name es empleado adulto"
        case Person(name, age, _) if age >= 18 =>
          s"$name es adulto"
        case Person(name, age, _) =>
          s"$name es menor de edad ($age años)"
      }
      println(s"  $status")
    }
  }
  
  /**
   * Prompt: Función que calcula el área de diferentes figuras geométricas
   * Debe usar pattern matching exhaustivo y manejar todos los casos
   */
  def calculateArea(shape: Shape): Double = shape match {
    case Circle(radius) => math.Pi * radius * radius
    case Rectangle(width, height) => width * height
    case Triangle(a, b, c) =>
      // Fórmula de Herón
      val s = (a + b + c) / 2
      math.sqrt(s * (s - a) * (s - b) * (s - c))
  }
  
  /**
   * Prompt: Función que describe una figura geométrica
   * Debe retornar descripción legible usando pattern matching
   */
  def describeShape(shape: Shape): String = shape match {
    case Circle(radius) if radius > 10 => s"Círculo grande (radio: $radius)"
    case Circle(radius) => s"Círculo pequeño (radio: $radius)"
    case Rectangle(w, h) if w == h => s"Cuadrado (lado: $w)"
    case Rectangle(w, h) => s"Rectángulo (${w}x${h})"
    case Triangle(a, b, c) if a == b && b == c => s"Triángulo equilátero (lado: $a)"
    case Triangle(a, b, c) => s"Triángulo escaleno ($a, $b, $c)"
  }
  
  /**
   * Prompt: Función que clasifica números usando pattern matching con guards
   * Debe identificar primos, pares, impares y casos especiales
   */
  def classifyNumber(n: Int): String = n match {
    case 0 => "Cero"
    case 1 => "Uno"
    case x if x < 0 => "Negativo"
    case x if isPrime(x) => s"Primo: $x"
    case x if x % 2 == 0 => s"Par: $x"
    case x => s"Impar: $x"
  }
  
  /**
   * Ejemplo de collections y transformaciones
   */
  def demonstrateCollections(): Unit = {
    println("\n📊 Ejemplo 3: Collections y transformaciones")
    
    // Datos de ejemplo
    val students = List(
      Student("Ana", List(85, 92, 78, 90)),
      Student("Carlos", List(76, 88, 82, 79)),
      Student("María", List(95, 97, 93, 96)),
      Student("Juan", List(68, 72, 70, 74)),
      Student("Laura", List(88, 91, 87, 89))
    )
    
    // Calcular promedios
    val studentsWithAverage = students.map { student =>
      val average = student.grades.sum.toDouble / student.grades.length
      (student.name, average)
    }
    
    println("Promedios de estudiantes:")
    studentsWithAverage.foreach { case (name, avg) =>
      println(f"  $name: $avg%.2f")
    }
    
    // Top 3 estudiantes
    val topStudents = studentsWithAverage
      .sortBy(-_._2)
      .take(3)
    
    println("\nTop 3 estudiantes:")
    topStudents.zipWithIndex.foreach { case ((name, avg), index) =>
      println(f"  ${index + 1}. $name: $avg%.2f")
    }
    
    // Estadísticas por materia (asumiendo 4 materias)
    val subjectNames = List("Matemáticas", "Ciencias", "Historia", "Literatura")
    val subjectStats = (0 until 4).map { subjectIndex =>
      val grades = students.map(_.grades(subjectIndex))
      val average = grades.sum.toDouble / grades.length
      val max = grades.max
      val min = grades.min
      (subjectNames(subjectIndex), average, min, max)
    }
    
    println("\nEstadísticas por materia:")
    subjectStats.foreach { case (subject, avg, min, max) =>
      println(f"  $subject: Promedio=$avg%.2f, Min=$min, Max=$max")
    }
    
    // Uso de for-comprehensions
    val highPerformers = for {
      student <- students
      if student.grades.forall(_ >= 80)
      averageGrade = student.grades.sum.toDouble / student.grades.length
      if averageGrade >= 85
    } yield (student.name, averageGrade)
    
    println(s"\nEstudiantes de alto rendimiento: $highPerformers")
  }
  
  /**
   * Ejemplo de manejo de errores funcional
   */
  def demonstrateErrorHandling(): Unit = {
    println("\n⚠️ Ejemplo 4: Manejo de errores funcional")
    
    // Try para operaciones que pueden fallar
    val divisionResults = List((10, 2), (15, 3), (8, 0), (20, 4))
      .map { case (a, b) => safeDivision(a, b) }
    
    println("Resultados de divisiones:")
    divisionResults.foreach {
      case Success(result) => println(s"  Éxito: $result")
      case Failure(exception) => println(s"  Error: ${exception.getMessage}")
    }
    
    // Option para valores que pueden no existir
    val numbers = List("1", "2", "abc", "4", "xyz", "6")
    val parsedNumbers = numbers.map(parseNumber)
    
    println("\nNúmeros parseados:")
    parsedNumbers.foreach {
      case Some(n) => println(s"  Número válido: $n")
      case None => println("  Número inválido")
    }
    
    // Composición de Option con for-comprehension
    val result = for {
      a <- parseNumber("10")
      b <- parseNumber("5")
      c <- parseNumber("2")
    } yield (a + b) * c
    
    println(s"Resultado de operación compuesta: ${result.getOrElse("Error")}")
    
    // Either para errores más descriptivos
    val fileOperations = List("valid.txt", "", "another.txt")
      .map(processFile)
    
    println("\nOperaciones de archivo:")
    fileOperations.foreach {
      case Right(content) => println(s"  Éxito: $content")
      case Left(error) => println(s"  Error: $error")
    }
  }
  
  /**
   * Prompt: Función que divide dos números de forma segura
   * Debe retornar Try[Double] y manejar división por cero
   */
  def safeDivision(a: Int, b: Int): Try[Double] = Try {
    if (b == 0) throw new ArithmeticException("División por cero")
    a.toDouble / b
  }
  
  /**
   * Prompt: Función que parsea string a número de forma segura
   * Debe retornar Option[Int] y manejar formatos inválidos
   */
  def parseNumber(str: String): Option[Int] = Try(str.toInt).toOption
  
  /**
   * Prompt: Función que simula procesamiento de archivo
   * Debe retornar Either[String, String] para errores descriptivos
   */
  def processFile(filename: String): Either[String, String] = {
    if (filename.isEmpty) {
      Left("Nombre de archivo vacío")
    } else if (!filename.endsWith(".txt")) {
      Left("Archivo debe tener extensión .txt")
    } else {
      Right(s"Contenido del archivo: $filename")
    }
  }
  
  /**
   * Ejemplo de concurrencia con Futures
   */
  def demonstrateConcurrency(): Unit = {
    println("\n🚀 Ejemplo 5: Concurrencia con Futures")
    
    // Crear futures para operaciones asíncronas
    val future1 = simulateAsyncOperation("Operación 1", 1000)
    val future2 = simulateAsyncOperation("Operación 2", 1500)
    val future3 = simulateAsyncOperation("Operación 3", 800)
    
    // Combinar futures
    val combinedFuture = for {
      result1 <- future1
      result2 <- future2
      result3 <- future3
    } yield List(result1, result2, result3)
    
    // Esperar resultados (no recomendado en producción)
    Try {
      val results = scala.concurrent.Await.result(combinedFuture, 5.seconds)
      println("Resultados de operaciones asíncronas:")
      results.foreach(println)
    }.recover {
      case exception => println(s"Error en operaciones asíncronas: ${exception.getMessage}")
    }
    
    // Future con transformaciones
    val processedFuture = future1
      .map(_.toUpperCase)
      .filter(_.contains("OPERACIÓN"))
      .recover { case _ => "OPERACIÓN FALLIDA" }
    
    Try {
      val processed = scala.concurrent.Await.result(processedFuture, 2.seconds)
      println(s"Resultado procesado: $processed")
    }
  }
  
  /**
   * Prompt: Función que simula operación asíncrona con delay
   * Debe retornar Future[String] y simular trabajo real
   */
  def simulateAsyncOperation(name: String, delayMs: Int): Future[String] = Future {
    Thread.sleep(delayMs)
    s"$name completada en ${delayMs}ms"
  }
  
  /**
   * Prompt: Función que verifica si un número es primo
   * Debe ser eficiente para números grandes usando recursión de cola
   */
  @scala.annotation.tailrec
  def isPrimeTailRec(n: Int, divisor: Int = 2): Boolean = {
    if (n <= 1) false
    else if (n <= 3) true
    else if (n % divisor == 0) false
    else if (divisor * divisor > n) true
    else isPrimeTailRec(n, divisor + 1)
  }
  
  def isPrime(n: Int): Boolean = isPrimeTailRec(n)
}

/**
 * Sealed trait para figuras geométricas
 * Prompt: Define ADT para diferentes tipos de figuras
 * Debe ser exhaustivo y type-safe
 */
sealed trait Shape

case class Circle(radius: Double) extends Shape
case class Rectangle(width: Double, height: Double) extends Shape
case class Triangle(a: Double, b: Double, c: Double) extends Shape

/**
 * Case class para persona
 * Prompt: Clase inmutable que representa una persona
 * Debe incluir validación básica en el constructor
 */
case class Person(name: String, age: Int, email: String) {
  require(name.nonEmpty, "El nombre no puede estar vacío")
  require(age >= 0, "La edad no puede ser negativa")
  require(email.contains("@"), "Email debe contener @")
  
  def isAdult: Boolean = age >= 18
  def domain: String = email.split("@")(1)
}

/**
 * Case class para estudiante
 * Prompt: Clase que representa un estudiante con calificaciones
 * Debe incluir métodos para calcular estadísticas
 */
case class Student(name: String, grades: List[Int]) {
  require(name.nonEmpty, "El nombre no puede estar vacío")
  require(grades.nonEmpty, "Debe tener al menos una calificación")
  require(grades.forall(g => g >= 0 && g <= 100), "Las calificaciones deben estar entre 0 y 100")
  
  def average: Double = grades.sum.toDouble / grades.length
  def highestGrade: Int = grades.max
  def lowestGrade: Int = grades.min
  def isPassing: Boolean = average >= 60
  
  def letterGrade: String = average match {
    case avg if avg >= 90 => "A"
    case avg if avg >= 80 => "B"
    case avg if avg >= 70 => "C"
    case avg if avg >= 60 => "D"
    case _ => "F"
  }
}

/**
 * Object companion con factory methods
 * Prompt: Factory methods para crear estudiantes con validación
 */
object Student {
  def create(name: String, grades: Int*): Option[Student] = {
    Try(Student(name, grades.toList)).toOption
  }
  
  def createWithAverage(name: String, targetAverage: Double, numGrades: Int): Student = {
    require(numGrades > 0, "Debe tener al menos una calificación")
    val baseGrade = targetAverage.toInt
    val grades = List.fill(numGrades)(baseGrade)
    Student(name, grades)
  }
}