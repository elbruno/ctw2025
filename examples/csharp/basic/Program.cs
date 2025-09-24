using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CopilotBasicExamples
{
    /// <summary>
    /// Ejemplos básicos de C# con GitHub Copilot
    /// Demuestra cómo escribir prompts efectivos para generar código
    /// </summary>
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("🚀 Ejemplos básicos de C# con GitHub Copilot");
            Console.WriteLine(new string('=', 50));

            // Ejemplo 1: Generación de métodos simples
            await ExampleSimpleMethods();
            
            // Ejemplo 2: Trabajo con colecciones
            ExampleCollections();
            
            // Ejemplo 3: Clases y objetos
            ExampleClassesAndObjects();
            
            // Ejemplo 4: Manejo de errores
            ExampleErrorHandling();
            
            Console.WriteLine("\n✅ Todos los ejemplos completados!");
            Console.ReadKey();
        }

        /// <summary>
        /// Ejemplo de métodos simples generados con Copilot
        /// </summary>
        static async Task ExampleSimpleMethods()
        {
            Console.WriteLine("\n📝 Ejemplo 1: Métodos simples");
            
            // Prompt: Método que calcula el área de un círculo dado su radio
            // Debe validar que el radio sea positivo
            double radius = 5.0;
            double area = CalculateCircleArea(radius);
            Console.WriteLine($"Área del círculo (radio={radius}): {area:F2}");
            
            // Prompt: Método que determina si un número es primo
            int number = 17;
            bool isPrime = IsPrime(number);
            Console.WriteLine($"¿Es {number} primo? {isPrime}");
            
            // Prompt: Método async que simula una operación de red con delay
            await SimulateNetworkOperation("https://api.example.com", 2000);
        }

        // Método que calcula el área de un círculo dado su radio
        // Debe validar que el radio sea positivo
        static double CalculateCircleArea(double radius)
        {
            if (radius <= 0)
                throw new ArgumentException("El radio debe ser positivo", nameof(radius));
            
            return Math.PI * radius * radius;
        }

        // Método que determina si un número es primo
        static bool IsPrime(int number)
        {
            if (number <= 1) return false;
            if (number <= 3) return true;
            if (number % 2 == 0 || number % 3 == 0) return false;
            
            for (int i = 5; i * i <= number; i += 6)
            {
                if (number % i == 0 || number % (i + 2) == 0)
                    return false;
            }
            
            return true;
        }

        // Método async que simula una operación de red con delay
        static async Task SimulateNetworkOperation(string url, int delayMs)
        {
            Console.WriteLine($"🌐 Iniciando operación de red: {url}");
            await Task.Delay(delayMs);
            Console.WriteLine($"✅ Operación completada después de {delayMs}ms");
        }

        /// <summary>
        /// Ejemplo de trabajo con colecciones usando LINQ
        /// </summary>
        static void ExampleCollections()
        {
            Console.WriteLine("\n📊 Ejemplo 2: Colecciones y LINQ");
            
            // Prompt: Lista de números del 1 al 100, filtrar pares, elevar al cuadrado y tomar los primeros 10
            var numbers = Enumerable.Range(1, 100)
                .Where(n => n % 2 == 0)
                .Select(n => n * n)
                .Take(10)
                .ToList();
            
            Console.WriteLine("Primeros 10 cuadrados de números pares:");
            Console.WriteLine(string.Join(", ", numbers));
            
            // Prompt: Lista de palabras, agrupar por longitud y mostrar estadísticas
            var words = new[] { "apple", "banana", "cherry", "date", "elderberry", "fig", "grape" };
            var wordStats = words
                .GroupBy(w => w.Length)
                .Select(g => new { Length = g.Key, Count = g.Count(), Words = g.ToList() })
                .OrderBy(x => x.Length);
            
            Console.WriteLine("\nEstadísticas de palabras por longitud:");
            foreach (var stat in wordStats)
            {
                Console.WriteLine($"Longitud {stat.Length}: {stat.Count} palabras -> [{string.Join(", ", stat.Words)}]");
            }
        }

        /// <summary>
        /// Ejemplo de clases y objetos
        /// </summary>
        static void ExampleClassesAndObjects()
        {
            Console.WriteLine("\n🏗️ Ejemplo 3: Clases y objetos");
            
            // Crear instancias de Person
            var people = new List<Person>
            {
                new Person("Ana", "García", new DateTime(1990, 5, 15)),
                new Person("Carlos", "López", new DateTime(1985, 12, 3)),
                new Person("María", "Rodríguez", new DateTime(1992, 8, 22))
            };
            
            Console.WriteLine("Lista de personas:");
            foreach (var person in people)
            {
                Console.WriteLine($"- {person.FullName} (Edad: {person.Age})");
            }
            
            // Encontrar la persona más joven
            var youngest = people.OrderBy(p => p.BirthDate).Last();
            Console.WriteLine($"\nPersona más joven: {youngest.FullName}");
        }

        /// <summary>
        /// Ejemplo de manejo de errores
        /// </summary>
        static void ExampleErrorHandling()
        {
            Console.WriteLine("\n⚠️ Ejemplo 4: Manejo de errores");
            
            // Prompt: Método que divide dos números con manejo de errores
            TryDivide(10, 2);
            TryDivide(10, 0);
            TryDivide(10, -1);
        }

        // Método que divide dos números con manejo de errores
        static void TryDivide(double a, double b)
        {
            try
            {
                if (b == 0)
                    throw new DivideByZeroException("No se puede dividir por cero");
                
                double result = a / b;
                Console.WriteLine($"{a} ÷ {b} = {result:F2}");
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"❌ Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error inesperado: {ex.Message}");
            }
        }
    }

    /// <summary>
    /// Clase Person generada con GitHub Copilot
    /// Prompt: Clase que representa una persona con nombre, apellido y fecha de nacimiento
    /// Debe calcular la edad automáticamente y tener una propiedad FullName
    /// </summary>
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        
        public string FullName => $"{FirstName} {LastName}";
        
        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - BirthDate.Year;
                if (BirthDate.Date > today.AddYears(-age)) age--;
                return age;
            }
        }
        
        public Person(string firstName, string lastName, DateTime birthDate)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
        }
        
        public override string ToString()
        {
            return $"{FullName} (Nacido: {BirthDate:dd/MM/yyyy}, Edad: {Age})";
        }
    }
}