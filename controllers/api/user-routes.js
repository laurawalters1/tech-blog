const { User } = require("../../models");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.render("login");
// });

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("no user data");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("invalid password");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    console.log("We found this user!");
    // res.status(200);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // res.json({ user: userData, message: "You are now logged in!" });
      // res.status(200);
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
    });
    console.log(newUser);
    console.log("success!");
    res.status(200).json(newUser);
  } catch (error) {
    console.log("there was an error");
    res.status(404);
  }
});
module.exports = router;
