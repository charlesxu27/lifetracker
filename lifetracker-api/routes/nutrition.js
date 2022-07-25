const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Nutrition = require("../models/nutrition")

// only allow user to get nutrition if authenticated
router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user 
        // extract userId from token payload
        const nutritionList = await Nutrition.listNutritionForUser(userId)
        return res.status(200).json({ nutritions: nutritionList })
    } catch (err) {
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user 
        // TODO: where is this done? A middleware in app?
        const nutritionForm = req?.body
        const nutrition = await Nutrition.createNutrition({ nutritionForm, userId })
        return res.status(201).json({ nutrition: nutrition })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.get("/:nutritionId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const nutritionId = req.params.nutritionId
        const nutritionObject = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({ nutrition: nutritionObject })
    } catch (err) {
        next(err)
    }
})


module.exports = router

