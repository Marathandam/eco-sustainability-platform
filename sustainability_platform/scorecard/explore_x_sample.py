import numpy as np
import pandas as pd

# 🔁 Path to your saved NumPy feature matrix
X_PATH = "D:\Code\eco-sustainability-platform\sustainability_platform\data\X.npy"  # Change if needed

def explore_numpy_array(file_path):
    print(f"📂 Loading: {file_path}")
    
    try:
        X = np.load(file_path)
    except Exception as e:
        print(f"❌ Failed to load .npy file: {e}")
        return

    print("✅ Loaded X.npy")
    print(f"Shape: {X.shape}")
    print(f"Type: {type(X)}")
    
    # Convert to DataFrame to compute stats
    df = pd.DataFrame(X)

    print("\n📊 Summary Statistics (first 10 features):")
    print(df.iloc[:, :10].describe())

    print("\n🔍 Preview of first 3 rows:")
    print(df.head(3))

if __name__ == "__main__":
    explore_numpy_array(X_PATH)
