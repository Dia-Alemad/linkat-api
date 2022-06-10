const express = require("express");
const router = express.Router();
const userController = require("../controller")
const middleware = require('../../middleware')


router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put("/updatepassword", middleware.isAuthenticated, userController.updatePassword);

router.put("/updateuser", middleware.isAuthenticated, userController.updateUser)
router.post("/logout", middleware.isAuthenticated, userController.logout)
router.get("/me", middleware.isAuthenticated, userController.getUserInfo);
router.get("/profile/:id", userController.getUserInfo);
router.put("/updateprofile",middleware.isAuthenticated , userController.updateProfile);
router.delete("/deleteuser", middleware.isAuthenticated, userController.deleteUser);





module.exports = router;
