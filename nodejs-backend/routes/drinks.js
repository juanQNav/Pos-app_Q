const { Router } = require("express");
const { Server } = require("http");
const { getAllDrinks, createNewDrink, getDrinkById } = require("../controllers/drinks");
const { create } = require("domain");
const router = Router();

router.get("/", getAllDrinks);

router.get("/:id", getDrinkById)

router.post("/", createNewDrink);

module.exports = router;