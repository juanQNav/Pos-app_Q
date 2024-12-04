const { Router } = require('express');
const { createSale } = require('../controllers/sales');
const { validateJWT } = require('../middlewares/verifyJWT');

const router = Router();

router.post("/", [validateJWT], createSale);

module.exports = router;
