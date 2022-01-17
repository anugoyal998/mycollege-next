import jwt from "jsonwebtoken";

export const authenticateToken = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ data: false });
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) return res.status(err).json({ data: false });
      req.user = user;
    });
    return handler(req,res)
  };
};
