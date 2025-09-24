using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CopilotAIIntegration
{
    /// <summary>
    /// Ejemplo de integración con OpenAI API usando GitHub Copilot
    /// Demuestra cómo generar código para consumir APIs de AI
    /// </summary>
    public class OpenAIExample
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string ApiBaseUrl = "https://api.openai.com/v1";

        public OpenAIExample(string apiKey)
        {
            _apiKey = apiKey ?? throw new ArgumentNullException(nameof(apiKey));
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        /// <summary>
        /// Prompt: Método que genera texto usando GPT-3.5-turbo
        /// Debe manejar la respuesta JSON y extraer el contenido generado
        /// Incluye manejo de errores y validación de parámetros
        /// </summary>
        public async Task<string> GenerateTextAsync(string prompt, int maxTokens = 150, double temperature = 0.7)
        {
            if (string.IsNullOrWhiteSpace(prompt))
                throw new ArgumentException("El prompt no puede estar vacío", nameof(prompt));

            if (maxTokens <= 0 || maxTokens > 4000)
                throw new ArgumentOutOfRangeException(nameof(maxTokens), "MaxTokens debe estar entre 1 y 4000");

            if (temperature < 0 || temperature > 2)
                throw new ArgumentOutOfRangeException(nameof(temperature), "Temperature debe estar entre 0 y 2");

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = maxTokens,
                temperature = temperature
            };

            try
            {
                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync($"{ApiBaseUrl}/chat/completions", content);
                response.EnsureSuccessStatusCode();
                
                var responseJson = await response.Content.ReadAsStringAsync();
                var responseObject = JsonSerializer.Deserialize<OpenAIResponse>(responseJson);
                
                return responseObject?.Choices?[0]?.Message?.Content ?? "No se pudo generar respuesta";
            }
            catch (HttpRequestException ex)
            {
                throw new InvalidOperationException($"Error en la petición HTTP: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException($"Error procesando respuesta JSON: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Prompt: Método que analiza el sentimiento de un texto
        /// Retorna un objeto con el sentimiento (positivo, negativo, neutral) y confianza
        /// </summary>
        public async Task<SentimentAnalysis> AnalyzeSentimentAsync(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                throw new ArgumentException("El texto no puede estar vacío", nameof(text));

            var prompt = $@"Analiza el sentimiento del siguiente texto y responde en formato JSON:
{{
    ""sentiment"": ""positive|negative|neutral"",
    ""confidence"": 0.95,
    ""explanation"": ""breve explicación""
}}

Texto a analizar: {text}";

            try
            {
                var response = await GenerateTextAsync(prompt, 200, 0.3);
                
                // Extraer JSON de la respuesta
                var jsonStart = response.IndexOf('{');
                var jsonEnd = response.LastIndexOf('}') + 1;
                
                if (jsonStart >= 0 && jsonEnd > jsonStart)
                {
                    var jsonContent = response.Substring(jsonStart, jsonEnd - jsonStart);
                    return JsonSerializer.Deserialize<SentimentAnalysis>(jsonContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }) ?? new SentimentAnalysis();
                }
                
                return new SentimentAnalysis { Sentiment = "neutral", Confidence = 0.5, Explanation = "No se pudo analizar" };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error analizando sentimiento: {ex.Message}");
                return new SentimentAnalysis { Sentiment = "neutral", Confidence = 0.0, Explanation = "Error en análisis" };
            }
        }

        /// <summary>
        /// Prompt: Método que traduce texto a diferentes idiomas
        /// Soporta español, inglés, francés, alemán, italiano
        /// </summary>
        public async Task<string> TranslateTextAsync(string text, string targetLanguage)
        {
            if (string.IsNullOrWhiteSpace(text))
                throw new ArgumentException("El texto no puede estar vacío", nameof(text));

            var supportedLanguages = new[] { "spanish", "english", "french", "german", "italian" };
            if (!Array.Exists(supportedLanguages, lang => 
                string.Equals(lang, targetLanguage, StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException($"Idioma no soportado: {targetLanguage}");
            }

            var prompt = $"Traduce el siguiente texto a {targetLanguage}. Responde solo con la traducción:\n\n{text}";
            
            return await GenerateTextAsync(prompt, 300, 0.3);
        }

        /// <summary>
        /// Prompt: Método que genera código en diferentes lenguajes
        /// Basado en una descripción en lenguaje natural
        /// </summary>
        public async Task<string> GenerateCodeAsync(string description, string programmingLanguage)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new ArgumentException("La descripción no puede estar vacía", nameof(description));

            var supportedLanguages = new[] { "C#", "Python", "Java", "JavaScript", "Scala" };
            if (!Array.Exists(supportedLanguages, lang => 
                string.Equals(lang, programmingLanguage, StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException($"Lenguaje no soportado: {programmingLanguage}");
            }

            var prompt = $@"Genera código en {programmingLanguage} para la siguiente descripción:
{description}

Incluye comentarios explicativos y manejo de errores cuando sea apropiado.
Responde solo con el código, sin explicaciones adicionales.";

            return await GenerateTextAsync(prompt, 500, 0.5);
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }

    /// <summary>
    /// Clases de modelo para deserializar respuestas de OpenAI
    /// Generadas con GitHub Copilot
    /// </summary>
    public class OpenAIResponse
    {
        public Choice[]? Choices { get; set; }
        public Usage? Usage { get; set; }
    }

    public class Choice
    {
        public Message? Message { get; set; }
        public string? FinishReason { get; set; }
    }

    public class Message
    {
        public string? Role { get; set; }
        public string? Content { get; set; }
    }

    public class Usage
    {
        public int PromptTokens { get; set; }
        public int CompletionTokens { get; set; }
        public int TotalTokens { get; set; }
    }

    public class SentimentAnalysis
    {
        public string Sentiment { get; set; } = "neutral";
        public double Confidence { get; set; }
        public string Explanation { get; set; } = "";
    }

    /// <summary>
    /// Programa de demostración
    /// </summary>
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("🤖 Ejemplo de integración con OpenAI usando GitHub Copilot");
            Console.WriteLine("=" * 60);

            // NOTA: En un entorno real, usa variables de entorno o configuración segura
            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY") 
                ?? "your-api-key-here";

            if (apiKey == "your-api-key-here")
            {
                Console.WriteLine("⚠️  Configura tu API key de OpenAI en la variable de entorno OPENAI_API_KEY");
                Console.WriteLine("Este ejemplo mostrará la estructura del código sin hacer llamadas reales.");
                return;
            }

            var openAI = new OpenAIExample(apiKey);

            try
            {
                // Ejemplo 1: Generación de texto
                Console.WriteLine("\n📝 Generando texto...");
                var generatedText = await openAI.GenerateTextAsync(
                    "Escribe un párrafo sobre las ventajas de usar GitHub Copilot", 100);
                Console.WriteLine($"Texto generado: {generatedText}");

                // Ejemplo 2: Análisis de sentimiento
                Console.WriteLine("\n😊 Analizando sentimiento...");
                var sentiment = await openAI.AnalyzeSentimentAsync(
                    "Me encanta programar con GitHub Copilot, es increíblemente útil!");
                Console.WriteLine($"Sentimiento: {sentiment.Sentiment} (Confianza: {sentiment.Confidence:P})");
                Console.WriteLine($"Explicación: {sentiment.Explanation}");

                // Ejemplo 3: Traducción
                Console.WriteLine("\n🌐 Traduciendo texto...");
                var translation = await openAI.TranslateTextAsync(
                    "GitHub Copilot es una herramienta revolucionaria", "english");
                Console.WriteLine($"Traducción: {translation}");

                // Ejemplo 4: Generación de código
                Console.WriteLine("\n💻 Generando código...");
                var code = await openAI.GenerateCodeAsync(
                    "Una función que calcule el factorial de un número", "Python");
                Console.WriteLine($"Código generado:\n{code}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error: {ex.Message}");
            }
            finally
            {
                openAI.Dispose();
            }

            Console.WriteLine("\n✅ Demostración completada!");
            Console.ReadKey();
        }
    }
}