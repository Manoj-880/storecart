const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/:id', homeController.getHomeScreenData);

module.exports = router;