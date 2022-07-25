const PRODUCTION_API_BASE_URL = "http://charles.com"
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001"
const API_BASE_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL

export default API_BASE_URL
// module.exports = {
//     API_BASE_URL,
//     PRODUCTION_API_BASE_URL,
//     DEVELOPMENT_API_BASE_URL
// }