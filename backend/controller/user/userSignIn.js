const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken')

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please provide your email!' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Please provide a password!' });
        }

        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const checkPassword = await bcrypt.compareSync(password, user.password);
        
        if (checkPassword) {
            const tokenData = {
                _id : user._id,
                email : user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*8});

            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token",token,tokenOption).json({
                message : "Login Succesfully!",
                data : token,
                success : true,
                error : false
            })
        } else {
            throw new Error("Please check the entered password!")
        }

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController