# Credit Card Transaction Analysis & Fraud Detection

## Project Overview

This project is an end-to-end FinTech machine learning project focused on analyzing credit card transactions and building a baseline fraud detection system.

The project covers the complete workflow from exploratory data analysis to model deployment:

- Data loading and validation
- Data quality inspection
- Exploratory Data Analysis (EDA)
- Fraud pattern analysis
- Feature engineering and categorical encoding
- Stratified train/test splitting
- Logistic Regression classification
- Model evaluation
- Classification threshold analysis
- ROC-AUC analysis
- Precision/Recall analysis
- Model serialization with Joblib
- REST API development with FastAPI
- Docker containerization
- API testing through a Docker container

The dataset contains **10,000 synthetic credit card transactions**, with fraud representing approximately **1.51%** of all transactions.

---

## Business Problem

Credit card fraud detection is a highly imbalanced binary classification problem.

A fraud detection system needs to balance two competing objectives:

1. Detect as many fraudulent transactions as possible.
2. Avoid incorrectly flagging legitimate transactions.

Missing a fraudulent transaction can create financial and security risks, while excessive false positives can negatively affect legitimate customers.

This project investigates transaction-level signals associated with fraudulent activity and develops a baseline machine learning model that can be served through a REST API.

---

## Dataset

The project uses a synthetic credit card transaction dataset containing **10,000 transactions**.

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

The dataset contains:

- **10,000 total transactions**
- **151 fraudulent transactions**
- **9,849 legitimate transactions**
- Fraud rate: **1.51%**

### Key Findings

#### Foreign Transactions

Fraudulent transactions showed a substantially higher foreign-transaction rate:

- Fraud transactions: **8.38%**
- Non-fraud transactions: **0.76%**

This indicates that foreign transaction status can be a useful fraud signal.

#### Location Mismatch

Transactions with a location mismatch showed a higher observed fraud rate:

- Location mismatch: **8.40%**
- No location mismatch: **0.86%**

#### Device Trust Score

Average device trust score:

- Fraud: **37.87**
- Legitimate: **62.17**

Lower device trust scores were associated with higher observed fraud risk.

#### Transaction Velocity

Average transactions in the previous 24 hours:

- Fraud: **3.21**
- Legitimate: **1.99**

Higher transaction velocity was associated with increased observed fraud risk.

#### Transaction Time

The highest observed fraud rates occurred around the **00:00–03:00** period.

#### Transaction Amount

Average transaction amount:

- Fraud: **216.18**
- Legitimate: **175.33**

Fraudulent transactions had a higher average transaction amount in this dataset.

#### Cardholder Age

Cardholder age showed very similar distributions between fraudulent and legitimate transactions, suggesting that age was not a strong differentiating signal in this dataset.

---

## Data Quality

The dataset was checked for:

- Missing values
- Duplicate rows
- Duplicate transaction IDs
- Invalid categorical values
- Data types
- Numerical ranges

No duplicate rows or duplicate transaction IDs were identified.

---

## Machine Learning Approach

### Model

A **Logistic Regression** classifier was selected as the baseline model.

The model was trained using:

```text
LogisticRegression(
    max_iter=1000,
    random_state=42
)