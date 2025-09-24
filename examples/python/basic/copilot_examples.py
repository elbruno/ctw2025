#!/usr/bin/env python3
"""
Ejemplos básicos de Python con GitHub Copilot
Demuestra cómo escribir prompts efectivos para generar código Python
"""

import asyncio
import json
import math
import re
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Person:
    """
    Clase Person generada con GitHub Copilot
    Prompt: Clase que representa una persona con nombre, edad y email
    Debe validar el email y calcular el año de nacimiento
    """
    name: str
    age: int
    email: str
    
    def __post_init__(self):
        """Valida los datos después de la inicialización"""
        if not self.is_valid_email(self.email):
            raise ValueError(f"Email inválido: {self.email}")
        if self.age < 0 or self.age > 150:
            raise ValueError(f"Edad inválida: {self.age}")
    
    @staticmethod
    def is_valid_email(email: str) -> bool:
        """Valida formato de email usando regex"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @property
    def birth_year(self) -> int:
        """Calcula el año de nacimiento aproximado"""
        return datetime.now().year - self.age
    
    def to_dict(self) -> Dict[str, any]:
        """Convierte la instancia a diccionario"""
        return {
            'name': self.name,
            'age': self.age,
            'email': self.email,
            'birth_year': self.birth_year
        }


class DataProcessor:
    """
    Clase para procesamiento de datos generada con Copilot
    Prompt: Clase que procesa listas de números y texto
    Debe incluir métodos para estadísticas, filtrado y transformación
    """
    
    def __init__(self, data: List[any] = None):
        self.data = data or []
    
    def add_data(self, item: any) -> None:
        """Añade un elemento a los datos"""
        self.data.append(item)
    
    def filter_numbers(self) -> List[float]:
        """Filtra solo los números de los datos"""
        return [item for item in self.data if isinstance(item, (int, float))]
    
    def filter_strings(self) -> List[str]:
        """Filtra solo las strings de los datos"""
        return [item for item in self.data if isinstance(item, str)]
    
    def get_statistics(self) -> Dict[str, float]:
        """Calcula estadísticas básicas de los números"""
        numbers = self.filter_numbers()
        if not numbers:
            return {'count': 0, 'sum': 0, 'mean': 0, 'min': 0, 'max': 0, 'std': 0}
        
        count = len(numbers)
        total = sum(numbers)
        mean = total / count
        variance = sum((x - mean) ** 2 for x in numbers) / count
        std = math.sqrt(variance)
        
        return {
            'count': count,
            'sum': total,
            'mean': mean,
            'min': min(numbers),
            'max': max(numbers),
            'std': std
        }
    
    def word_frequency(self) -> Dict[str, int]:
        """Calcula la frecuencia de palabras en las strings"""
        strings = self.filter_strings()
        word_count = {}
        
        for text in strings:
            words = re.findall(r'\b\w+\b', text.lower())
            for word in words:
                word_count[word] = word_count.get(word, 0) + 1
        
        return dict(sorted(word_count.items(), key=lambda x: x[1], reverse=True))


def fibonacci_sequence(n: int) -> List[int]:
    """
    Prompt: Función que genera la secuencia de Fibonacci hasta n términos
    Debe manejar casos edge como n <= 0 y ser eficiente
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        next_num = sequence[i-1] + sequence[i-2]
        sequence.append(next_num)
    
    return sequence


def is_palindrome(text: str) -> bool:
    """
    Prompt: Función que determina si un texto es palíndromo
    Debe ignorar espacios, puntuación y mayúsculas
    """
    # Limpiar el texto: solo letras y números, convertir a minúsculas
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', text.lower())
    return cleaned == cleaned[::-1]


def prime_factors(n: int) -> List[int]:
    """
    Prompt: Función que encuentra los factores primos de un número
    Debe ser eficiente y manejar números grandes
    """
    if n <= 1:
        return []
    
    factors = []
    d = 2
    
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    
    if n > 1:
        factors.append(n)
    
    return factors


async def fetch_url_async(url: str, timeout: int = 10) -> Dict[str, any]:
    """
    Prompt: Función async que hace petición HTTP y retorna información
    Debe manejar timeouts, errores HTTP y parsear JSON si es posible
    """
    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()
        
        result = {
            'url': url,
            'status_code': response.status_code,
            'headers': dict(response.headers),
            'content_length': len(response.content),
            'timestamp': datetime.now().isoformat()
        }
        
        # Intentar parsear JSON
        try:
            result['json_data'] = response.json()
        except json.JSONDecodeError:
            result['text_preview'] = response.text[:200] + '...' if len(response.text) > 200 else response.text
        
        return result
        
    except requests.exceptions.Timeout:
        return {'error': 'Timeout', 'url': url}
    except requests.exceptions.RequestException as e:
        return {'error': str(e), 'url': url}


