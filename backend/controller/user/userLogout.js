async function userLogout(req, res) {
    try {
        // Clear the cookie, ensuring the same options as when setting it
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'None', // Cross-origin cookie sharing
        });

        res.json({
            message: 'Logout Successful!',
            error: false,
            success: true,
            data: [],
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
