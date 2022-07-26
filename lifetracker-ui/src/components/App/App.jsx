import * as React from "react"
import { useState } from "react"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import NotFound from "../NotFound/NotFound"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { AuthContextProvider } from "../../contexts/auth"

export default function AppContainer() {
  // ensure all components have access to context values
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}


export function App() {
  const [appState, setAppState] = useState({}) // keeps track of user login status

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar appState={appState} setAppState={setAppState} />
          <main>
            <Routes>
              <Route path="/" element={
                (
                  <>
                    <LandingPage />
                  </>
                )
              }
              />
              <Route path="/login" element={
                (
                  <>
                    <LoginPage setAppState={setAppState} />
                  </>
                )
              }
              />
              <Route path="/register" element={
                (
                  <>
                    <RegistrationPage setAppState={setAppState} />
                  </>
                )
              }
              />
              <Route path="/activity" element={
                (
                  <ProtectedRoute element={<ActivityPage />} />
                )
              }
              />
              <Route path="/nutrition/*" element={
                (
                  <ProtectedRoute element={<NutritionPage />} />
                )
              }
              />
              <Route path="*" element={
                (
                  <>
                    <NotFound />
                  </>
                )
              }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
