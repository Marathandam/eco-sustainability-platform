"""
Test script for loading and testing ML models for sustainability scoring.
This script will:
1. Load the ML models from the models directory
2. Create sample data based on the provided field structure
3. Test model predictions
4. Display outputs for backend integration planning
"""

import os
import sys
import pandas as pd
import numpy as np
from datetime import datetime
import json

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def install_requirements():
    """Install required ML libraries if not present"""
    try:
        import tensorflow as tf
        import sklearn
        print("✅ TensorFlow and scikit-learn already installed")
    except ImportError:
        print("📦 Installing required ML libraries...")
        os.system("pip install tensorflow scikit-learn pandas numpy")
        print("✅ Installation complete")

def load_models():
    """Load the ML models and associated files"""
    models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
    
    # Check if models exist
    model_files = {
        'model_v1_best': os.path.join(models_dir, 'model_v1_best.h5'),
        'model_top39_final': os.path.join(models_dir, 'model_top39_final.h5'),
        'optimal_thresholds': os.path.join(models_dir, 'optimal_thresholds.pkl'),
        'optimal_thresholds_top39': os.path.join(models_dir, 'optimal_thresholds_top39.npy'),
        'top_39_indices': os.path.join(models_dir, 'top_39_indices.npy')
    }
    
    print("🔍 Checking model files...")
    for name, path in model_files.items():
        if os.path.exists(path):
            print(f"✅ Found: {name}")
        else:
            print(f"❌ Missing: {name}")
    
    return model_files

def create_sample_data():
    """Create sample data based on the provided field structure"""
    
    # Define the expected fields based on your specification
    sample_data = {
        'id_prod': 'PROD_001',
        'categories': ['Electronics', 'Smartphones'],
        'gender': 'Unisex',
        'timestamp_prod': datetime.now(),
        'url': 'https://example.com/product/001',
        'source': 'manufacturer_website',
        'merchant': 'EcoTech Store',
        'country': 'Germany',
        'name_prod': 'Eco-Friendly Smartphone',
        'description_prod': 'A sustainable smartphone made with recycled materials',
        'brand': 'GreenTech',
        'sustainability_labels': ['Energy Star', 'EPEAT Gold'],
        'price': 599.99,
        'currency': 'EUR',
        'image_urls': ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        'consumer_lifestage': 'Adult',
        'colors': ['Black', 'White'],
        'sizes': ['Standard'],
        'gtin': 1234567890123,
        'asin': 'B08N5WRWNW',
        'id_label': 'LABEL_001',
        'timestamp_label': datetime.now(),
        'name_label': 'EPEAT Gold',
        'description_label': 'Environmental rating for electronic products',
        
        # Numerical features for ML model
        'cred_credibility': 0.85,
        'eco_chemicals': 0.75,
        'eco_lifetime': 0.90,
        'eco_water': 0.80,
        'eco_inputs': 0.70,
        'eco_quality': 0.85,
        'eco_energy': 0.88,
        'eco_waste_air': 0.78,
        'eco_environmental_management': 0.82,
        'social_labour_rights': 0.75,
        'social_business_practice': 0.80,
        'social_social_rights': 0.77,
        'social_company_responsibility': 0.83,
        'social_conflict_minerals': 0.90
    }
    
    return sample_data

def extract_features_for_model(sample_data):
    """Extract numerical features that would be used by the ML model"""
    
    # Features that appear to be numerical for the ML model
    numerical_features = [
        'cred_credibility',
        'eco_chemicals',
        'eco_lifetime',
        'eco_water',
        'eco_inputs',
        'eco_quality',
        'eco_energy',
        'eco_waste_air',
        'eco_environmental_management',
        'social_labour_rights',
        'social_business_practice',
        'social_social_rights',
        'social_company_responsibility',
        'social_conflict_minerals'
    ]
    
    features = []
    for feature in numerical_features:
        if feature in sample_data:
            features.append(sample_data[feature])
        else:
            features.append(0.0)  # Default value
    
    return np.array(features).reshape(1, -1)

