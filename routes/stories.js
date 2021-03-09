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
    });
})

const storyValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
        .isLength({ max: 100 })
        .withMessage('Title must not be more than 100 characters long'),
    check("text")
        .exists({ checkFalsy: true })
        .withMessage("Please provide story text.")
]

router.post('/create', csrfProtection, storyValidators, asyncHandler(async (req, res) => {
    // User is logged in
    if (req.session.auth) {
        const {
            title,
            categoryId,
            text } = req.body;

        const userId = req.session.auth.userId;
        const story = Story.build({
            title,
            categoryId,
            text,
            userId
        });
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await story.save();
            res.redirect('/stories');
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
            });
        }
    }
    // User is not logged in
    res.redirect("/login");
}));

router.get("/edit/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const categories = await Category.findAll({
        order: [['name', 'ASC']]
    });

    const storyId = parseInt(req.params.id, 10);
    
    const story = await Story.findByPk(storyId);
    // console.log(story);

    res.render('edit-story', {
        title: 'Edit story',
        story,
        categories,
        csrfToken: req.csrfToken()
    });
}));

router.post("/edit/:id(\\d+)", csrfProtection, storyValidators, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    
    const story = await Story.findByPk(storyId);
    if (req.session.auth) {
        const userId = req.session.auth.userId;
        const {
            title,
            categoryId,
            text } = req.body;

        const storyToUpdate = { 
            title, 
            categoryId, 
            text, 
            userId 
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await story.update(storyToUpdate);
            res.redirect(`/stories/${storyId}`);
        } else {
            const categories = await Category.findAll({
                order: [['name', 'ASC']]
            });
            const errors = validatorErrors.array().map((err) => err.msg);
            res.render('edit-story', {
                title: 'Edit story',
                errors,
                story: {...storyToUpdate, id: storyId},
                categories,
                csrfToken: req.csrfToken()
            });
        }
    }
    // If not logged in redirect to login page.
    else res.redirect("/login");
}));

router.delete("/delete/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);
    await story.destroy();
    res.redirect('/stories');
}));









module.exports = router;