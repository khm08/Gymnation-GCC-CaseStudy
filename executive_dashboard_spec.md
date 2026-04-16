# Executive Dashboard — Specification

**Audience:** CEO, COO, CFO, Board
**Refresh:** Daily (overnight) with weekly MBR view
**Tool:** Power BI (primary), Tableau (fallback)
**Data source:** `gymnation.db` → `mart_revenue_monthly`, `mart_club_performance`, `kpi_snapshot.csv`

## Business questions answered
1. Are we growing members, MRR, and retention month-on-month?
2. Which clubs are top and bottom performers on revenue and churn?
3. Is payment leakage trending up or down?
4. Is our CAC sustainable relative to LTV?
5. Where do we need immediate intervention this week?

## KPI tiles (top row)
| KPI | Format | Source | Target / Alert |
|---|---|---|---|
| Total Active Members | #,### | `dim_member` | Alert if WoW decline >2% |
| MRR | AED #,###,### | `mart_revenue_monthly` | Target 3% MoM growth |
| Churn Rate (monthly) | 0.0% | `dim_member` | Alert >5% |
| LTV / CAC ratio | 0.0x | `kpi_snapshot` | Target ≥3.0x |
| Failed Payment Rate | 0.0% | `fact_payment` | Alert >4% |
| Net New Members (30d) | #,### | `dim_member` | Target vs plan |

## Core visuals
- **Revenue trend** — line chart, 24 months, with 6-month forecast overlay (base/aggressive/conservative).
- **Club ranking** — horizontal bar, top 10 and bottom 10 by revenue, color-coded by churn tier.
- **Retention cohort heatmap** — join-month vs months-since-join.
- **Failed payment trend** — dual-axis: % failed vs recovered AED.
- **Marketing funnel** — impressions → clicks → leads → joins, with CAC annotation.
- **Alert feed** — list of clubs/segments breaching thresholds this week.

## Filters (slicers)
City · Club · Membership type · Date range · Channel

## Drill-through
Revenue trend → monthly breakdown by club → member-level payment history.
