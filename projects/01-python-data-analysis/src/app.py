from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MODEL_PATH = PROJECT_ROOT / ".." / ".." / "models" / "logistic_regression_fraud_model.joblib"


# ---------------------------------------------------------
# Load trained model
# ---------------------------------------------------------

model_artifact = joblib.load(MODEL_PATH)

model = model_artifact["model"]
feature_columns = model_artifact["feature_columns"]


# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------

app = FastAPI(
    title="Credit Card Fraud Detection API",
    description="REST API for predicting potentially fraudulent credit card transactions.",
    version="1.0.0",
)


# ---------------------------------------------------------
# Request schema
# ---------------------------------------------------------

class TransactionRequest(BaseModel):
    amount: float
    transaction_hour: int
    merchant_category: str
    foreign_transaction: int
    location_mismatch: int
    device_trust_score: float
    velocity_last_24h: int
    cardholder_age: int


# ---------------------------------------------------------
# Health check
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Credit Card Fraud Detection API",
        "status": "running",
        "model": "Logistic Regression",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
    }


# ---------------------------------------------------------
# Prediction endpoint
# ---------------------------------------------------------

@app.post("/predict")
def predict(transaction: TransactionRequest):

    input_data = {
        "amount": transaction.amount,
        "transaction_hour": transaction.transaction_hour,
        "foreign_transaction": transaction.foreign_transaction,
        "location_mismatch": transaction.location_mismatch,
        "device_trust_score": transaction.device_trust_score,
        "velocity_last_24h": transaction.velocity_last_24h,
        "cardholder_age": transaction.cardholder_age,
    }

    # Add one-hot encoded merchant-category columns
    merchant_categories = [
        "Clothing",
        "Electronics",
        "Food",
        "Grocery",
        "Travel",
    ]

    for category in merchant_categories:
        column_name = f"merchant_category_{category}"
        input_data[column_name] = (
            1 if transaction.merchant_category == category else 0
        )

    # Create DataFrame in the exact feature order used during training
    input_df = pd.DataFrame([input_data])

    input_df = input_df[feature_columns]

    # Prediction
    prediction = int(model.predict(input_df)[0])

    fraud_probability = float(model.predict_proba(input_df)[0][1])

    return {
        "is_fraud": prediction,
        "fraud_probability": round(fraud_probability, 4),
        "prediction": "Fraud" if prediction == 1 else "Legitimate",
    }