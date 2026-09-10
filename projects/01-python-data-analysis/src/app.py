from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MODEL_PATH = (
    PROJECT_ROOT
    / ".."
    / ".."
    / "models"
    / "logistic_regression_fraud_model.joblib"
)


# ---------------------------------------------------------
# Load trained model
# ---------------------------------------------------------

model_artifact = joblib.load(MODEL_PATH)

model = model_artifact["model"]
feature_columns = model_artifact["feature_columns"]


# ---------------------------------------------------------
# Prediction configuration
# ---------------------------------------------------------

# The model analysis showed that a 0.30 threshold provides
# higher fraud recall than the default 0.50 threshold.
# For fraud detection, catching more fraudulent transactions
# is prioritized over maximizing raw accuracy.

FRAUD_THRESHOLD = 0.30


# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------

app = FastAPI(
    title="Credit Card Fraud Detection API",
    description=(
        "REST API for predicting potentially fraudulent "
        "credit card transactions."
    ),
    version="1.1.0",
)


# ---------------------------------------------------------
# Request schema
# ---------------------------------------------------------

class TransactionRequest(BaseModel):
    amount: float = Field(gt=0)
    transaction_hour: int = Field(ge=0, le=23)
    merchant_category: str
    foreign_transaction: int = Field(ge=0, le=1)
    location_mismatch: int = Field(ge=0, le=1)
    device_trust_score: float = Field(ge=0, le=100)
    velocity_last_24h: int = Field(ge=0)
    cardholder_age: int = Field(ge=18, le=100)


# ---------------------------------------------------------
# Health check
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Credit Card Fraud Detection API",
        "status": "running",
        "model": "Logistic Regression",
        "fraud_threshold": FRAUD_THRESHOLD,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
        "fraud_threshold": FRAUD_THRESHOLD,
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

    # -----------------------------------------------------
    # One-hot encode merchant category
    # -----------------------------------------------------

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

    # -----------------------------------------------------
    # Create DataFrame using training feature order
    # -----------------------------------------------------

    input_df = pd.DataFrame([input_data])

    input_df = input_df[feature_columns]

    # -----------------------------------------------------
    # Calculate fraud probability
    # -----------------------------------------------------

    fraud_probability = float(
        model.predict_proba(input_df)[0][1]
    )

    # -----------------------------------------------------
    # Apply business-oriented threshold
    # -----------------------------------------------------

    prediction = int(
        fraud_probability >= FRAUD_THRESHOLD
    )

    return {
        "is_fraud": prediction,
        "fraud_probability": round(fraud_probability, 4),
        "fraud_threshold": FRAUD_THRESHOLD,
        "prediction": (
            "Fraud"
            if prediction == 1
            else "Legitimate"
        ),
    }