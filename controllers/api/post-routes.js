const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    console.log(req.session);

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          as: "comments",
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);
    const ownPost = post.user_id === req.session.user_id;

    res.render("post", {
      ...post,
      ownPost,
      logged_in: req.session.logged_in,
    });
  } catch (error) {}
});

router.post("/create", withAuth, async (req, res) => {
  console.log("create route hit");
  console.log(req.body);
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

router.put("/update", withAuth, async (req, res) => {
  console.log("edit route hit");
  console.log(req.body);
  try {
    await Post.update(req.body, { where: { id: req.body.id } });
    // console.log(updatedPost);
    res
      //   .json("updated")
      .status(200)
      .render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log("This is the post data" + postData);
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
