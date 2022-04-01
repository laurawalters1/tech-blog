const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("create comment route hit");
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
