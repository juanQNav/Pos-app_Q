const { Router } = require("express");
const { getAllUsers, createUser } = require("../controllers/users");
const router = Router();

router.get("/", getAllUsers);

router.post("/", createUser);

module.exports = router;