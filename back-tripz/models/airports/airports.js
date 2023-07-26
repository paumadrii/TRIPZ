const { query } = require("../../configs/db");
const { insertAirport, selectAirport } = require("./queries");

const importAirport = async (airport) => {
  try {
    await query(insertAirport(airport));
    return {
      ok: true,
    };
  } catch (error) {
    console.info("> create airport error:", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const getAirport = async (name) => {
  try {
    const response = await query(selectAirport(name));
    return {
      ok: true,
      content: response.rows,
    };
  } catch (error) {
    console.info("> get airports error:", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

module.exports = {
  importAirport,
  getAirport,
};
