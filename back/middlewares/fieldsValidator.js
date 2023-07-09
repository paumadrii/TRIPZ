const errors = require("../misc/errors");
let upperCaseLetters = /[a-z]/g;

module.exports =
  (...fields) =>
  (req, _, next) => {
    for (let field of fields) {
      if (!req.body[field]) return next(errors[400]);
    }

    const { password } = req.body;

    if (password && password.length < 6) return next(errors["pass_length"]);
    if (password && !password.includes(upperCaseLetters))
      return next(errors["upperCase"]);

    next();
  };
