const adminProtect = (req, res, next) => {
    console.log("AUTH HEADER RECEIVED:", req.headers.authorization);
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin only."
        });
    }
    next();
};

module.exports = adminProtect;