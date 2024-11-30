const { Router } = require("express");
const { Server } = require("http");
const { getAllDrinks, createNewDrink, getDrinkById, deleteDrinkById, updateDrinkById } = require("../controllers/drinks");
const { create } = require("domain");
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();

router.get("/", [validateJWT], getAllDrinks);

router.get("/:id", [validateJWT, verifyAdminRole], getDrinkById)

router.post("/", [validateJWT], createNewDrink);

router.delete("/:id", [validateJWT], deleteDrinkById);

router.put("/:id", [validateJWT], updateDrinkById);

module.exports = router;