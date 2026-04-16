# Finance Dashboard — Specification

**Audience:** CFO, FP&A, Collections, Treasury
**Refresh:** Daily close-of-business
**Data source:** `fact_payment`, `dim_campaign`, `mart_revenue_monthly`

## Business questions answered
1. What is our realized vs billed revenue this month?
2. How much revenue is leaking through failed payments and chargebacks?
3. Which gateway is the most reliable?
4. What is the recovery rate on retried payments?
5. Where is the biggest collection-risk concentration?

## KPI tiles
- Collected revenue (MTD)
- Billed vs collected delta
- Failed payment rate %
- Payment recovery rate %
- Chargebacks AED (MTD)
- Days sales outstanding (DSO)

## Core visuals
- **Revenue waterfall** — billed → failed → recovered → collected.
- **Gateway reliability** — failure rate and recovery rate per gateway.
- **Failed payment trend** — stacked area: failed vs recovered vs lost.
- **Chargeback watch** — list of chargebacks this week with category breakdown.
- **Revenue leakage by club** — top 10 clubs with highest failed AED.

## Filters
Gateway · Payment method · Club · Membership type · Date range

## Drill-through
Failed trend → specific member → retry history.
