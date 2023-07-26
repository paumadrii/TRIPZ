const { cookie } = require("simple-stateless-auth-library");

module.exports = () => async (req, res, next) => {
  cookie.clear(res);

  res.status(200).json({
    success: true,
  });
};
