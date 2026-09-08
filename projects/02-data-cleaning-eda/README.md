# Project 02 — Online Retail Data Cleaning & Exploratory Data Analysis



## Project Overview



This project performs end-to-end data cleaning and exploratory data analysis on the **UCI Online Retail Dataset**.



The goal is to transform a large, messy transaction-level dataset into a reliable analytical dataset and extract business insights related to sales performance, returns, products, geography, and customer behavior.



---



## Business Objective



The analysis focuses on answering the following questions:



1. What data-quality issues exist in the raw dataset?

2. How should duplicates, cancellations, returns, and unusual prices be handled?

3. Which countries contribute most to transaction value?

4. Which products generate the highest transaction value and sales volume?

5. How does customer purchase frequency relate to customer value?

6. How concentrated is transaction value among high-value customers?

7. How common is return behavior?

8. Is customer value associated with return activity?



---



## Dataset



**Source:** UCI Machine Learning Repository — Online Retail Dataset



Official dataset page:



https://www.uci.ics.uci.edu/dataset/352/online%2Bretail



The dataset contains transaction records from a UK-based online retailer covering December 2010 through December 2011.



### Dataset Characteristics



- **Original rows:** 541,909

- **Columns:** 8

- **Countries:** 38

- **Time period:** December 2010 – December 2011

- **Original variables:**

&#x20; - InvoiceNo

&#x20; - StockCode

&#x20; - Description

&#x20; - Quantity

&#x20; - InvoiceDate

&#x20; - UnitPrice

&#x20; - CustomerID

&#x20; - Country

- **Cancellations:** Invoice numbers beginning with `C`



Each row represents a product line within an invoice rather than an entire customer order.



---



## Data Quality Findings



The raw dataset contains several important data-quality issues:



- **5,268 exact duplicate rows** (0.97%)

- **1,454 missing Description values** (0.27%)

- **135,080 missing CustomerID values** (24.93%)

- Negative quantities representing returns/cancellations

- Zero-price transactions

- Two negative UnitPrice accounting adjustment records



The analysis does not blindly remove unusual values. Each issue is investigated in the context of the underlying retail business process.



---



## Data Cleaning Methodology



### 1. Duplicate Records



Exact duplicate rows were removed using:



```python

df.drop_duplicates()

