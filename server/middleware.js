


const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET || "fallbackSecret"; // fallback for dev


module.exports.isverified = (req, res, next) => {

    const authHeader = req.headers.authorization;
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ success: false, message: "Access Denied: No token provided" });
    }
	let token = null;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.headers.token) {
		token = req.headers.token;
	}

	if (!token) {
		return res.status(401).json({ success: false, message: "Not logged in or token missing" });
	}

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.body.userid = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid token" });
    }
 
}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = { id: decoded.id }; 
		next();
	} catch (error) {
		console.error("JWT verification error:", error.message);
		return res.status(401).json({ success: false, message: "Invalid or expired token" });
	}
};
