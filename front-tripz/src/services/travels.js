import client from './services';

const PATH = '/travels';

export const findTravels = async (payload) => {
  try {
    const { data } = await client.post(`${PATH}/findtravels`, payload);
    return data.travels;
  } catch (error) {
    console.info('> error [findTravels]: ', error.message);
    return {
      success: false
    };
  }
};
