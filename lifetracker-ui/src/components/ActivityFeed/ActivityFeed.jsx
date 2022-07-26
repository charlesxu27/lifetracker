import * as React from "react"
import { useNavigate } from "react-router-dom"
import SummaryStat from "../SummaryStat/SummaryStat"
import moment from "moment"
import "./ActivityFeed.css"

export default function ActivityFeed( {totalCaloriesPerDay=[], avgCaloriesPerCategory=[]} ) {

  const navigate = useNavigate()

  console.log("avgCaloriesPerCategory", avgCaloriesPerCategory)
  console.log("totalCaloriesPerDay", totalCaloriesPerDay)
  return (
    <div className="activity-feed-container">

      
    <div className="activity-feed">
      <div className="header-bar">
      <h1>Activity Feed</h1>
        <div className="record-buttons">
          <button className="record-nutrition-button main-button" onClick={()=> navigate("/nutrition/create")}>Record Nutrition</button>
          <button className="record-sleep-button main-button">Log Sleep</button>
          <button className="record-exercise-button main-button">Add Exercise</button>
        </div>
      </div>

      <div className="feed-block">
        <div className="per-category">
          <h4>Average Calories Per Category</h4>
          <div className="stat-feed">
            {avgCaloriesPerCategory.map((categoryStat, index) => {
              return <SummaryStat 
                        key={index}
                        stat={categoryStat.avgCaloriesPerCategory}
                        label={categoryStat.avgCaloriesPerCategory != 1 ? "calories" : "calorie"}
                        substat={categoryStat.category}
                        />
            })}
          </div>
        </div>

        <div className="per-day">
          <h4>Total Calories Per Day</h4>
          <div className="stat-feed">
            {totalCaloriesPerDay.map((dayStat, index) => {
              return <SummaryStat 
                        key={index}
                        stat={dayStat.totalCaloriesPerDay}
                        label={dayStat.totalCaloriesPerDay != 1 ? "calories" : "calorie"}
                        substat={moment(new Date(dayStat.date)).format("MM/DD/YYYY")}
                        />
            })}
          </div>
        </div>
      </div>

    </div>


    </div>
  )
}
