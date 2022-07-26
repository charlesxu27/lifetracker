import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useNutritionContext } from "../../contexts/nutrition"
import "./NutritionForm.css"

export default function NutritionForm() {
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState({ name: "", calories: 1, imageUrl: "", category: "", quantity: 1 })

  const { error, setError, addNutrition } = useNutritionContext()

  const handleOnInputChange = (evt) => {
    setError(null)

    if (evt.target.name === "name") {
      if (evt.target.value == "") {
        setErrors((e) => ({ ...e, name: "Please enter a name" }))
      } else {
        setErrors((e) => ({ ...e, name: null }))
      }
    }

    if (evt.target.name === "calories") {
      if (evt.target.value == null) {
        setErrors((e) => ({ ...e, calories: "Please enter a valid value for calories" }))
      } else {
        setErrors((e) => ({ ...e, calories: null }))
      }
    }

    if (evt.target.name === "category") {
      if (evt.target.value == "") {
        setErrors((e) => ({ ...e, category: "Please enter a category" }))
      } else {
        setErrors((e) => ({ ...e, category: null }))
      }
    }

    if (evt.target.name === "quantity") {
      if (evt.target.value == null || evt.target.value < 1) {
        setErrors((e) => ({ ...e, quantity: "Please enter a valid quantity (1 or more)" }))
      } else {
        setErrors((e) => ({ ...e, quantity: null }))
      }
    }

    setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }))

  }

  const handleOnFormSubmit = (evt) => {
    evt.preventDefault()
    setErrors((e) => ({ ...e, form: null }))
    // addNutrition(form)
    addNutrition({
      name: form.name,
      calories: form.calories,
      image_url: form.imageUrl,
      category: form.category,
      quantity: form.quantity
    })
    navigate("/nutrition")
    console.log("form", form )
  }


  return (
    <div className="nutrition-form">
      <div className="nutrition-form-card">
        <h1>Add Nutrition</h1>

        {error && <span className="error main-error">{error}</span>}

        <form className="form">

          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              className="form-input"
              name="name"
              type="string"
              value={form.name}
              onChange={handleOnInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="calories">Calories</label>
            <input
              className="form-input"
              name="calories"
              type="integer"
              value={form.calories}
              onChange={handleOnInputChange}
            />
            {errors.calories && <span className="error">{errors.calories}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              className="form-input"
              name="imageUrl"
              type="string"
              value={form.imageUrl}
              onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="category">Category</label>
            <input
              className="form-input"
              name="category"
              type="string"
              value={form.category}
              onChange={handleOnInputChange}
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-input"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleOnInputChange}
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </div>

          <button className="submit-nutrition main-button" onClick={handleOnFormSubmit}>Save</button>

        </form>
      </div>
    </div>
  )
}