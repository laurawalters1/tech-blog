const router = require("express").Router();

const userRoutes = require("./user-routes");

router.use("/login-page", userRoutes);

module.exports = router;
