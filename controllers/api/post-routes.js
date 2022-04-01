const router = require("express").Router();
const { Post, User } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    console.log(req.session);

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    const ownPost = post.user_id === req.session.user_id;
    console.log(ownPost);

    res.render("post", { ...post, ownPost, logged_in: req.session.logged_in });
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
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log("This is the post data" + postData);
    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res
      .status(200)
      .render("dashboard", { logged_in: req.session.logged_in })
      .json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