def analyze_text(text: str) -> Dict[str, any]:
    """
    Prompt: Función que analiza un texto y retorna estadísticas
    Debe contar caracteres, palabras, oraciones y frecuencia de letras
    """
    if not text:
        return {'error': 'Texto vacío'}
    
    # Estadísticas básicas
    char_count = len(text)
    word_count = len(re.findall(r'\b\w+\b', text))
    sentence_count = len(re.findall(r'[.!?]+', text))
    paragraph_count = len([p for p in text.split('\n\n') if p.strip()])
    
    # Frecuencia de letras
    letter_freq = {}
    for char in text.lower():
        if char.isalpha():
            letter_freq[char] = letter_freq.get(char, 0) + 1
    
    # Palabras más frecuentes
    words = re.findall(r'\b\w+\b', text.lower())
    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1
    
    top_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:10]
    
    return {
        'characters': char_count,
        'words': word_count,
        'sentences': sentence_count,
        'paragraphs': paragraph_count,
        'average_words_per_sentence': word_count / sentence_count if sentence_count > 0 else 0,
        'letter_frequency': dict(sorted(letter_freq.items(), key=lambda x: x[1], reverse=True)),
        'top_words': top_words
    }


def file_operations_example(file_path: str, data: Dict[str, any]) -> bool:
    """
    Prompt: Función que demuestra operaciones con archivos
    Debe escribir JSON, leer y validar el contenido
    """
    try:
        path = Path(file_path)
        
        # Crear directorio si no existe
        path.parent.mkdir(parents=True, exist_ok=True)
        
        # Escribir datos a archivo JSON
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # Leer y verificar
        with open(path, 'r', encoding='utf-8') as f:
            loaded_data = json.load(f)
        
        # Validar que los datos son iguales
        return loaded_data == data
        
    except (IOError, json.JSONDecodeError) as e:
        print(f"Error en operaciones de archivo: {e}")
        return False


async def main():
    """Función principal que demuestra todos los ejemplos"""
    print("🐍 Ejemplos básicos de Python con GitHub Copilot")
    print("=" * 60)
    
    # Ejemplo 1: Clase Person
    print("\n👤 Ejemplo 1: Clase Person")
    try:
        person = Person("Ana García", 25, "ana@example.com")
        print(f"Persona: {person.name}, Edad: {person.age}, Año nacimiento: {person.birth_year}")
        print(f"Dict: {person.to_dict()}")
    except ValueError as e:
        print(f"Error: {e}")
    
    # Ejemplo 2: Procesamiento de datos
    print("\n📊 Ejemplo 2: Procesamiento de datos")
    processor = DataProcessor([1, 2, 3, 4, 5, "hello", "world", "hello", 6.5, "python"])
    stats = processor.get_statistics()
    word_freq = processor.word_frequency()
    print(f"Estadísticas numéricas: {stats}")
    print(f"Frecuencia de palabras: {word_freq}")
    
    # Ejemplo 3: Fibonacci
    print("\n🔢 Ejemplo 3: Secuencia Fibonacci")
    fib = fibonacci_sequence(10)
    print(f"Fibonacci (10 términos): {fib}")
    
    # Ejemplo 4: Palíndromo
    print("\n🔄 Ejemplo 4: Detector de palíndromos")
    test_strings = ["A man a plan a canal Panama", "hello", "racecar", "12321"]
    for text in test_strings:
        result = is_palindrome(text)
        print(f"'{text}' es palíndromo: {result}")
    
    # Ejemplo 5: Factores primos
    print("\n✂️ Ejemplo 5: Factores primos")
    numbers = [12, 17, 100, 97]
    for num in numbers:
        factors = prime_factors(num)
        print(f"Factores primos de {num}: {factors}")
    
    # Ejemplo 6: Petición HTTP async
    print("\n🌐 Ejemplo 6: Petición HTTP asíncrona")
    url_result = await fetch_url_async("https://httpbin.org/json")
    print(f"Resultado de petición: {url_result.get('status_code', 'Error')}")
    
    # Ejemplo 7: Análisis de texto
    print("\n📝 Ejemplo 7: Análisis de texto")
    sample_text = """
    GitHub Copilot es una herramienta revolucionaria para desarrolladores.
    Utiliza inteligencia artificial para ayudar en la programación.
    Es especialmente útil para generar código y acelerar el desarrollo.
    """
    analysis = analyze_text(sample_text)
    print(f"Análisis: {analysis['words']} palabras, {analysis['sentences']} oraciones")
    print(f"Top palabras: {analysis['top_words'][:5]}")
    
    # Ejemplo 8: Operaciones con archivos
    print("\n💾 Ejemplo 8: Operaciones con archivos")
    test_data = {
        "timestamp": datetime.now().isoformat(),
        "examples_completed": 8,
        "framework": "GitHub Copilot + Python"
    }
    
    success = file_operations_example("/tmp/copilot_test.json", test_data)
    print(f"Operaciones de archivo completadas: {success}")
    
    print("\n✅ Todos los ejemplos completados!")


if __name__ == "__main__":
    # Ejecutar ejemplos
    asyncio.run(main())