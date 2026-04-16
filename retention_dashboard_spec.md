# Retention & Member Health Dashboard — Specification

**Audience:** Head of Member Experience, Retention Squad, Club Managers
**Refresh:** Daily; model scores refreshed weekly
**Data source:** `gold_feature_store`, `churn_risk_scored.csv`, `fact_visit`, `fact_payment`

## Business questions answered
1. Which active members are most likely to churn in the next 30 days?
2. Which engagement behaviors predict retention?
3. Which clubs have the highest churn velocity?
4. Are interventions (calls, offers, freezes) actually saving members?
5. Where should the retention team focus calls this week?

## KPI tiles
- Active members
- Members in Critical risk tier
- Members with zero visits in 30 days
- Avg engagement score
- Freeze ratio
- Intervention save rate

## Core visuals
- **Risk tier pyramid** — Critical / High / Medium / Low counts, clickable.
- **Visit drop-off chart** — cohort retention curve by join month.
- **Engagement score distribution** — histogram with segment overlays.
- **Churn driver bar chart** — top feature importances from live model.
- **Action queue** — sortable list of Critical / High risk members with suggested action.

## Filters
Club · Membership type · Risk tier · Tenure bucket · Last visit window

## Drill-through
Risk tier → action queue → member 360° view (visits, payments, tickets, last contact).
