const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

module.exports.isverified = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ success: false, message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token error:", error);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
