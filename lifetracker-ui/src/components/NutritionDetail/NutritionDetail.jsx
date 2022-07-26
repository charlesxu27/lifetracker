import * as React from "react"
import { useParams } from "react-router-dom"
import NutritionCard from "../NutritionCard/NutritionCard"
// import apiClient from "services/apiClient"
import apiClient from "../../services/apiClient"

import "./NutritionDetail.css"

export default function NutritionDetail() {
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [nutrition, setNutrition] = React.useState({})
    // )
  const { nutritionId } = useParams()

  const getNutritionData = async () => {
    setIsLoading(true)
      const { data, error } = await apiClient.fetchNutrition(nutritionId)
      if (data?.nutrition) {
        setNutrition(data.nutrition)
      }
    setIsLoading(false)
  }

  React.useEffect(() => {
    getNutritionData();
  }, []);

  if (isLoading) {
    return (
      <h1 className="loading">Loading...</h1>
    )
  }

  return (
    <div className="nutrition-detail">
      <NutritionCard 
        imageUrl={nutrition.image_url}
        name={nutrition.name}
        calories={nutrition.calories}
        quantity={nutrition.quantity}
        category={nutrition.category}
        createdAt={nutrition.created_at}
      />
    </div>
  )
}