const { importAirport } = require("../../models/airports/airports");

module.exports = () => async (req, res, next) => {
  const jsonAirports = require("./airports.json");

  for (let i = 0; i < jsonAirports.length; i++) {
    const airport = jsonAirports[i];
    let fullName = `${airport.name ? airport.name + "," : ""} ${
      airport.city ? airport.city + "," : ""
    } ${airport.state ? airport.state + "," : ""} ${
      airport.country ? airport.country + "," : ""
    }`.toLowerCase();
    fullName = fullName.replace(/-/g, " ").replace(/\//g, " ");
    airport.fullname = fullName;
    const { ok } = await importAirport(airport);
    console.log(
      i + 1,
      "/",
      jsonAirports.length,
      " -> ",
      airport.code,
      " -> ",
      ok
    );
  }
  res.status(200).json({
    success: true,
  });
};
