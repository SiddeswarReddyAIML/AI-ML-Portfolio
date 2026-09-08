# Credit Card Transaction Data Analysis & Fraud Detection

## Project Overview

This project is an end-to-end exploratory data analysis and machine learning project focused on understanding patterns in credit card transactions and building a baseline fraud detection model.

The project demonstrates a complete beginner-to-intermediate data science workflow:

- Data loading
- Data quality inspection
- Exploratory Data Analysis (EDA)
- Feature analysis
- Categorical encoding
- Train/test splitting
- Logistic Regression classification
- Model evaluation
- Threshold analysis
- ROC-AUC analysis
- Precision-Recall analysis
- Model serialization and validation

The project uses a synthetic credit card transaction dataset containing 10,000 transactions.

---

## Business Problem

Credit card fraud detection is a classification problem where the goal is to identify potentially fraudulent transactions while minimizing false alerts.

A fraud detection system needs to balance two competing objectives:

1. Detect as many fraudulent transactions as possible.
2. Avoid incorrectly flagging legitimate customers and transactions.

This project investigates transaction-level characteristics that may be associated with fraudulent activity and develops a baseline machine learning model for classification.

---

## Dataset

The dataset contains 10,000 synthetic credit card transactions.

### Features

| Feature | Description |
|---|---|
| `transaction_id` | Unique transaction identifier |
| `amount` | Transaction amount |
| `transaction_hour` | Hour of the transaction |
| `merchant_category` | Merchant category |
| `foreign_transaction` | Whether the transaction occurred as a foreign transaction |
| `location_mismatch` | Whether there is a location mismatch |
| `device_trust_score` | Trust score associated with the device |
| `velocity_last_24h` | Number of transactions in the previous 24 hours |
| `cardholder_age` | Age of the cardholder |
| `is_fraud` | Target variable: 1 = fraud, 0 = legitimate |

---

## Project Structure

```text
01-python-data-analysis/
│
├── data/
│   └── credit_card_fraud_10k.csv
│
├── notebooks/
│   └── 01_credit_card_data_analysis.ipynb
│
├── README.md
└── requirements.txt