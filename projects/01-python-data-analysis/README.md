# Credit Card Transaction Analysis & Fraud Detection

An end-to-end FinTech machine learning project that analyzes credit card transactions, identifies fraud-related patterns, trains a baseline fraud detection model, and deploys the model as a production-style REST API using FastAPI and Docker.

---

## Project Overview

Credit card fraud detection is a highly imbalanced classification problem where the cost of missing fraudulent activity can be significantly higher than the cost of reviewing legitimate transactions.

This project demonstrates an end-to-end machine learning workflow:

1. Data loading and validation
2. Data quality inspection
3. Exploratory Data Analysis (EDA)
4. Fraud pattern analysis
5. Feature engineering
6. Categorical encoding
7. Stratified train/test splitting
8. Logistic Regression modeling
9. Model evaluation
10. ROC-AUC analysis
11. Precision/Recall analysis
12. Classification threshold optimization
13. Model serialization with Joblib
14. REST API development with FastAPI
15. Automated API testing with Pytest
16. Docker containerization
17. Docker health monitoring
18. End-to-end API validation

The project uses **10,000 synthetic credit card transactions**, with fraud representing only **1.51%** of all transactions.

---

## Business Problem

Financial institutions need fraud detection systems that can identify suspicious transactions while minimizing unnecessary disruption to legitimate customers.

The key challenge is balancing:

- **Fraud recall** - catching as many fraudulent transactions as possible
- **Precision** - avoiding excessive false fraud alerts
- **Customer experience** - minimizing legitimate transactions incorrectly flagged as fraud
- **Operational efficiency** - producing predictions quickly enough for downstream decision-making

For this project, fraud detection is treated as a classification problem where the model produces a probability of fraud.

A business-oriented classification threshold of **0.30** was selected instead of the default 0.50 threshold because improving fraud recall is more important than maximizing raw accuracy in this use case.

---

## Dataset

The project uses a synthetic credit card transaction dataset containing:

- **10,000 transactions**
- **151 fraudulent transactions**
- **9,849 legitimate transactions**
- **1.51% fraud rate**

### Features

| Feature | Description |
|---|---|
| `transaction_id` | Unique transaction identifier |
| `amount` | Transaction amount |
| `transaction_hour` | Hour when the transaction occurred |
| `merchant_category` | Merchant category |
| `foreign_transaction` | Whether the transaction was a foreign transaction |
| `location_mismatch` | Whether a location mismatch was detected |
| `device_trust_score` | Trust score associated with the device |
| `velocity_last_24h` | Number of transactions in the previous 24 hours |
| `cardholder_age` | Age of the cardholder |
| `is_fraud` | Target variable: 1 = fraud, 0 = legitimate |

---

## Exploratory Data Analysis

### Class Distribution

The dataset is strongly imbalanced:

- Legitimate transactions: **98.49%**
- Fraudulent transactions: **1.51%**

This imbalance is important because accuracy alone can provide a misleading view of model performance.

### Key Fraud Signals

#### Foreign Transactions

Observed fraud rate:

- Fraud transactions: **8.38%**
- Non-fraud transactions: **0.76%**

Foreign transaction status showed a substantially higher observed fraud rate.

#### Location Mismatch

Observed fraud rate:

- Location mismatch: **8.40%**
- No location mismatch: **0.86%**

Transactions with location mismatches were associated with considerably higher observed fraud risk.

#### Device Trust Score

Average device trust score:

| Transaction Type | Average Score |
|---|---:|
| Fraud | 37.87 |
| Legitimate | 62.17 |

Lower device trust scores were associated with higher observed fraud risk.

#### Transaction Velocity

Average number of transactions during the previous 24 hours:

| Transaction Type | Average Velocity |
|---|---:|
| Fraud | 3.21 |
| Legitimate | 1.99 |

Higher transaction velocity was associated with increased observed fraud risk.

#### Transaction Time

The highest observed fraud rates occurred during approximately:

**00:00-03:00**

This suggests that transaction timing may provide additional predictive information.

#### Transaction Amount

Average transaction amount:

| Transaction Type | Average Amount |
|---|---:|
| Fraud | 216.18 |
| Legitimate | 175.33 |

Fraudulent transactions had a higher average transaction amount in this dataset.

#### Cardholder Age

Cardholder age distributions were relatively similar between fraudulent and legitimate transactions, suggesting that age was not a strong differentiating signal for this dataset.

---

## Data Quality

The dataset was inspected for:

- Missing values
- Duplicate rows
- Duplicate transaction IDs
- Invalid categorical values
- Data types
- Numerical ranges

Results:

- **0 duplicate rows**
- **0 duplicate transaction IDs**

The analysis also included validation of categorical and numerical features before model development.

---

## Machine Learning Approach

