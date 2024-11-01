const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    // Check if the authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID stored in the token payload
            req.user = await User.findByPk(decoded.id);

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If token verification fails, return a 401 Unauthorized error
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found, return a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
