const router = require("express").Router();
// const apiRoutes = require("./api");

router.get("/", (req, res) => {
  res.render("homepage");
});
// router.use("/api", apiRoutes);

module.exports = router;
