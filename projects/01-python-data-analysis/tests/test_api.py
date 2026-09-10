from fastapi.testclient import TestClient

from src.app import app


client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "running"
    assert data["model"] == "Logistic Regression"
    assert data["fraud_threshold"] == 0.30


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "healthy"
    assert data["model_loaded"] is True
    assert data["fraud_threshold"] == 0.30


def test_high_risk_transaction_is_fraud():
    payload = {
        "amount": 250,
        "transaction_hour": 2,
        "merchant_category": "Electronics",
        "foreign_transaction": 1,
        "location_mismatch": 1,
        "device_trust_score": 20,
        "velocity_last_24h": 5,
        "cardholder_age": 35,
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["is_fraud"] == 1
    assert data["prediction"] == "Fraud"
    assert data["fraud_probability"] >= 0.30
    assert data["fraud_threshold"] == 0.30


def test_low_risk_transaction_is_legitimate():
    payload = {
        "amount": 75,
        "transaction_hour": 14,
        "merchant_category": "Grocery",
        "foreign_transaction": 0,
        "location_mismatch": 0,
        "device_trust_score": 85,
        "velocity_last_24h": 1,
        "cardholder_age": 35,
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["is_fraud"] == 0
    assert data["prediction"] == "Legitimate"
    assert data["fraud_probability"] < 0.30
    assert data["fraud_threshold"] == 0.30


def test_invalid_transaction_is_rejected():
    payload = {
        "amount": -10,
        "transaction_hour": 25,
        "merchant_category": "Grocery",
        "foreign_transaction": 0,
        "location_mismatch": 0,
        "device_trust_score": 85,
        "velocity_last_24h": 1,
        "cardholder_age": 35,
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 422