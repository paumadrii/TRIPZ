const { getAirport } = require("../../models/airports/airports");

module.exports = () => async (req, res, next) => {
  const { name } = req.params;
  console.log(name);

  const response = await getAirport(name);

  console.log(response);

  res.status(200).json({
    success: true,
    airports: response.content,
  });
};
