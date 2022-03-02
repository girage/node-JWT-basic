const jwt = require('jsonwebtoken');
const CustomAPIError = require('../error/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 400);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
}

module.exports = authenticationMiddleware;