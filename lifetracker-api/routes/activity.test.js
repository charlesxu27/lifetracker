const express = require("express")
const Activity = require("../models/Activity")
const router = express.Router()
const security = require("../middleware/security")

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        console.log("userId from activity route", userId)
        const caloriesPerDay = await Activity.calculateDailyCaloriesSummaryStats(userId)
        const caloriesPerCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(userId)
        
        const calories = { "perDay": caloriesPerDay,
                           "perCategory": caloriesPerCategory
                         }

        const nutritionStats = {"nutrition": {calories} }

        return res.status(200).json(nutritionStats)

    } catch (err) {
        next(err)
    }
  })

module.exports = router