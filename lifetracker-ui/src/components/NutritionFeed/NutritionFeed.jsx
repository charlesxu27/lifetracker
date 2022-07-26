import * as React from "react"
import NutritionCard from "../NutritionCard/NutritionCard"
import "./NutritionFeed.css"

export default function NutritionFeed( {nutritions=[]} ) {
  // nutritions is an array of objects, each nutrition object has the properties
    // calories, category, created_at, id, image_url, name, quantity, user_id
  console.log("nutritions received in NutritionFeed:", nutritions)

  return (
    <div className="nutrition-feed">
      <div className="nutrition-feed-container">
        <div className="feed">
          {nutritions.length <= 0
          ? <p className="empty-message">Nothing here yet</p>
          : nutritions.map(nutrition => {
              return <NutritionCard
                        key={nutrition.id}
                        nutritionId={nutrition.id}
                        imageUrl={nutrition.image_url}
                        name={nutrition.name}
                        calories={nutrition.calories}
                        quantity={nutrition.quantity}
                        category={nutrition.category}
                        createdAt={nutrition.created_at}
                      /> }
              )
          }
        </div>
      </div>
    </div>
  )
}