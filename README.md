# GymNation Data Platform
### End-to-end analytics, BI and data-science platform for a GCC fitness leader

**Author:** Kareem Makki (Lead Data Professional case study)
**Context:** Portfolio-grade deliverable simulating a real leadership brief at
GymNation — Dubai-headquartered, multi-club gym and fitness operator scaling
across the GCC.

---

## 1. Business problem

GymNation wants to become a **fully data-driven fitness business**. Leadership
needs to:

- understand member behavior and cohort dynamics
- reduce churn, especially in the month 3–5 window
- plug recurring-revenue leakage from failed payments
- allocate marketing spend to the channels that deliver durable LTV
- benchmark club performance and rebalance operations
- forecast membership and revenue with scenario discipline
- give the CEO, COO, CFO, CMO, CTO and Head of Operations a single source
  of truth they actually trust

This repository is a complete implementation of that brief: synthetic but
realistic data, engineered pipelines, executed ML models, live KPIs, BI-ready
marts, dashboard specs, and an executive deliverable set.

## 2. Tools & stack

| Layer | Technology |
|---|---|
| Language | Python 3.12, SQL (SQLite / PostgreSQL compatible) |
| Data | pandas, numpy, openpyxl |
| Warehouse | SQLite (swap-in ready for Postgres / Snowflake) |
| Analytics | matplotlib, seaborn |
| ML | scikit-learn (Logistic, RF, GBR, KMeans) |
| Deep learning | TensorFlow / PyTorch (benchmark experiment) |
| Forecasting | statsmodels-compatible moving-average with scenario engine |
| BI | Power BI / Tableau (spec + CSV marts) |
| Delivery | docx, xlsx, pptx, pdf, ipynb |

## 3. Architecture

```
             ┌────────────────────────┐
             │   Source systems       │
             │  (CRM, POS, Gateway,   │
             │   App, Marketing)      │
             └──────────┬─────────────┘
                        │  extract
             ┌──────────▼─────────────┐
             │  data/raw (bronze)     │
             └──────────┬─────────────┘
                        │  scripts/etl_pipeline.py
             ┌──────────▼─────────────┐
             │ data/processed (silver)│
             │  + feature_store (gold)│
             └──────────┬─────────────┘
                        │
          ┌─────────────┼──────────────┐
          │             │              │
   ┌──────▼─────┐ ┌─────▼──────┐ ┌─────▼──────┐
   │  gymnation │ │  ML models │ │  BI marts  │
   │    .db     │ │  (joblib)  │ │    CSVs    │
   └──────┬─────┘ └─────┬──────┘ └─────┬──────┘
          │             │              │
          └─────────────┴──────────────┘
                        │
             ┌──────────▼─────────────┐
             │  Dashboards + Reports  │
             │  (Exec / Ops / Mktg /  │
             │   Finance / Retention) │
             └────────────────────────┘
```

## 4. Data sources

Synthetic but business-consistent datasets live in `data/raw/`:

| Table | Rows | Description |
|---|---:|---|
| `members_raw.csv` | 22,000 | Member dim with demographics, plan, status, churn |
| `memberships_raw.csv` | 29,652 | Transactional membership records (renewals) |
| `payments_raw.csv` | 215,216 | Recurring + ad-hoc payments w/ gateway & retries |
| `visits_raw.csv` | 280,000 | Check-ins with duration and peak-hour flag |
| `classes_raw.csv` | 28,000 | Class sessions with capacity & bookings |
| `leads_raw.csv` | 55,000 | Marketing leads with conversion flag |
| `marketing_raw.csv` | 120 | Campaigns with spend, impressions, CAC |
| `app_events_raw.csv` | 220,000 | In-app behavior |
| `feedback_raw.csv` | 16,000 | CSAT feedback by category |
| `clubs_raw.csv` | 23 | Clubs across Dubai, Abu Dhabi, Sharjah, Riyadh, Jeddah, Manama |
| `trainers_raw.csv` | 180 | Trainers with specialty & rating |
| `competitor_pricing_raw.csv` | 40 | Competitor pricing benchmark |

External enrichment (`data/external/`): area demographics, Dubai locations,
market benchmarks.

## 5. Project structure

```
GymNation_Data_Platform/
├── data/{raw, processed, external}
├── notebooks/   (9 Jupyter notebooks covering ETL → EDA → KPIs → ML → BI)
├── scripts/     (ETL, feature engineering, model training, scoring, DQ, utils)
├── sql/         (DDL, staging, marts, KPI, churn dataset, exec reporting)
├── dashboards/  (5 dashboard specs + mockup notes)
├── reports/     (KPI snapshots, model metrics, charts, docx, xlsx, pdf)
├── presentation/(board pack pptx)
├── README.md
├── requirements.txt
└── .gitignore
```

## 6. How to run

```bash
# 0. install
pip install -r requirements.txt

# 1. generate raw synthetic data
python scripts/generate_synthetic_data.py

# 2. run the ETL pipeline (bronze → silver → gold → SQLite)
python scripts/etl_pipeline.py

# 3. run analytics + train models + produce charts
python scripts/analytics_ml_pipeline.py

# 4. persist models and score active members
python scripts/model_training.py
python scripts/batch_score_churn.py

# 5. build forecasts and DQ
python scripts/forecast_pipeline.py
python scripts/data_quality_checks.py

# 6. explore interactively
jupyter notebook notebooks/
```

## 7. Analysis summary

**Headline KPIs (from live run on synthetic data):**

| Metric | Value |
|---|---|
| Total members | 22,000 |
| Active members | 18,742 |
| Churn rate | 9.4% |
| MRR | AED 881,881 |
| ARR | AED 10.58 M |
| Total revenue (all-time) | AED 60.4 M |
| LTV | AED 6,931 |
| Failed payment rate | 2.95% |
| Avg visits per member | 12.76 |
| Clubs | 23 |

## 8. Machine learning summary

| Task | Best model | Metric |
|---|---|---|
| Churn classification | Gradient Boosting | AUC ≈ 0.986 |
| CLV regression | Gradient Boosting | MAE ≈ AED 1,754 |
| Segmentation | KMeans (k=4) | 4 commercial segments |
| Forecasting | MA6 + scenarios | 6-month horizon |
| Deep learning benchmark | Keras MLP | Matches but does not beat GB |

Top churn drivers: `days_since_last_visit`, `failed_rate`, `tenure_months`,
`engagement_score`, `visits_per_month`.

## 9. Dashboards

Full specs in `dashboards/`:
1. Executive (CEO/CFO/Board)
2. Operations (COO/Club managers)
3. Marketing (CMO/Performance)
4. Finance (CFO/Collections)
5. Retention & Member Health (Member Experience)

## 10. Key business impact

Directly translatable to revenue and retention moves:
- **Month-3 Save playbook** targeting the highest-churn window
- **Smart retry** on failed payments (timing + gateway routing)
- **Channel rebalancing** toward the top-2 most efficient acquisition channels
- **Club Health Score** as a manager KPI
- **Retention action queue** wired into daily stand-up

## 11. Future improvements

- Replace synthetic generator with live CRM + gateway feeds
- Swap SQLite for Snowflake, add dbt for transformations
- Promote Gradient Boosting churn model to a scheduled endpoint (MLflow)
- Add Prophet for calibrated forecast intervals
- Add LLM summarization on member feedback free-text
