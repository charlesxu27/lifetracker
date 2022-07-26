import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.css"
import { useAuthContext } from '../../contexts/auth'

export default function LoginPage({ setAppState }) {

  const { user, setUser, error, setError, loginUser, authorized, setAuthorized } = useAuthContext()

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

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setErrors((e) => ({ ...e, form: null }))

    await loginUser(form)
    console.log(1000, user?.email)
    if (user?.email) {
      navigate("/activity")
    }
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="btn" onClick={handleOnSubmit}>
          Login
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


