import client from './services';

const PATH = '/user';

export const registerUser = async (payload) => {
  try {
    const { data } = await client.post(`${PATH}/registerUser`, payload);
    return data.ok;
  } catch (error) {
    console.info('> error [registerUser]: ', error.message);
    return {
      success: false
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { data } = await client.post(`${PATH}/loginUser`, payload);
    return data;
  } catch (error) {
    console.info('> error [loginUser]: ', error.message);
    return {
      success: false
    };
  }
};

export const saveCard = async (payload) => {
  try {
    const { data } = await client.post(`${PATH}/saveCard`, payload);
    return data;
  } catch (error) {
    console.info('> error [saveCard]: ', error.message);
    return {
      success: false
    };
  }
};

export const getTravels = async () => {
  try {
    const { data } = await client.get(`${PATH}/getTravels`);
    return data;
  } catch (error) {
    console.info('> error [saveCard]: ', error.message);
    return {
      success: false
    };
  }
};