def test_model_loading():
    """Test loading and basic functionality of the models"""
    
    print("\n🚀 Starting ML Model Testing...")
    print("=" * 50)
    
    # Install requirements if needed
    install_requirements()
    
    # Load model file paths
    model_files = load_models()
    
    # Create sample data
    print("\n📊 Creating sample data...")
    sample_data = create_sample_data()
    
    print("Sample product data:")
    for key, value in sample_data.items():
        if isinstance(value, (list, dict)):
            print(f"  {key}: {value}")
        else:
            print(f"  {key}: {value}")
    
    # Extract features for ML model
    print("\n🔧 Extracting features for ML model...")
    features = extract_features_for_model(sample_data)
    print(f"Feature vector shape: {features.shape}")
    print(f"Feature values: {features.flatten()}")
    
    # Try to load and test models
    print("\n🧠 Testing model loading...")
    
    try:
        import tensorflow as tf
        print(f"TensorFlow version: {tf.__version__}")
        
        # Try loading the models
        for model_name, model_path in model_files.items():
            if model_name.startswith('model_') and model_path.endswith('.h5'):
                if os.path.exists(model_path):
                    try:
                        print(f"\n📝 Loading {model_name}...")
                        model = tf.keras.models.load_model(model_path)
                        print(f"✅ Successfully loaded {model_name}")
                        print(f"   Input shape: {model.input_shape}")
                        print(f"   Output shape: {model.output_shape}")
                        
                        # Test prediction if input shape matches
                        if len(features.flatten()) >= model.input_shape[1]:
                            # Adjust feature vector to match model input
                            model_features = features.flatten()[:model.input_shape[1]].reshape(1, -1)
                            prediction = model.predict(model_features, verbose=0)
                            print(f"   Sample prediction: {prediction}")
                            print(f"   Prediction shape: {prediction.shape}")
                        else:
                            print(f"   ⚠️ Feature vector too small for model input")
                            
                    except Exception as e:
                        print(f"❌ Error loading {model_name}: {e}")
                        
        # Try loading numpy/pickle files
        print("\n📋 Loading threshold and index files...")
        for file_name, file_path in model_files.items():
            if file_name.startswith('optimal_') or file_name.startswith('top_'):
                if os.path.exists(file_path):
                    try:
                        if file_path.endswith('.npy'):
                            data = np.load(file_path)
                            print(f"✅ Loaded {file_name}: shape {data.shape}, dtype {data.dtype}")
                            if data.size < 50:  # Only print if not too large
                                print(f"   Values: {data}")
                        elif file_path.endswith('.pkl'):
                            import pickle
                            with open(file_path, 'rb') as f:
                                data = pickle.load(f)
                            print(f"✅ Loaded {file_name}: type {type(data)}")
                            if hasattr(data, 'shape'):
                                print(f"   Shape: {data.shape}")
                            elif isinstance(data, (list, dict)):
                                print(f"   Length: {len(data)}")
                    except Exception as e:
                        print(f"❌ Error loading {file_name}: {e}")
                        
    except ImportError as e:
        print(f"❌ TensorFlow not available: {e}")
        print("💡 Run: pip install tensorflow scikit-learn")
    
    print("\n🎯 Next Steps for Backend Integration:")
    print("1. Install ML dependencies: pip install tensorflow scikit-learn")
    print("2. Create a model service class in Django")
    print("3. Add prediction endpoint in views.py")
    print("4. Handle feature extraction from product data")
    print("5. Return sustainability scores to frontend")
    
    return sample_data, features

def create_django_integration_plan():
    """Create a plan for Django backend integration"""
    
    plan = {
        "phase_1_model_service": {
            "description": "Create a model service to handle ML predictions",
            "files_to_create": [
                "scorecard/services.py",
                "scorecard/ml_utils.py"
            ],
            "tasks": [
                "Load ML models on Django startup",
                "Create prediction service class",
                "Handle feature preprocessing",
                "Return structured predictions"
            ]
        },
        "phase_2_api_endpoints": {
            "description": "Create API endpoints for sustainability scoring",
            "files_to_modify": [
                "scorecard/views.py",
                "scorecard/urls.py",
                "scorecard/serializers.py"
            ],
            "endpoints": [
                "POST /api/scorecard/predict/",
                "GET /api/scorecard/models/info/"
            ]
        },
        "phase_3_database_integration": {
            "description": "Store predictions and product data",
            "files_to_modify": [
                "scorecard/models.py"
            ],
            "tasks": [
                "Add prediction result model",
                "Link to product model",
                "Add audit trail"
            ]
        },
        "phase_4_frontend_integration": {
            "description": "Connect React frontend to Django API",
            "files_to_modify": [
                "frontend/src/services/api.js",
                "frontend/src/components/dashboard/"
            ],
            "tasks": [
                "Create prediction API calls",
                "Add sustainability score display",
                "Add progress indicators"
            ]
        }
    }
    
    return plan

if __name__ == "__main__":
    print("🌱 Sustainability Platform ML Model Tester")
    print("=" * 50)
    
    # Run the test
    sample_data, features = test_model_loading()
    
    # Create integration plan
    print("\n📋 Integration Plan:")
    plan = create_django_integration_plan()
    
    for phase, details in plan.items():
        print(f"\n{phase.upper().replace('_', ' ')}:")
        print(f"  Description: {details['description']}")
        if 'files_to_create' in details:
            print(f"  Files to create: {', '.join(details['files_to_create'])}")
        if 'files_to_modify' in details:
            print(f"  Files to modify: {', '.join(details['files_to_modify'])}")
        if 'tasks' in details:
            print("  Tasks:")
            for task in details['tasks']:
                print(f"    - {task}")
        if 'endpoints' in details:
            print("  Endpoints:")
            for endpoint in details['endpoints']:
                print(f"    - {endpoint}")
    
    print("\n✨ Test completed! Check the output above for next steps.")
