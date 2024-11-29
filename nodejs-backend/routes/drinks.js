const { Router } = require("express");
const { Server } = require("http");
const { getAllDrinks, createNewDrink, getDrinkById, deleteDrinkById, updateDrinkById } = require("../controllers/drinks");
const { create } = require("domain");
const router = Router();

router.get("/", getAllDrinks);

router.get("/:id", getDrinkById)

router.post("/", createNewDrink);

router.delete("/:id", deleteDrinkById);

router.put("/:id", updateDrinkById);

module.exports = router;