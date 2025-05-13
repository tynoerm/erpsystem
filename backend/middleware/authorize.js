import jwt from "jsonwebtoken";

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    (req, res, next) => {
      let token = req.headers.authorization;
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      if (!token) return res.status(401).json({ message: "Token not found" });

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
      });
    },
    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role))
        return res.status(401).json({ message: "Unauthorized" });
      next();
    },
  ];
}

export default authorize;
