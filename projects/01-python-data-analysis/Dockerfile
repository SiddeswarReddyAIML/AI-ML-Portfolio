FROM python:3.11-slim

WORKDIR /app

COPY projects/01-python-data-analysis/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY projects/01-python-data-analysis/src ./src

COPY models/logistic_regression_fraud_model.joblib /models/logistic_regression_fraud_model.joblib

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health')"

CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]