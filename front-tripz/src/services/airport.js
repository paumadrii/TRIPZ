import client from "./services";

const PATH = "/airports";

export const getAirports = async (name) => {
  try {
    const { data } = await client.get(`${PATH}/getAirports/${name}`);
    return data.airports;
  } catch (error) {
    console.info("> error [getAirport]: ", error.message);
    return {
      success: false,
    };
  }
};
