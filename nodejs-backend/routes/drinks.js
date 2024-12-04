const { Router } = require("express");
const { getAllDrinks, createNewDrink, getDrinkById, deleteDrinkById, updateDrinkById } = require("../controllers/drinks");
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();
const upload = require('../config/multer');

router.get("/", [validateJWT], getAllDrinks);

router.get("/:id", [validateJWT, verifyAdminRole], getDrinkById)

router.post("/", [validateJWT, verifyAdminRole, upload.single('image')], createNewDrink);

router.delete("/:id", [validateJWT], deleteDrinkById);

router.put("/:id", [validateJWT], upload.single('image'), updateDrinkById);

module.exports = router;