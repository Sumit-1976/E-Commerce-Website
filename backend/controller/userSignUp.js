const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please provide your email!' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Please provide a password!' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Please provide your name!' });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'User Already Exists!' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = {
            email,
            password: hashedPassword,
            name,
            role: 'GENERAL',
        };

        const newUser = new userModel(payload);
        const saveUser = await newUser.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'User Created Successfully!',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'An error occurred during sign up',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController