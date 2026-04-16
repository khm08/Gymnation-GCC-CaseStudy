# Marketing Dashboard — Specification

**Audience:** CMO, Head of Performance Marketing, Brand Team
**Refresh:** Daily, with weekly CAC/LTV recalibration
**Data source:** `dim_campaign`, `fact_lead`, `dim_member`, `mart_marketing_efficiency`

## Business questions answered
1. Which channels deliver the lowest CAC for the highest-LTV members?
2. Where in the funnel are we leaking the most leads?
3. Which campaigns are worth scaling vs killing?
4. How does referral compare to paid acquisition on retention?
5. Is our brand investment translating into measurable pipeline?

## KPI tiles
- Total marketing spend (MTD / QTD)
- Leads generated
- Lead → join conversion %
- Blended CAC
- LTV / CAC ratio
- Referral share of joins

## Core visuals
- **Funnel chart** — impressions → clicks → leads → joins → retained at 90d.
- **CAC by channel** — horizontal bar, sorted ascending, with benchmark line.
- **Campaign ROI table** — channel, spend, conversions, CAC, LTV, ROI %.
- **Cohort quality by channel** — 3/6/12-month retention of members sourced per channel.
- **Spend pacing** — daily/weekly spend vs budget by channel.

## Filters
Channel · Campaign · Date range · City · Membership type acquired

## Drill-through
CAC by channel → campaign list → individual lead journey.
