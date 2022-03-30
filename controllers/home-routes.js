const router = require("express").Router();
const { Post, User } = require("../models");
router.get("/", async (req, res) => {
  //   res.render("homepage");
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      //   logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login-page", (req, res) => {
  res.render("login");
});

router.get("/signup-page", (req, res) => {
  res.render("signup");
});

module.exports = router;