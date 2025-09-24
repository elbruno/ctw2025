package com.example.copilot;

import java.io.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Ejemplos básicos de Java con GitHub Copilot
 * Demuestra cómo escribir prompts efectivos para generar código Java
 */
public class CopilotExamples {
    
    public static void main(String[] args) {
        System.out.println("☕ Ejemplos básicos de Java con GitHub Copilot");
        System.out.println("=".repeat(60));
        
        try {
            // Ejemplo 1: Procesamiento de datos con Streams
            demonstrateStreamProcessing();
            
            // Ejemplo 2: Clases y POO
            demonstrateObjectOrientation();
            
            // Ejemplo 3: Manejo de archivos
            demonstrateFileOperations();
            
            // Ejemplo 4: HTTP Client
            demonstrateHttpClient();
            
            // Ejemplo 5: Programación funcional
            demonstrateFunctionalProgramming();
            
            System.out.println("\n✅ Todos los ejemplos completados!");
            
        } catch (Exception e) {
            System.err.println("❌ Error ejecutando ejemplos: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Prompt: Método que demuestra procesamiento de datos con Streams API
     * Debe incluir filtrado, mapping, agrupación y estadísticas
     */
    private static void demonstrateStreamProcessing() {
        System.out.println("\n📊 Ejemplo 1: Procesamiento de datos con Streams");
        
        // Crear datos de ejemplo
        List<Person> people = Arrays.asList(
            new Person("Ana", 25, "Engineering", 70000),
            new Person("Carlos", 30, "Marketing", 55000),
            new Person("María", 28, "Engineering", 72000),
            new Person("Juan", 35, "Sales", 48000),
            new Person("Laura", 27, "Engineering", 68000),
            new Person("Pedro", 32, "Marketing", 58000)
        );
        
        // Estadísticas por departamento
        Map<String, DoubleSummaryStatistics> salaryStatsByDept = people.stream()
            .collect(Collectors.groupingBy(
                Person::getDepartment,
                Collectors.summarizingDouble(Person::getSalary)
            ));
        
        System.out.println("Estadísticas salariales por departamento:");
        salaryStatsByDept.forEach((dept, stats) -> {
            System.out.printf("  %s: Promedio=%.2f, Min=%.2f, Max=%.2f, Count=%d%n",
                dept, stats.getAverage(), stats.getMin(), stats.getMax(), stats.getCount());
        });
        
        // Top 3 salarios más altos
        List<Person> topEarners = people.stream()
            .sorted(Comparator.comparingDouble(Person::getSalary).reversed())
            .limit(3)
            .collect(Collectors.toList());
        
        System.out.println("\nTop 3 salarios más altos:");
        topEarners.forEach(p -> System.out.printf("  %s: $%.2f%n", p.getName(), p.getSalary()));
        
        // Generar números primos usando Streams
        List<Integer> primes = IntStream.rangeClosed(2, 100)
            .filter(CopilotExamples::isPrime)
            .boxed()
            .collect(Collectors.toList());
        
        System.out.println("\nPrimeros 10 números primos: " + primes.subList(0, 10));
    }
    
    /**
     * Prompt: Método que verifica si un número es primo
     * Debe ser eficiente para números grandes
     */
    private static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Ejemplo de programación orientada a objetos
     */
    private static void demonstrateObjectOrientation() {
        System.out.println("\n🏗️ Ejemplo 2: Programación orientada a objetos");
        
        // Crear biblioteca con libros
        Library library = new Library("Biblioteca Central");
        
        library.addBook(new Book("1984", "George Orwell", "978-0451524935", 1949));
        library.addBook(new Book("Clean Code", "Robert Martin", "978-0132350884", 2008));
        library.addBook(new Book("Design Patterns", "Gang of Four", "978-0201633612", 1994));
        
        System.out.println("Biblioteca creada: " + library.getName());
        System.out.println("Total de libros: " + library.getTotalBooks());
        
        // Buscar libros
        List<Book> techBooks = library.searchByKeyword("code");
        System.out.println("\nLibros relacionados con 'code':");
        techBooks.forEach(book -> System.out.println("  - " + book.getTitle()));
        
        // Libros por década
        Map<Integer, List<Book>> booksByDecade = library.getBooks().stream()
            .collect(Collectors.groupingBy(book -> (book.getYear() / 10) * 10));
        
        System.out.println("\nLibros por década:");
        booksByDecade.forEach((decade, books) -> {
            System.out.printf("  %ds: %d libros%n", decade, books.size());
        });
    }
    
    /**
     * Prompt: Método que demuestra operaciones con archivos
     * Debe incluir escritura, lectura y procesamiento de JSON
     */
    private static void demonstrateFileOperations() throws IOException {
        System.out.println("\n💾 Ejemplo 3: Operaciones con archivos");
        
        Path tempDir = Paths.get(System.getProperty("java.io.tmpdir"));
        Path dataFile = tempDir.resolve("copilot_example.txt");
        Path jsonFile = tempDir.resolve("copilot_data.json");
        
        // Escribir datos a archivo
        List<String> lines = Arrays.asList(
            "Línea 1: Ejemplo con GitHub Copilot",
            "Línea 2: Procesamiento de archivos en Java",
            "Línea 3: Streams y NIO.2",
            "Línea 4: Programación funcional"
        );
        
        Files.write(dataFile, lines);
        System.out.println("Archivo escrito: " + dataFile);
        
        // Leer y procesar archivo
        Map<String, Object> fileStats = Files.lines(dataFile)
            .collect(HashMap::new,
                (map, line) -> {
                    map.put("totalLines", (Integer) map.getOrDefault("totalLines", 0) + 1);
                    map.put("totalChars", (Integer) map.getOrDefault("totalChars", 0) + line.length());
                    map.put("longestLine", Math.max(
                        (Integer) map.getOrDefault("longestLine", 0), line.length()));
                },
                (map1, map2) -> {}
            );
        
        System.out.println("Estadísticas del archivo: " + fileStats);
        
        // Crear JSON simple (sin librerías externas)
        String jsonData = String.format(
            "{\"timestamp\":\"%s\",\"stats\":%s,\"success\":true}",
            LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
            fileStats.toString().replace("=", ":")
        );
        
        Files.write(jsonFile, jsonData.getBytes());
        System.out.println("JSON escrito: " + jsonFile);
        
        // Limpiar archivos temporales
        Files.deleteIfExists(dataFile);
        Files.deleteIfExists(jsonFile);
    }
    
    /**
     * Prompt: Método que demuestra uso del HttpClient moderno de Java 11+
     * Debe hacer peticiones GET y POST con manejo de errores
     */
    private static void demonstrateHttpClient() throws Exception {
        System.out.println("\n🌐 Ejemplo 4: HTTP Client");
        
        HttpClient client = HttpClient.newHttpClient();
        
        // GET request
        HttpRequest getRequest = HttpRequest.newBuilder()
            .uri(URI.create("https://httpbin.org/json"))
            .header("Accept", "application/json")
            .GET()
            .build();
        
        CompletableFuture<HttpResponse<String>> getResponse = client.sendAsync(
            getRequest, HttpResponse.BodyHandlers.ofString());
        
        getResponse.thenAccept(response -> {
            System.out.println("GET Response Status: " + response.statusCode());
            System.out.println("Response Body (preview): " + 
                response.body().substring(0, Math.min(100, response.body().length())) + "...");
        }).join();
        
        // POST request
        String postData = "{\"message\":\"Hello from Java Copilot!\",\"timestamp\":\"" + 
            LocalDateTime.now() + "\"}";
        
        HttpRequest postRequest = HttpRequest.newBuilder()
            .uri(URI.create("https://httpbin.org/post"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(postData))
            .build();
        
        CompletableFuture<HttpResponse<String>> postResponse = client.sendAsync(
            postRequest, HttpResponse.BodyHandlers.ofString());
        
        postResponse.thenAccept(response -> {
            System.out.println("POST Response Status: " + response.statusCode());
            System.out.println("Request echoed successfully");
        }).join();
    }
    
    /**
     * Prompt: Método que demuestra programación funcional en Java
     * Debe incluir Function, Supplier, Consumer y method references
     */
    private static void demonstrateFunctionalProgramming() {
        System.out.println("\n⚡ Ejemplo 5: Programación funcional");
        
        // Functions
        Function<String, String> upperCaseFunction = String::toUpperCase;
        Function<String, Integer> lengthFunction = String::length;
        Function<String, Integer> upperAndLength = upperCaseFunction.andThen(lengthFunction);
        
        List<String> words = Arrays.asList("java", "copilot", "programming", "functional");
        
        // Usar functions con streams
        Map<String, Integer> wordLengths = words.stream()
            .collect(Collectors.toMap(
                upperCaseFunction,
                lengthFunction
            ));
        
        System.out.println("Palabras y sus longitudes:");
        wordLengths.forEach((word, length) -> 
            System.out.printf("  %s: %d caracteres%n", word, length));
        
        // Memoization example
        Function<Integer, Integer> expensiveCalculation = CopilotExamples::fibonacci;
        Function<Integer, Integer> memoizedFib = memoize(expensiveCalculation);
        
        System.out.println("\nSecuencia Fibonacci (con memoization):");
        IntStream.rangeClosed(1, 10)
            .forEach(i -> System.out.printf("F(%d) = %d ", i, memoizedFib.apply(i)));
        System.out.println();
        
        // Validation chain
        List<Function<String, Optional<String>>> validators = Arrays.asList(
            CopilotExamples::validateNotEmpty,
            CopilotExamples::validateEmail,
            CopilotExamples::validateEmailDomain
        );
        
        String testEmail = "user@example.com";
        Optional<String> validationResult = validators.stream()
            .map(validator -> validator.apply(testEmail))
            .filter(Optional::isPresent)
            .findFirst()
            .orElse(Optional.empty());
        
        System.out.println("\nValidación de email '" + testEmail + "': " + 
            (validationResult.isPresent() ? validationResult.get() : "✅ Válido"));
    }
    
    /**
     * Prompt: Método que implementa fibonacci con recursión simple
     * Para demostrar memoization
     */
    private static Integer fibonacci(Integer n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    /**
     * Prompt: Función que implementa memoization para cualquier función
     * Usa un cache concurrente para almacenar resultados
     */
    private static <T, R> Function<T, R> memoize(Function<T, R> function) {
        Map<T, R> cache = new HashMap<>();
        return input -> {
            return cache.computeIfAbsent(input, function);
        };
    }
    
    // Validators para demostrar programación funcional
    private static Optional<String> validateNotEmpty(String value) {
        return value == null || value.trim().isEmpty() ? 
            Optional.of("El valor no puede estar vacío") : Optional.empty();
    }
    
    private static Optional<String> validateEmail(String email) {
        Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
        return emailPattern.matcher(email).matches() ? 
            Optional.empty() : Optional.of("Formato de email inválido");
    }
    
    private static Optional<String> validateEmailDomain(String email) {
        return email.endsWith("@spam.com") ? 
            Optional.of("Dominio no permitido") : Optional.empty();
    }
}

/**
 * Clase Person generada con GitHub Copilot
 * Prompt: Clase inmutable que representa una persona empleada
 * Debe incluir validation y métodos utilitarios
 */
class Person {
    private final String name;
    private final int age;
    private final String department;
    private final double salary;
    
    public Person(String name, int age, String department, double salary) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre no puede estar vacío");
        }
        if (age < 18 || age > 100) {
            throw new IllegalArgumentException("La edad debe estar entre 18 y 100");
        }
        if (salary < 0) {
            throw new IllegalArgumentException("El salario no puede ser negativo");
        }
        
        this.name = name.trim();
        this.age = age;
        this.department = department;
        this.salary = salary;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    
    @Override
    public String toString() {
        return String.format("Person{name='%s', age=%d, department='%s', salary=%.2f}", 
            name, age, department, salary);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && 
               Double.compare(person.salary, salary) == 0 && 
               Objects.equals(name, person.name) && 
               Objects.equals(department, person.department);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age, department, salary);
    }
}

/**
 * Clase Book generada con GitHub Copilot
 * Prompt: Clase que representa un libro con ISBN, título, autor y año
 * Debe incluir validación de ISBN y métodos de búsqueda
 */
class Book {
    private final String title;
    private final String author;
    private final String isbn;
    private final int year;
    
    public Book(String title, String author, String isbn, int year) {
        this.title = Objects.requireNonNull(title, "El título no puede ser null");
        this.author = Objects.requireNonNull(author, "El autor no puede ser null");
        this.isbn = validateISBN(isbn);
        this.year = year;
    }
    
    private String validateISBN(String isbn) {
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN no puede estar vacío");
        }
        // Simplificada: validar formato básico
        String cleanISBN = isbn.replaceAll("[^0-9X]", "");
        if (cleanISBN.length() != 10 && cleanISBN.length() != 13) {
            throw new IllegalArgumentException("ISBN debe tener 10 o 13 dígitos");
        }
        return isbn;
    }
    
    // Getters
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public int getYear() { return year; }
    
    public boolean matchesKeyword(String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return title.toLowerCase().contains(lowerKeyword) || 
               author.toLowerCase().contains(lowerKeyword);
    }
    
    @Override
    public String toString() {
        return String.format("Book{title='%s', author='%s', year=%d}", title, author, year);
    }
}

/**
 * Clase Library generada con GitHub Copilot
 * Prompt: Clase que maneja una colección de libros
 * Debe incluir métodos de búsqueda, filtrado y estadísticas
 */
class Library {
    private final String name;
    private final List<Book> books;
    
    public Library(String name) {
        this.name = Objects.requireNonNull(name, "El nombre no puede ser null");
        this.books = new ArrayList<>();
    }
    
    public void addBook(Book book) {
        Objects.requireNonNull(book, "El libro no puede ser null");
        books.add(book);
    }
    
    public List<Book> getBooks() {
        return new ArrayList<>(books); // Defensive copy
    }
    
    public String getName() { return name; }
    
    public int getTotalBooks() { return books.size(); }
    
    public List<Book> searchByKeyword(String keyword) {
        return books.stream()
            .filter(book -> book.matchesKeyword(keyword))
            .collect(Collectors.toList());
    }
    
    public List<Book> getBooksByAuthor(String author) {
        return books.stream()
            .filter(book -> book.getAuthor().equalsIgnoreCase(author))
            .collect(Collectors.toList());
    }
    
    public OptionalDouble getAverageYear() {
        return books.stream()
            .mapToInt(Book::getYear)
            .average();
    }
}