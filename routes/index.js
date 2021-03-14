var express = require('express');
const { csrfProtection, asyncHandler } = require('../utils');
const { User, Story, Follow } = require("../db/models");
const { Op } = require("sequelize");

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log("TEST---------")
  const stories = await Story.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5
  });

  console.log(stories);
  let userId
  let peopleYoureFollowing;
  let sendPeople;
  if (req.session.auth){
    userId = req.session.auth.userId;
    peopleYoureFollowing = await User.findAll({
      include: {
        model: User,
        as: "otherPeople"
      },
      where: {id: userId}
    });
    sendPeople = peopleYoureFollowing[0].dataValues.otherPeople;
  }
  res.render('index', {stories, sendPeople});
});

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);

  const userStories = await Story.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]]
  });

  const peopleYoureFollowing = await User.findAll({
      include: {
        model: User,
        as: "otherPeople"
      },
      where: {id: userId}
  })

  // console.log(peopleYoureFollowing[0].dataValues.otherPeople);
  const sendPeople = peopleYoureFollowing[0].dataValues.otherPeople;

  res.render("user-stories", {
    sendPeople,
    otherUser: userId,
    title: `${user.username}'s Stories`,
    userStories
  });
}));

module.exports = router;
