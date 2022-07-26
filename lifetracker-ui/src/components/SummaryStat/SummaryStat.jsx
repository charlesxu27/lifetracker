import * as React from "react"
import "./SummaryStat.css"

export default function SummaryStat( {stat, label, substat} ) {

  const formattedStat = parseFloat(stat)
  return (
    <div className="summary-stat">
      <div className="primary">
        <span className="primary-statistic">{formattedStat}</span>
        <span className="stat-label"> {label}</span>
      </div>
      <span className="secondary-statistic">{substat}</span>
    </div>
  )
}
