const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, passowrd } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save;

    res.status(201).json(savedUser);
})

module.exports = usersRouter;