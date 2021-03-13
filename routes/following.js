const express = require('express');
const { Op } = require("sequelize");

const { User, Story, Category, Comment, Like, Follow } = require("../db/models");
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();


// router.patch(`/:id(\\d+)`)
router.patch("/:id(\\d+)", asyncHandler(async (req, res) => {
    const followerId = req.session.auth.userId;
    const userId = parseInt(req.params.id, 10);
    let isFollowing = false;
    // let isFollowing;

    const foundFriend = await Follow.findOne({
        where: {
            [Op.and]: [{ followerId }, { userId }]
        }
    })

    if(foundFriend) {
        await foundFriend.destroy();
        // isFollowing = false;
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
    // let isFollowing = false;
    let isFollowing;

    const foundFriend = await Follow.findOne({
        where: {
            [Op.and]: [{ followerId }, { userId }]
        }
    })

    if(foundFriend) {
        isFollowing = true
        // isFollowing = false;
    } else {
        isFollowing = false;
    }
    res.json({ isFollowing });
}))

module.exports = router
