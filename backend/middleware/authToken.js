const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not logged in!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (error, decoded) {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Token expired, please login again",
                        error: true,
                        success: false
                    });
                } else {
                    console.log("Error auth", error);
                    return res.status(401).json({
                        message: "Invalid token",
                        error: true,
                        success: false
                    });
                }
            }

            req.userId = decoded?._id;
            req.user = decoded;

            next();
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message || "An error occurred",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
