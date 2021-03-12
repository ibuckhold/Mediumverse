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
        isFollowing = true
    }
    console.log(foundFriend)
    res.json({ isFollowing })
}))

module.exports = router
