import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./LoginPage.css"
import ApiClient from "../../services/apiClient"

export default function LoginPage({ setAppState }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setErrors((e) => ({ ...e, form: null }))


    const { data, err } = await ApiClient.loginUser({ email: form.email, password: form.password })
    if (error) setErrors((e) => ({ ...e, form: error }))
    if (data?.user) {
      ApiClient.setToken(data.token)
      navigate("/activity")
    }

    /*
      try {
        const res = await axios.post(`http://localhost:3001/auth/login`, form) // post the form and see if contents are valid
        if (res?.data) {
          setAppState(res.data)
          setIsLoading(false)
          navigate("/activity")
          console.log(JSON.stringify(res.data))
        } else {
          setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
          setIsLoading(false)
          console.log(JSON.stringify(res.data))
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
        setIsLoading(false)
      }
      */
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@gmail.com"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleOnInputChange}
          />
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>

        <button className="btn" onClick={handleOnSubmit}>
        </button>
      </div>

      <div className="footer">
        <p>
          Don't have an account? Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  )
}


