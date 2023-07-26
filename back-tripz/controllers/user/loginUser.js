const { loginUser } = require('../../models/user/user');
const { createToken } = require('../../utils/authHelper');
const errors = require('../../misc/errors');

module.exports = () => async (req, res, next) => {
  const { email, password } = req.body;

  const { ok, error_code, user } = await loginUser({ email, password });

  if (!ok) return next(errors[error_code || 500]);
  const token = createToken({ email: user.email, id: user.id });
  res.status(200).json({
    success: true,
    token
  });
};
