import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Token not provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Set this in your .env
    req.user = decoded; // Store user info in request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

