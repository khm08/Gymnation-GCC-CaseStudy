# Operations Dashboard — Specification

**Audience:** Head of Operations, Club Managers, Regional Managers
**Refresh:** Hourly during club hours, daily overnight summary
**Data source:** `fact_visit`, `fact_class`, `dim_trainer`, `dim_club`

## Business questions answered
1. Which clubs are running above / below capacity?
2. What are our true peak hours by club and day?
3. Are classes filling up, and which class types underperform?
4. Which trainers are over / under utilized?
5. Where do we need to rebalance schedules or staff?

## KPI tiles
- Visits today (vs 7-day avg)
- Peak-hour utilization %
- Avg class fill rate (booked / capacity)
- Trainer hours delivered vs scheduled
- Operational anomaly count (visit drop >30% WoW)

## Core visuals
- **Hourly visit heatmap** — club × hour-of-day, darker = busier.
- **Class fill rate** — bar chart by class type, benchmarked vs capacity.
- **Trainer utilization gauge** — % of scheduled hours actually delivered.
- **Capacity trend** — weekly visit volume per club with capacity overlay.
- **Anomaly strip** — list of clubs where visit volume is statistically out-of-range.

## Filters
City · Club · Day of week · Class type · Trainer specialty

## Drill-through
Club card → hourly visit detail → class-level bookings → trainer assignment.
