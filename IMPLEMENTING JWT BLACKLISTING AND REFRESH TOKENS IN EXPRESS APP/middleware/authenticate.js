const jwt = require('jsonwebtoken');
const { blacklistModel } = require("../model/blacklist.model")
const { userModel } = require("../model/user.model")
require("dotenv").config()

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        // Checking for blacklisted token
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).send('Token is blacklisted');
        }

        const decodedToken = jwt.verify(token,  process.env.JWT_SECRET);
        const { userID } = decodedToken;

        // Check if the user exists
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticate };