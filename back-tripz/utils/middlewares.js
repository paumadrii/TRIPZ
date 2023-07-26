const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

module.exports = {
  auth
};
