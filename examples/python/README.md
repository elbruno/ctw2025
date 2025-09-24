# Python con GitHub Copilot y Frameworks de AI

Este directorio contiene ejemplos prácticos de cómo usar GitHub Copilot con Python y los frameworks de AI más populares.

## 📁 Estructura de ejemplos

### 🔰 [Básicos](./basic/)
- Sintaxis básica con Copilot
- Funciones y clases
- Manejo de datos

### 🧠 [TensorFlow y Keras](./tensorflow/)
- Redes neuronales con TensorFlow
- Modelos de deep learning
- Procesamiento de imágenes

### ⚡ [PyTorch](./pytorch/)
- Tensores y autograd
- Redes neuronales personalizadas
- Entrenamiento de modelos

### 🤗 [Hugging Face Transformers](./huggingface/)
- Modelos pre-entrenados
- NLP tasks
- Fine-tuning

### 📊 [Scikit-learn](./sklearn/)
- Machine learning clásico
- Preprocessing de datos
- Evaluación de modelos

### 💬 [LangChain](./langchain/)
- LLMs y chains
- Embeddings y vectorstores
- Agents y tools

## 🚀 Primeros pasos

### Prerequisitos

```bash
# Python 3.8 o superior
python --version

# Pip actualizado
pip install --upgrade pip

# Entorno virtual (recomendado)
python -m venv copilot-ai-env
source copilot-ai-env/bin/activate  # Linux/Mac
# copilot-ai-env\Scripts\activate  # Windows
```

### Instalación de dependencias

```bash
# Dependencias básicas
pip install numpy pandas matplotlib seaborn jupyter

# Machine Learning
pip install scikit-learn

# Deep Learning
pip install tensorflow torch torchvision

# NLP
pip install transformers datasets tokenizers

# LangChain
pip install langchain openai chromadb

# Utilities
pip install requests beautifulsoup4 pillow
```

### Configuración de VS Code

Extensiones recomendadas:
- Python
- Jupyter
- GitHub Copilot
- GitHub Copilot Chat

Configuración en `settings.json`:
```json
{
    "python.defaultInterpreterPath": "./copilot-ai-env/bin/python",
    "github.copilot.enable": {
        "python": true,
        "jupyter": true
    },
    "jupyter.askForKernelRestart": false
}
```

## 💡 Tips específicos para Python

### Prompts efectivos en Python

```python
# ✅ Buen prompt - específico y con contexto
# Función que descarga una imagen desde URL y la redimensiona
# Parámetros: url (str), output_path (str), new_size (tuple)
# Retorna: bool indicando éxito, maneja excepciones HTTP y PIL
def download_and_resize_image(url: str, output_path: str, new_size: tuple) -> bool:
    # Copilot generará implementación completa
    pass

# ✅ Clase con tipo hints y documentación
# Clase para procesar datasets de texto para NLP
# Debe manejar tokenización, limpieza y vectorización
class TextProcessor:
    def __init__(self, max_features: int = 10000, max_len: int = 100):
        # Copilot generará inicialización
        pass
```

### Usando Copilot Chat para Python

Comandos útiles:
- `/explain` - Explica código Python complejo
- `/fix` - Sugiere correcciones para errores
- `/optimize` - Optimiza rendimiento del código
- `/doc` - Genera docstrings
- `/tests` - Genera pruebas con pytest

### Patrones que Copilot maneja bien

1. **Data Analysis con pandas**
2. **Machine Learning pipelines**
3. **Web scraping con requests/BeautifulSoup**
4. **API clients con requests**
5. **Async/await patterns**
6. **Context managers**
7. **Decorators**
8. **List/dict comprehensions**

## 🧪 Testing con pytest

```python
# Prompt: Genera pruebas para la función factorial
# Debe incluir casos edge, valores negativos y cero
def test_factorial():
    # Copilot generará pruebas comprehensivas
    pass
```

## 📊 Jupyter Notebooks

Copilot funciona excelentemente en Jupyter:
- Análisis exploratorio de datos
- Visualizaciones con matplotlib/seaborn
- Prototipado rápido de modelos
- Documentación interactiva

## 🔧 Herramientas recomendadas

### Formateo y linting
```bash
pip install black flake8 mypy isort
```

### Testing
```bash
pip install pytest pytest-cov pytest-mock
```

### Documentation
```bash
pip install sphinx mkdocs
```

## 📚 Recursos adicionales

- [Python Documentation](https://docs.python.org/3/)
- [Real Python](https://realpython.com/)
- [Python Package Index](https://pypi.org/)
- [Awesome Python](https://github.com/vinta/awesome-python)