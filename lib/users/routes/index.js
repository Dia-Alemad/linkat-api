const express = require("express");
const router = express.Router();
const userController = require("../controller")
const middleware = require('../../../middleware')


router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put("/updatepassword", middleware.isAuthenticated, userController.updatePassword);
router.post("/logout", middleware.isAuthenticated, userController.logout)





module.exports = router;
