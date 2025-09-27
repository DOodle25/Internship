const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = decoded;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access denied" });
  next();
};