### Feature Engineering

The categorical `merchant_category` feature was converted into one-hot encoded features.

The resulting model input contained:

- Numerical transaction features
- Binary transaction indicators
- One-hot encoded merchant categories

The dataset was then divided into training and testing sets using a **stratified split** to preserve the fraud/legitimate class distribution.

### Model

A **Logistic Regression** classifier was selected as the baseline model.

```text
LogisticRegression(
    max_iter=1000,
    random_state=42
)
```

Logistic Regression was selected because it provides:

- A strong baseline for binary classification
- Probability estimates
- Interpretability
- Low computational cost
- Straightforward deployment

---

## Model Evaluation

### Overall Performance

| Metric | Result |
|---|---:|
| Accuracy | **99.30%** |
| ROC-AUC | **0.9944** |

The model achieved strong discrimination between fraudulent and legitimate transactions on the held-out test set.

However, because fraud represents only **1.51%** of the dataset, accuracy alone is not sufficient to evaluate the model.

For fraud detection, **precision, recall, F1 score, and the confusion matrix** provide more useful insight.

---

## Classification Threshold Analysis

The model produces a probability of fraud for each transaction.

Instead of relying only on the default classification threshold of **0.50**, this project evaluates a lower threshold of **0.30**.

### Threshold = 0.50

| Metric | Result |
|---|---:|
| Precision | **94.44%** |
| Recall | **56.67%** |
| F1 Score | **70.83%** |

Confusion matrix:

```text
[[1969,    1],
 [  13,   17]]
```

At the 0.50 threshold:

- 17 fraudulent transactions were correctly detected
- 13 fraudulent transactions were missed
- 1 legitimate transaction was incorrectly flagged
- 1,969 legitimate transactions were correctly classified

This threshold provides high precision but lower fraud recall.

### Threshold = 0.30

| Metric | Result |
|---|---:|
| Precision | **66.67%** |
| Recall | **73.33%** |
| F1 Score | **69.84%** |

Confusion matrix:

```text
[[1959,   11],
 [   8,   22]]
```

At the 0.30 threshold:

- 22 fraudulent transactions were correctly detected
- 8 fraudulent transactions were missed
- 11 legitimate transactions were incorrectly flagged
- 1,959 legitimate transactions were correctly classified

### Business-Oriented Threshold

The deployed API uses:

```text
FRAUD_THRESHOLD = 0.30
```

The threshold was lowered because fraud detection places significant importance on identifying fraudulent transactions.

The change increases fraud recall from:

```text
56.67% -> 73.33%
```

while reducing precision from:

```text
94.44% -> 66.67%
```

This demonstrates an important machine learning principle:

> The best classification threshold depends on the business cost of false positives and false negatives.

For a real financial institution, the threshold should be calibrated using historical fraud losses, investigation capacity, customer impact, and a formal business cost matrix.

---

## Model Artifact

The trained model is serialized using **Joblib**.

Model artifact:

```text
models/logistic_regression_fraud_model.joblib
```

The saved artifact contains:

- Trained Logistic Regression model
- Training feature column order

This allows the FastAPI application to load the trained model and generate predictions without retraining.

---

## FastAPI REST API

The trained model is exposed through a REST API built with **FastAPI**.

### API Architecture

```text
Client
   |
   v
FastAPI REST API
   |
   v
Request Validation
   |
   v
Feature Preparation
   |
   v
Logistic Regression Model
   |
   v
Fraud Probability
   |
   v
Business Threshold (0.30)
   |
   v
Fraud / Legitimate Prediction
```

---

## API Endpoints

### Root Endpoint

```text
GET /
```

Example response:

```json
{
  "message": "Credit Card Fraud Detection API",
  "status": "running",
  "model": "Logistic Regression",
  "fraud_threshold": 0.3
}
```

### Health Endpoint

```text
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "fraud_threshold": 0.3
}
```

### Prediction Endpoint

```text
POST /predict
```

The endpoint accepts transaction information and returns:

- Fraud classification
- Fraud probability
- Active classification threshold
- Human-readable prediction

---

## Example Prediction

### Request

```json
{
  "amount": 250,
  "transaction_hour": 2,
  "merchant_category": "Electronics",
  "foreign_transaction": 1,
  "location_mismatch": 1,
  "device_trust_score": 20,
  "velocity_last_24h": 5,
  "cardholder_age": 35
}
```

### Response

```json
{
  "is_fraud": 1,
  "fraud_probability": 0.9998,
  "fraud_threshold": 0.3,
  "prediction": "Fraud"
}
```

---

## API Input Validation

The API uses **Pydantic** validation through FastAPI.

The request schema validates:

