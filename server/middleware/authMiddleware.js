const User = require("../models/user");
const jwt = require("jsonwebtoken");

const tokenverify = async (req, res, next) => {
    try {
        // Get the token from the request headers
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, token missing or invalid" });
        }

        // Remove "Bearer " prefix to extract the actual token
        token = token.split(" ")[1];

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user and attach to request object (excluding password)
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found, invalid token" });
        }

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next(); // Proceed if user is admin
};



module.exports = {tokenverify,adminOnly};
