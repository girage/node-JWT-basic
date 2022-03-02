
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../error/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 400);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decode.username}`,
      secert: `Here is your auth. data, lucky number is ${luckyNumber}`,
    });

  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }

}

module.exports = {
  login,
  dashboard
}