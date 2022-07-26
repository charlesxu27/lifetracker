import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"
// import { NutritionContextProvider, useNutritionContext } from "./nutrition"

const ActivityContext = React.createContext()

export function ActivityContextProvider( {children} ) {

    const [activity, setActivity] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const { user, setUser, isAuthed } = useAuthContext()
    // const { nutritions, setNutritions } = useNutritionContext()

    React.useEffect(() => {
        const fetchSummaryStatistics = async () => {
            const { data, error } = await ApiClient.calculateSummaryStats()
            if (data) {
              setActivity(data)
              setError(null)
            }
            if (error) setError(error)
        }

        // if there is a user logged in
        if (user?.email) {
            setIsLoading(true)
            setError(null)
            fetchSummaryStatistics()
        }
        setIsLoading(false)
        setInitialized(true)
        }, [user])

    return (
    <ActivityContext.Provider value={ { activity, setActivity,
                                        initialized, setInitialized,
                                        isLoading, setIsLoading,
                                        error, setError
                                   } } >
        {children}
    </ActivityContext.Provider>
    )
}

export const useActivityContext = () => {
    return React.useContext(ActivityContext)
}
