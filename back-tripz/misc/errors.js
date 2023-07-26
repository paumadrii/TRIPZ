module.exports = {
  400: {
    statusCode: 400,
    error: new Error("All fields are mandatory"),
  },
  wrong_data: {
    statusCode: 400,
    error: new Error("Username or password incorrects"),
  },
  pass_length: {
    statusCode: 400,
    error: new Error("Password length must be at least 4"),
  },
  401: {
    statusCode: 401,
    error: new Error("Unauthorized"),
  },
  404: {
    statusCode: 404,
    error: new Error("Path not found"),
  },
  500: {
    statusCode: 500,
    error: new Error("Something went wrong!"),
  },
};
