const express = require('express');
const multer = require('multer');

const { User, Story, Category, Comment } = require("../db/models");
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only images files valid'))
        }
    }
}).single('imageupload')

router.get('/create', csrfProtection, async (req, res) => {
    const categories = await Category.findAll({
        order: [['name', 'ASC']]
    });
    const story = Story.build();
    return res.render('create-story', {
        title: 'Create New Story',
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

router.post('/create', upload, csrfProtection, storyValidators, asyncHandler(async (req, res) => {
    // User is logged in
    if (req.session.auth) {
        const {
            title,
            categoryId,
            text,
        } = req.body;

        const userId = req.session.auth.userId;
        let story;
        
        if (req.file) {
            const imageURL = '/images/' + req.file.filename;
            story = Story.build({
                title,
                categoryId,
                text,
                userId,
                imageURL
            });
        } else {
            story = Story.build({
                title,
                categoryId,
                text,
                userId
            });
        }
        
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await story.save();
            return res.redirect(`/stories/${story.id}`);
        } else {
            const categories = await Category.findAll({
                order: [['name', 'ASC']]
            });
            const errors = validatorErrors.array().map((err) => err.msg);
            return res.render('create-story', {
                title: 'Create New Story',
                errors,
                story,
                categories,
                csrfToken: req.csrfToken()
            });
        }
    }
    // User is not logged in
    return res.redirect("/login");
}));

router.get("/edit/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const categories = await Category.findAll({
        order: [['name', 'ASC']]
    });

    const storyId = parseInt(req.params.id, 10);

    const story = await Story.findByPk(storyId);

    console.log(story.Category.name);

    return res.render('edit-story', {
        title: 'Edit Story',
        story,
        categories,
        csrfToken: req.csrfToken()
    });
}));

router.post("/edit/:id(\\d+)", upload, csrfProtection, storyValidators, asyncHandler(async (req, res) => {
    // If a user is logged in
    if (req.session.auth) {
        const storyId = parseInt(req.params.id, 10);
        const story = await Story.findByPk(storyId);

        const userId = req.session.auth.userId;
        // If logged in user is not the user who created story
        // Ask Chris
        // if (userId !== story.userId) {
        //     return res.redirect("/");
        // }
        const {
            title,
            categoryId,
            text 
        } = req.body;

        let storyToUpdate;
        if (req.file) {
            const imageURL = '/images/' + req.file.filename;
            storyToUpdate = {
                title,
                categoryId,
                text,
                userId,
                imageURL
            };
        } else {
            storyToUpdate = {
                title,
                categoryId,
                text,
                userId
            };
        }


        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await story.update(storyToUpdate);
            return res.redirect(`/stories/${storyId}`);
        } else {
            const categories = await Category.findAll({
                order: [['name', 'ASC']]
            });
            const errors = validatorErrors.array().map((err) => err.msg);
            return res.render('edit-story', {
                title: 'Edit Story',
                errors,
                story: { ...storyToUpdate, id: storyId },
                categories,
                csrfToken: req.csrfToken()
            });
        }
    }
    // If not logged in redirect to login page.
    else return res.redirect("/login");
}));

router.post("/delete/:id(\\d+)", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);
    await story.destroy();
    return res.redirect(`/${req.session.auth.userId}`);
}));

router.get("/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findOne({
        include: {
            model: Category
        },
        where: {
            id: storyId
        }
    });

    const storyComments = await Comment.findAll({ 
        include: [{
            model: User
        }],
        where: { storyId } 
    });

    return res.render("display-story", {
        story,
        storyComments,
        csrfToken: req.csrfToken()
    });
}));

module.exports = router;