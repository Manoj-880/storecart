const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeControllers");

router.get("/", storeController.getAllStores);
router.get("/:id", storeController.getStoresById);
router.post("/add", storeController.addStore);

module.exports = router;