import axios from "axios"
import { API_BASE_URL } from "../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token
    }

    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            "Content-Type": "application/json"
        }

        // attach the token to the request
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        // process the request
        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch {
            console.error({ errorResponse: error.response })
            // optional chaining example
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error) }
        }
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: 'auth/login', method: 'POST', data: credentials})
    }

    async registerUser(credentials) {
        return await this.request({ endpoint: 'auth/register', method: 'POST', data: credentials})
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: 'auth/me', method: 'GET' })
    }



}


module.export = new ApiClient(API_BASE_URL)


