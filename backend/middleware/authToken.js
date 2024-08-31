const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try {
        const token = req.cookies?.token
        console.log("token",token)

        if(!token){
            return res.json({
                message : "User not logged in!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(error,decoded) {

            if(error){
                console.log("Error auth",error)
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            console.log("decoded",decoded)

            req.user = req.user || {};

            req.user.id = decoded?._id
            console.log("id",req.user.id)

            next()

        });

    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken