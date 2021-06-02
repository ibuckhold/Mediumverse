const express = require('express');
const { Op } = require("sequelize");

const { Follow } = require("../db/models");
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();


router.patch("/:id(\\d+)", asyncHandler(async (req, res) => {
    const followerId = req.session.auth.userId;
    const userId = parseInt(req.params.id, 10);
    let isFollowing = false;

    const foundFriend = await Follow.findOne({
        where: {
            [Op.and]: [{ followerId }, { userId }]
        }
    })

    if(foundFriend) {
        await foundFriend.destroy();
    } else {
        await Follow.create({
            userId,
            followerId,
        });
        isFollowing = true;
    }
    res.json({ isFollowing })
}))

router.get("/:id(\\d+)", asyncHandler(async (req,res) => {
    const followerId = req.session.auth.userId;
    const userId = parseInt(req.params.id, 10);
    let isFollowing;

    const foundFriend = await Follow.findOne({
        where: {
            [Op.and]: [{ followerId }, { userId }]
        }
    })

    if(foundFriend) {
        isFollowing = true
    } else {
        isFollowing = false;
    }
    res.json({ isFollowing });
}))

module.exports = router
