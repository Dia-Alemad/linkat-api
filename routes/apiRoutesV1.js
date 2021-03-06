const express = require("express");
const router = express.Router();

router.use("/users", require("../lib/users/routes"));
router.use("/links", require("../lib/links/routes"));

module.exports = router;
