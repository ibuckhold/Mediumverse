var express = require('express');
const { csrfProtection, asyncHandler } = require('../utils');
const { User, Story, Category } = require("../db/models");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("TEST---------")
  res.render('index');
});

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);

  const userStories = await Story.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]]
  });
  res.render("user-stories", {
    otherUser: userId,
    title: `${user.username}'s Stories`,
    userStories
  });
}));

module.exports = router;
