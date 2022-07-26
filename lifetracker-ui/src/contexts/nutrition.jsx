import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"

const NutritionContext = React.createContext()

export function NutritionContextProvider({ children }) {

    const [nutritions, setNutritions] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const [receivedNewNutrition, setReceivedNewNutrition] = React.useState(false)

    const { user } = useAuthContext()

    React.useEffect(() => {
        const fetchNutrition = async () => {
            const { data, error } = await ApiClient.fetchNutritionForUser()
            console.log("nutritions data in nutrition context:", data)
            if (data?.nutritions) {
                setNutritions([...data.nutritions])
                console.log("nutrition from context", nutritions)
                setError(null)
            }
            if (error) setError(error)
        }

        // if there is a user logged in
        if (user?.email) {
            setIsLoading(true)
            setError(null)
            fetchNutrition()
        }
        setIsLoading(false)
        setInitialized(true)
    }, [receivedNewNutrition])

    // nutritionForm will include name, calories, imageUrl, category, quantity
    const addNutrition = async (nutritionForm) => {
        const { data, error } = await ApiClient.createNutrition(nutritionForm)
        console.log("addNutrition called in nutrition context, received data is:", data)
        if (error) setError(error)
        if (data) setReceivedNewNutrition(true)
    }

    return (
        <NutritionContext.Provider value={{
            nutritions, setNutritions,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            receivedNewNutrition, setReceivedNewNutrition,
            addNutrition
        }} >
            {children}
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () => {
    return React.useContext(NutritionContext)
}
