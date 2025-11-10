import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../keys/keys.js";

// Middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Bearer Token -> Json Web Token 
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" }); // Hacer una salida controlada por error de autorización

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" }); // hacer una salida controlada porque el token no es válido

    // continuar al flujo con normalidad
    req.user = user;
    next();
  });
};