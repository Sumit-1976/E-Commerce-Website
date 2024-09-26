const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email) {
            return res.status(400).json({ error: 'Please provide your email!' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Please provide a password!' });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Compare password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            // Token payload and creation
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            // Cookie options with conditional security for production
            const tokenOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only secure in production
                sameSite: 'None', // Allows cross-origin cookies
            };

            // Send cookie and response
            res.cookie('token', token, tokenOption).json({
                message: 'Login successfully!',
                data: token,
                success: true,
                error: false,
            });
        } else {
            throw new Error('Incorrect password, please try again!');
        }

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