- Transaction amount must be greater than zero
- Transaction hour must be between 0 and 23
- `foreign_transaction` must be 0 or 1
- `location_mismatch` must be 0 or 1
- Device trust score must be between 0 and 100
- Transaction velocity cannot be negative
- Cardholder age must be between 18 and 100

Invalid requests are rejected with HTTP **422 Unprocessable Entity** responses.

---

## Automated API Testing

The project includes automated tests using:

- Pytest
- FastAPI TestClient

The test suite contains five tests:

1. Root endpoint validation
2. Health endpoint validation
3. High-risk transaction prediction
4. Low-risk transaction prediction
5. Invalid transaction rejection

Run the tests from the Project 01 directory:

```cmd
cd projects\01-python-data-analysis
python -m pytest tests\test_api.py -v
```

Expected result:

```text
5 passed
```

The tests verify both API functionality and important business behavior around the fraud threshold.

---

## Docker Deployment

The FastAPI application is containerized using **Docker**.

### Docker Architecture

```text
Docker Container
|
+-- Python 3.11
+-- FastAPI
+-- Uvicorn
+-- Pandas
+-- Scikit-learn
+-- Joblib
+-- Trained Fraud Detection Model
```

The Docker image also includes a health check that periodically calls:

```text
/health
```

to verify that the API is running and the model is loaded.

---

## Build Docker Image

Run this command from the repository root:

```cmd
docker build -t fraud-detection-api -f projects\01-python-data-analysis\Dockerfile .
```

---

## Run Docker Container

```cmd
docker run -d --name fraud-detection-api-container -p 8000:8000 fraud-detection-api
```

Check the running container:

```cmd
docker ps
```

A healthy container should show:

```text
Up ... (healthy)
```

---

## Test the Dockerized API

### Health Check

```cmd
curl http://127.0.0.1:8000/health
```

Expected response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "fraud_threshold": 0.3
}
```

### High-Risk Transaction

```cmd
curl -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" -d "{\"amount\":250,\"transaction_hour\":2,\"merchant_category\":\"Electronics\",\"foreign_transaction\":1,\"location_mismatch\":1,\"device_trust_score\":20,\"velocity_last_24h\":5,\"cardholder_age\":35}"
```

Expected response:

```json
{
  "is_fraud": 1,
  "fraud_probability": 0.9998,
  "fraud_threshold": 0.3,
  "prediction": "Fraud"
}
```

### Low-Risk Transaction

```cmd
curl -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" -d "{\"amount\":75,\"transaction_hour\":14,\"merchant_category\":\"Grocery\",\"foreign_transaction\":0,\"location_mismatch\":0,\"device_trust_score\":85,\"velocity_last_24h\":1,\"cardholder_age\":35}"
```

Expected response:

```json
{
  "is_fraud": 0,
  "fraud_probability": 0.0,
  "fraud_threshold": 0.3,
  "prediction": "Legitimate"
}
```

---

## Docker Health Monitoring

The Dockerfile contains a built-in health check:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health')"
```

This allows Docker to determine whether the application is healthy rather than simply checking whether the container process is running.

---

## Project Structure

```text
01-python-data-analysis/
|
+-- data/
|   +-- credit_card_fraud_10k.csv
|
+-- notebooks/
|   +-- fraud_analysis.ipynb
|
+-- src/
|   +-- __init__.py
|   +-- app.py
|
+-- tests/
|   +-- test_api.py
|
+-- .dockerignore
+-- Dockerfile
+-- README.md
+-- requirements.txt
```

The trained model is stored at the portfolio level:

```text
AI-ML-Portfolio/
|
+-- models/
|   +-- logistic_regression_fraud_model.joblib
|
+-- projects/
    +-- 01-python-data-analysis/
```

---

## Technologies

### Data & Analysis

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook

### Machine Learning

- Scikit-learn
- Logistic Regression
- One-hot encoding
- Stratified train/test split
- ROC-AUC
- Precision
- Recall
- F1 Score
- Classification threshold analysis

### Model Management

- Joblib

### API & Backend

- FastAPI
- Pydantic
- Uvicorn

### Testing

- Pytest
- FastAPI TestClient

### Deployment

- Docker
- Docker Healthcheck

### Version Control

- Git
- GitHub

---

## Local Development

### Navigate to Project

```cmd
cd projects\01-python-data-analysis
```

### Activate Virtual Environment

```cmd
.venv\Scripts\activate
```

### Install Dependencies

```cmd
pip install -r requirements.txt
```

### Run Tests

```cmd
python -m pytest tests\test_api.py -v
```

### Start API

```cmd
uvicorn src.app:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Key Engineering Decisions

### Why Logistic Regression?

Logistic Regression was selected as the baseline because it:

- Is appropriate for binary classification
- Produces probability estimates
- Is interpretable
- Is computationally lightweight
- Provides a strong baseline for structured tabular data
- Is straightforward to deploy through an API

The baseline model also provides a reference point for future experiments with more advanced algorithms.

### Why Stratified Splitting?

Fraud represents only **1.51%** of the dataset.

A stratified train/test split helps preserve the fraud-to-legitimate class distribution in both datasets.

### Why a 0.30 Threshold?

The default threshold of 0.50 produced:

```text
Fraud Recall = 56.67%
```

Reducing the threshold to 0.30 produced:

```text
Fraud Recall = 73.33%
```

The lower threshold therefore detects more fraudulent transactions, although it also increases false positives.

This is a business decision rather than simply a mathematical optimization.

---

## Key Results

| Area | Result |
|---|---:|
| Transactions analyzed | **10,000** |
| Fraudulent transactions | **151** |
| Legitimate transactions | **9,849** |
| Fraud rate | **1.51%** |
| Accuracy | **99.30%** |
| ROC-AUC | **0.9944** |
| Fraud recall @ 0.50 | **56.67%** |
| Fraud recall @ 0.30 | **73.33%** |
| Precision @ 0.30 | **66.67%** |
| F1 @ 0.30 | **69.84%** |
| Automated API tests | **5 passed** |
| Docker health check | **Healthy** |

---

## Business Takeaways

The exploratory analysis identified several transaction characteristics associated with higher observed fraud risk:

- Foreign transactions
- Location mismatches
- Lower device trust scores
- Higher transaction velocity
- Certain transaction hours
- Higher transaction amounts

The machine learning stage demonstrated that a Logistic Regression baseline can provide strong discrimination on this synthetic dataset.

The threshold analysis also demonstrated that model deployment decisions should consider the business cost of false negatives and false positives rather than relying only on default classification thresholds.

---

## Limitations

This project uses a **synthetic dataset**, so the reported model performance should not be interpreted as representative of real-world banking or payment-system fraud detection.

Additional limitations include:

- Dataset size is relatively small
- Synthetic fraud patterns may be simpler than real-world fraud
- No temporal validation was performed
- No concept-drift analysis was performed
- No formal cost-sensitive learning was implemented
- No probability calibration was performed
- No real-time transaction streaming pipeline is included
- Logistic Regression is used as a baseline rather than a production-grade ensemble
- The API currently performs categorical encoding manually

---

## Future Improvements

### Machine Learning

- Random Forest
- XGBoost
- LightGBM
- Gradient Boosting
- Class-weighted models
- Cost-sensitive learning
- Hyperparameter optimization
- Cross-validation
- Probability calibration
- SHAP-based model explainability

### Fraud Detection

- Dynamic fraud thresholds
- Transaction-level cost matrix
- Risk scoring
- Real-time fraud decisioning
- Temporal feature engineering
- Customer behavioral profiles
- Transaction sequence features

### Production Engineering

- Kafka-based transaction streaming
- Redis for low-latency feature access
- MLflow experiment tracking
- Model versioning
- CI/CD
- Cloud deployment
- Monitoring and alerting
- Data drift detection
- Model drift detection
- Automated retraining

### API

- Authentication and authorization
- Structured logging
- Request tracing
- Rate limiting
- Centralized exception handling
- Production observability

---

## End-to-End Workflow

```text
Raw Transaction Data
        |
        v
Data Validation
        |
        v
Exploratory Data Analysis
        |
        v
Feature Engineering
        |
        v
Stratified Train/Test Split
        |
        v
Logistic Regression
        |
        v
Model Evaluation
        |
        v
Threshold Optimization
        |
        v
Joblib Model Artifact
        |
        v
FastAPI REST API
        |
        v
Automated Pytest Validation
        |
        v
Docker Container
        |
        v
Health Monitoring
```

---

## What This Project Demonstrates

This project demonstrates practical experience across multiple stages of the machine learning lifecycle:

- Data analysis
- Feature engineering
- Imbalanced classification
- Model evaluation
- Business-oriented threshold selection
- Model serialization
- REST API development
- Input validation
- Automated testing
- Docker containerization
- Application health monitoring

It combines **data science, machine learning, backend API development, software testing, and containerization** into a single end-to-end FinTech project.

---

## Author

**Boreddygari Siddeswar Reddy**

AI/ML Engineer | Data Scientist

### Portfolio

https://ai-ml-portfolio-rose.vercel.app

### GitHub

https://github.com/SiddeswarReddyAIML

### LinkedIn

https://www.linkedin.com/in/boreddygarisiddeswarreddy/

### Email

siddeswarreddyboreddygari@gmail.com

---

## Project Status

**Completed**

This project is part of my AI/ML portfolio, with subsequent projects focused on data analysis, machine learning, Generative AI, RAG, MLOps, and production-oriented AI systems.