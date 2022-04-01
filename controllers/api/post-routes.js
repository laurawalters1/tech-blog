const router = require("express").Router();
const { Post } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({ where: { id: req.params.id } });
    const post = postData.get({ plain: true });
    res.render("post", post);
  } catch (error) {}
});

router.post("/create", async (req, res) => {
  console.log("create route hit");
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
