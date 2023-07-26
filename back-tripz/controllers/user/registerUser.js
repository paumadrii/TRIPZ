const { registerUser } = require('../../models/user/user');
const { hash } = require('simple-stateless-auth-library');
const { createToken } = require('../../utils/authHelper');

module.exports = () => async (req, res) => {
  const params = req.body;
  const password = await hash.encrypt(params.password);

  await registerUser({ ...params, password });
  const token = createToken({ email: params.email });
  res.status(200).json({
    success: true,
    token
  });
};
