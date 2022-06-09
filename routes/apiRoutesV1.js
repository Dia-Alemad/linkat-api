const express = require("express");
const router = express.Router();

router.use("/users", require("../lib/users/routes"));

module.exports = router;
