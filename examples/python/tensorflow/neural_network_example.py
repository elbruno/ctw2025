#!/usr/bin/env python3
"""
Ejemplo de TensorFlow con GitHub Copilot
Demuestra cómo crear redes neuronales y modelos de deep learning
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from typing import Tuple, List, Dict, Optional
from pathlib import Path

try:
    import tensorflow as tf
    from tensorflow.keras import layers, models, optimizers, callbacks
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler, LabelEncoder
    print(f"TensorFlow version: {tf.__version__}")
except ImportError as e:
    print(f"Error importing libraries: {e}")
    print("Install with: pip install tensorflow scikit-learn matplotlib pandas")
    exit(1)


class SimpleNeuralNetwork:
    """
    Prompt: Clase que implementa una red neuronal simple para clasificación
    Debe incluir métodos para entrenar, evaluar y hacer predicciones
    Incluye visualización de métricas y arquitectura personalizable
    """
    
    def __init__(self, input_dim: int, hidden_layers: List[int] = None, output_dim: int = 1, 
                 activation: str = 'relu', output_activation: str = 'sigmoid'):
        """
        Inicializa la red neuronal
        Args:
            input_dim: Dimensión de entrada
            hidden_layers: Lista con el número de neuronas por capa oculta
            output_dim: Dimensión de salida
            activation: Función de activación para capas ocultas
            output_activation: Función de activación para capa de salida
        """
        self.input_dim = input_dim
        self.hidden_layers = hidden_layers or [64, 32]
        self.output_dim = output_dim
        self.activation = activation
        self.output_activation = output_activation
        self.model = None
        self.history = None
        self.scaler = StandardScaler()
        
    def build_model(self) -> tf.keras.Model:
        """Construye la arquitectura de la red neuronal"""
        model = models.Sequential()
        
        # Capa de entrada
        model.add(layers.Dense(self.hidden_layers[0], 
                              activation=self.activation, 
                              input_shape=(self.input_dim,)))
        model.add(layers.Dropout(0.2))
        
        # Capas ocultas
        for neurons in self.hidden_layers[1:]:
            model.add(layers.Dense(neurons, activation=self.activation))
            model.add(layers.Dropout(0.2))
        
        # Capa de salida
        model.add(layers.Dense(self.output_dim, activation=self.output_activation))
        
        self.model = model
        return model
    
    def compile_model(self, optimizer: str = 'adam', loss: str = 'binary_crossentropy', 
                     metrics: List[str] = None):
        """Compila el modelo con optimizador, función de pérdida y métricas"""
        if self.model is None:
            self.build_model()
        
        metrics = metrics or ['accuracy']
        self.model.compile(optimizer=optimizer, loss=loss, metrics=metrics)
        
    def prepare_data(self, X: np.ndarray, y: np.ndarray, 
                    test_size: float = 0.2, scale: bool = True) -> Tuple[np.ndarray, ...]:
        """Prepara los datos para entrenamiento"""
        # División train/test
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        # Escalado de características
        if scale:
            X_train = self.scaler.fit_transform(X_train)
            X_test = self.scaler.transform(X_test)
        
        return X_train, X_test, y_train, y_test
    
    def train(self, X_train: np.ndarray, y_train: np.ndarray, 
              X_val: np.ndarray = None, y_val: np.ndarray = None,
              epochs: int = 100, batch_size: int = 32, verbose: int = 1) -> tf.keras.callbacks.History:
        """Entrena el modelo con early stopping y reducción de learning rate"""
        if self.model is None:
            self.compile_model()
        
        # Callbacks
        early_stopping = callbacks.EarlyStopping(
            monitor='val_loss', patience=10, restore_best_weights=True
        )
        reduce_lr = callbacks.ReduceLROnPlateau(
            monitor='val_loss', factor=0.2, patience=5, min_lr=0.001
        )
        
        # Datos de validación
        validation_data = None
        if X_val is not None and y_val is not None:
            validation_data = (X_val, y_val)
        
        # Entrenamiento
        self.history = self.model.fit(
            X_train, y_train,
            validation_data=validation_data,
            epochs=epochs,
            batch_size=batch_size,
            callbacks=[early_stopping, reduce_lr],
            verbose=verbose
        )
        
        return self.history
    
    def evaluate(self, X_test: np.ndarray, y_test: np.ndarray) -> Dict[str, float]:
        """Evalúa el modelo en datos de prueba"""
        if self.model is None:
            raise ValueError("El modelo debe ser entrenado primero")
        
        # Escalar datos de prueba si es necesario
        if hasattr(self.scaler, 'mean_'):
            X_test_scaled = self.scaler.transform(X_test)
        else:
            X_test_scaled = X_test
        
        # Evaluación
        results = self.model.evaluate(X_test_scaled, y_test, verbose=0)
        metric_names = self.model.metrics_names
        
        return dict(zip(metric_names, results))
    
    def predict(self, X: np.ndarray, threshold: float = 0.5) -> Tuple[np.ndarray, np.ndarray]:
        """Hace predicciones con el modelo entrenado"""
        if self.model is None:
            raise ValueError("El modelo debe ser entrenado primero")
        
        # Escalar datos si es necesario
        if hasattr(self.scaler, 'mean_'):
            X_scaled = self.scaler.transform(X)
        else:
            X_scaled = X
        
        # Predicciones
        probabilities = self.model.predict(X_scaled)
        predictions = (probabilities > threshold).astype(int)
        
        return predictions, probabilities
    
    def plot_training_history(self, figsize: Tuple[int, int] = (12, 4)):
        """Visualiza el historial de entrenamiento"""
        if self.history is None:
            raise ValueError("No hay historial de entrenamiento disponible")
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=figsize)
        
        # Pérdida
        ax1.plot(self.history.history['loss'], label='Training Loss')
        if 'val_loss' in self.history.history:
            ax1.plot(self.history.history['val_loss'], label='Validation Loss')
        ax1.set_title('Model Loss')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Loss')
        ax1.legend()
        
        # Accuracy
        if 'accuracy' in self.history.history:
            ax2.plot(self.history.history['accuracy'], label='Training Accuracy')
            if 'val_accuracy' in self.history.history:
                ax2.plot(self.history.history['val_accuracy'], label='Validation Accuracy')
            ax2.set_title('Model Accuracy')
            ax2.set_xlabel('Epoch')
            ax2.set_ylabel('Accuracy')
            ax2.legend()
        
        plt.tight_layout()
        plt.show()
    
    def get_model_summary(self) -> str:
        """Retorna un resumen del modelo"""
        if self.model is None:
            return "Modelo no construido"
        
        return self.model.summary()


class ImageClassifier:
    """
    Prompt: Clase para clasificación de imágenes usando CNN
    Debe incluir data augmentation, transfer learning opcional
    y métodos para visualizar predicciones
    """
    
    def __init__(self, input_shape: Tuple[int, int, int] = (224, 224, 3), 
                 num_classes: int = 2, use_transfer_learning: bool = False):
        """
        Inicializa el clasificador de imágenes
        Args:
            input_shape: Forma de las imágenes de entrada (height, width, channels)
            num_classes: Número de clases
            use_transfer_learning: Si usar transfer learning con modelo pre-entrenado
        """
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.use_transfer_learning = use_transfer_learning
        self.model = None
        self.history = None
        
    def build_cnn_model(self) -> tf.keras.Model:
        """Construye una CNN desde cero"""
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=self.input_shape),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Flatten(),
            layers.Dropout(0.5),
            layers.Dense(512, activation='relu'),
            layers.Dense(self.num_classes, activation='softmax' if self.num_classes > 2 else 'sigmoid')
        ])
        
        return model
    
    def build_transfer_learning_model(self, base_model_name: str = 'MobileNetV2') -> tf.keras.Model:
        """Construye modelo usando transfer learning"""
        # Modelo base pre-entrenado
        if base_model_name == 'MobileNetV2':
            base_model = tf.keras.applications.MobileNetV2(
                weights='imagenet',
                include_top=False,
                input_shape=self.input_shape
            )
        else:
            raise ValueError(f"Modelo base no soportado: {base_model_name}")
        
        # Congelar capas del modelo base
        base_model.trainable = False
        
        # Añadir capas de clasificación
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.2),
            layers.Dense(128, activation='relu'),
            layers.Dense(self.num_classes, activation='softmax' if self.num_classes > 2 else 'sigmoid')
        ])
        
        return model
    
    def build_model(self) -> tf.keras.Model:
        """Construye el modelo según la configuración"""
        if self.use_transfer_learning:
            self.model = self.build_transfer_learning_model()
        else:
            self.model = self.build_cnn_model()
        
        return self.model
    
    def compile_model(self, optimizer: str = 'adam', learning_rate: float = 0.001):
        """Compila el modelo"""
        if self.model is None:
            self.build_model()
        
        if self.num_classes > 2:
            loss = 'categorical_crossentropy'
        else:
            loss = 'binary_crossentropy'
        
        self.model.compile(
            optimizer=optimizers.Adam(learning_rate=learning_rate),
            loss=loss,
            metrics=['accuracy']
        )
    
    def create_data_generators(self, train_dir: str, validation_dir: str = None, 
                              batch_size: int = 32) -> Tuple[ImageDataGenerator, ...]:
        """Crea generadores de datos con augmentación"""
        # Generador para entrenamiento con augmentación
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            fill_mode='nearest'
        )
        
        # Generador para validación (solo rescaling)
        validation_datagen = ImageDataGenerator(rescale=1./255)
        
        # Generadores de datos
        train_generator = train_datagen.flow_from_directory(
            train_dir,
            target_size=self.input_shape[:2],
            batch_size=batch_size,
            class_mode='binary' if self.num_classes == 2 else 'categorical'
        )
        
        validation_generator = None
        if validation_dir:
            validation_generator = validation_datagen.flow_from_directory(
                validation_dir,
                target_size=self.input_shape[:2],
                batch_size=batch_size,
                class_mode='binary' if self.num_classes == 2 else 'categorical'
            )
        
        return train_generator, validation_generator


def create_sample_dataset(n_samples: int = 1000, n_features: int = 20, 
                         n_classes: int = 2, noise: float = 0.1) -> Tuple[np.ndarray, np.ndarray]:
    """
    Prompt: Función que crea un dataset sintético para demostración
    Debe generar datos con ruido y diferentes patrones por clase
    """
    np.random.seed(42)
    
    X = np.random.randn(n_samples, n_features)
    
    # Crear patrones diferentes para cada clase
    if n_classes == 2:
        # Clase 0: valores más negativos en primeras características
        # Clase 1: valores más positivos en primeras características
        y = np.zeros(n_samples)
        for i in range(n_samples):
            score = np.sum(X[i, :n_features//2]) - np.sum(X[i, n_features//2:])
            y[i] = 1 if score > 0 else 0
    else:
        # Múltiples clases basadas en diferentes regiones
        y = np.random.randint(0, n_classes, n_samples)
    
    # Añadir ruido
    noise_mask = np.random.random(n_samples) < noise
    y[noise_mask] = np.random.randint(0, n_classes, np.sum(noise_mask))
    
    return X, y


def main():
    """Función principal que demuestra el uso de TensorFlow con Copilot"""
    print("🧠 Ejemplos de TensorFlow con GitHub Copilot")
    print("=" * 60)
    
    # Configurar TensorFlow
    tf.random.set_seed(42)
    
    # Ejemplo 1: Red neuronal simple
    print("\n🔹 Ejemplo 1: Red neuronal simple para clasificación binaria")
    
    # Crear dataset sintético
    X, y = create_sample_dataset(n_samples=1000, n_features=20, n_classes=2)
    print(f"Dataset creado: {X.shape[0]} muestras, {X.shape[1]} características")
    
    # Crear y entrenar modelo
    nn = SimpleNeuralNetwork(input_dim=20, hidden_layers=[64, 32, 16], output_dim=1)
    X_train, X_test, y_train, y_test = nn.prepare_data(X, y, test_size=0.2)
    
    print("Arquitectura del modelo:")
    nn.build_model()
    nn.compile_model()
    print(nn.model.summary())
    
    # Entrenar
    print("\nEntrenando modelo...")
    history = nn.train(X_train, y_train, X_test, y_test, epochs=50, verbose=0)
    
    # Evaluar
    results = nn.evaluate(X_test, y_test)
    print(f"Resultados en test: {results}")
    
    # Predicciones
    predictions, probabilities = nn.predict(X_test[:5])
    print(f"Predicciones (primeras 5): {predictions.flatten()}")
    print(f"Probabilidades: {probabilities.flatten()}")
    
    # Visualizar entrenamiento
    try:
        nn.plot_training_history()
    except Exception as e:
        print(f"No se pudo mostrar gráfico: {e}")
    
    # Ejemplo 2: Clasificador de imágenes (arquitectura)
    print("\n🖼️ Ejemplo 2: Clasificador de imágenes (arquitectura)")
    
    img_classifier = ImageClassifier(
        input_shape=(64, 64, 3), 
        num_classes=3, 
        use_transfer_learning=False
    )
    
    img_model = img_classifier.build_model()
    img_classifier.compile_model()
    
    print("Arquitectura CNN:")
    print(img_model.summary())
    
    # Ejemplo 3: Transfer Learning
    print("\n🔄 Ejemplo 3: Transfer Learning con MobileNetV2")
    
    transfer_classifier = ImageClassifier(
        input_shape=(224, 224, 3),
        num_classes=2,
        use_transfer_learning=True
    )
    
    transfer_model = transfer_classifier.build_model()
    transfer_classifier.compile_model(learning_rate=0.0001)
    
    print("Arquitectura con Transfer Learning:")
    print(f"Número total de parámetros: {transfer_model.count_params():,}")
    print(f"Parámetros entrenables: {sum([tf.keras.backend.count_params(w) for w in transfer_model.trainable_weights]):,}")
    
    print("\n✅ Ejemplos de TensorFlow completados!")
    print("\n💡 Para usar estos ejemplos con datos reales:")
    print("   1. Prepara tus datos en el formato correcto")
    print("   2. Ajusta los hiperparámetros según tu problema")
    print("   3. Añade callbacks para guardar el mejor modelo")
    print("   4. Experimenta con diferentes arquitecturas")


if __name__ == "__main__":
    main()