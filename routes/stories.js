const express = require('express');
const { User, Story, Category } = require("../db/models");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler } = require('../utils');

router.get('/create', csrfProtection, async (req, res) => {
    const categories = await Category.findAll({
        order: [['name', 'ASC']]
    });
    const story = Story.build();
    res.render('create-story', {
        title: 'Create new story',
        story,
        categories,
        csrfToken: req.csrfToken()
    })
})

const storyValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
]

router.post('/create', csrfProtection, storyValidators, asyncHandler(async (req, res) => {
    const { title, categoryId, text } = req.body;
    const userId = req.session.auth.userId;
    if (userId) {
        const story = Story.build({
            title,
            categoryId,
            text,
            userId
        })
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await story.save();
            res.redirect('/stories')
        } else {
            const categories = await Category.findAll({
                order: [['name', 'ASC']]
            });
            const errors = validatorErrors.array().map((err) => err.msg);
            res.render('create-story', {
                title: 'Create new story',
                errors,
                story,
                categories,
                csrfToken: req.csrfToken()
            })
        }
    }
}))











module.exports = router;