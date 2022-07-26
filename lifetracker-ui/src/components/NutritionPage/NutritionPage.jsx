import * as React from "react"
import { Routes, Route } from "react-router-dom"
import { NutritionContextProvider } from "../../contexts/nutrition"
import NutritionOverview from "../NutritionOverview/NutritionOverview"
import NutritionNew from "../NutritionNew/NutritionNew"
import NutritionDetail from "../NutritionDetail/NutritionDetail"
import NotFound from "../NotFound/NotFound"
import "./NutritionPage.css"

export default function NutritionContainer() {
  return (
    <NutritionContextProvider>
      <NutritionPage/>
    </NutritionContextProvider>
  )
}

export function NutritionPage() {
  return (
    <div className="nutrition-page">
      <h1>Nutrition</h1>
      <Routes>
        <Route path="/" element={
          <NutritionOverview />} />
        <Route path="/create" element={
          <NutritionNew />} />
        <Route path="/id/:nutritionId" element={
          <NutritionDetail />} />
        <Route path="/*" element={
          <NotFound />} />
      </Routes>

    </div>
  )
}
