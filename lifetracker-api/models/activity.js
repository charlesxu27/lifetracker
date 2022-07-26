const db = require("../db")

class Activity {

    static async calculateDailyCaloriesSummaryStats(userId) {
        const result = await db.query(`
            SELECT SUM(calories * quantity) as "totalCaloriesPerDay", DATE(created_at) AS "date"
            FROM nutrition
            WHERE user_id = $1
            GROUP BY date
            ORDER BY date DESC
        `, [userId])

        return result.rows
    }

    static async calculatePerCategoryCaloriesSummaryStats(userId) {
        const result = await db.query(`
        SELECT category, ROUND(AVG(calories*quantity), 1) as "avgCaloriesPerCategory"
        FROM nutrition
        WHERE user_id = $1
        GROUP BY category
        LIMIT 6
        `, [userId])
        
        return result.rows
    }

}

module.exports = Activity