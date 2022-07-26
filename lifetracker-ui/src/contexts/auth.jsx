import React, { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../services/apiClient"

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState()
    const [authorized, setAuthorized] = useState(false)

    const loginUser = async (credentials) => {
        const { data, error } = await ApiClient.loginUser(credentials)
        console.log(data, error)
        if (error) { setError(error) }
        if (data?.user) {
            // if logged in successfully
            setUser(data.user)
            ApiClient.setToken(data.token)
            setAuthorized(true)
        }
    }

    const registerUser = async (credentials) => {
        const { data, error } = await ApiClient.registerUser(credentials)
        console.log(data, error)
        if (error) { setError(error) }
        if (data?.user) {
            setUser(data.user)
            ApiClient.setToken(data.token)
            setAuthorized(true)
        }
    }

    const fetchUserFromToken = async () => {
        const { data, error } = await ApiClient.fetchUserFromToken()
        if (error) { setError(error) }
        return data?.user
    }

    const logoutUser = async () => {
        setAuthorized(false)
        setUser({})
        setError(null)
        setAuthorized(false)
        await ApiClient.logoutUser()
    }

    const authVars = {
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        registerUser,
        logoutUser,
        authorized,
        setAuthorized
    }

    return (
        <AuthContext.Provider value={authVars} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}