const express = require('express');
const { Op } = require("sequelize");

const { User, Story, Category, Comment, Like } = require("../db/models");
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();


// router.patch(`/:id(\\d+)`)
router.patch("/:id(\\d+)", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    const otherUser = parseInt(req.params.id, 10);

    const foundFriend = User.findByPk(otherUser, {
        include: {
            model: Follow,
            include: User
        }

    })
    console.log(foundFriend)


    // const storyId = req.params.id;
    // const userId = req.session.auth.userId;

    // let foundLike = await Like.findOne({
    //     where: {
    //         [Op.and]: [{ storyId }, { userId }]
    //     }
    // });
    // if (foundLike) {
    //     const dislike = await Like.findByPk(foundLike.id);
    //     await dislike.destroy();
    // } else {
    //     await Like.create({ storyId, userId });
    // }

    // let storyLikes = await Like.count({ where: { storyId } });
    // res.json({ likes: storyLikes });
}))

module.exports = router
