const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Nutrition {
    static async createNutrition(nutritionForm, userId) {
        
        const requiredFields = ["name", "category", "calories", "image_url"]

        requiredFields.forEach((field) => {
            // throw error if missing input in form
            if (!nutritionForm.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const quantity = nutritionForm.quantity || 1

        // create a new nutrition instance in the database with their info
        const result = await db.query(`
            INSERT INTO nutrition (
                name,
                category,
                quantity,
                calories,
                image_url,
                user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, category, quantity, calories, image_url, user_id, created_at;
        `, [nutritionForm.name, nutritionForm.category, quantity, nutritionForm.calories, nutritionForm.image_url, userId])

        const nutrition = result.rows[0]
        return nutrition
    }


    static async fetchNutritionById(id) {
        if (!id) {
            throw new BadRequestError("No nutrition ID provided")
        }

        const query = `SELECT * FROM nutrition WHERE id = $1 LIMIT 1`
        const result = await db.query(query, [id])

        if (result) {
            const nutrition = result.rows[0]
            return nutrition
        } else {
            throw new NotFoundError("No nutrition with this ID found")
        }
    }

    static async listNutritionForUser(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user ID provided")
        }

        // get all the rows in nutrition where it's user_id matches the user_id parameter
        const query = `SELECT * FROM nutrition
                    WHERE user_id = $1
                    ORDER BY created_at DESC
                    `
        const result = await db.query(query, [user_id])

        // gives an array
        return result.rows
    }
}

module.exports = Nutrition