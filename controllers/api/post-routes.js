const router = require("express").Router();
const { Post } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({ where: { id: req.params.id } });
    const post = postData.get({ plain: true });
    res.render("post", post);
  } catch (error) {}
});

module.exports = router;
