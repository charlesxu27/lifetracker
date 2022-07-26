const express = require("express")
const Nutrition = require("../models/nutrition")
const router = express.Router()
const security = require("../middleware/security")

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        console.log("userId from nutrition route", userId)

        const nutritionList = await Nutrition.listNutritionForUser(userId)
        return res.status(200).json({ nutritions:nutritionList })
    } catch (err) {
        next(err)
    }
  })

  router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        const nutritionForm = req?.body
        const nutrition = await Nutrition.createNutrition( {nutritionForm, userId} )
        return res.status(201).json( { nutrition:nutrition } )
    } catch(err) {
        console.log(err)
        next(err)
    }
    }) 

    router.get("/:nutritionId", security.requireAuthenticatedUser, async (req, res, next) => {
        try {
            const nutritionId = req.params.nutritionId
            const nutritionObj = await Nutrition.fetchNutritionById(nutritionId)
            return res.status(200).json({ nutrition:nutritionObj }) 
        } catch (err) {
            next(err)
        }
      })


module.exports = router