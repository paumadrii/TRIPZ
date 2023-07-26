const { query, maybeOne } = require('../../configs/db');
const { insertUser, selectByEmail, selectTravel, insertTravel, selectCard, insertCard, selectCardByUser, selectTravelsByUserId } = require('./queries');
const { hash } = require('simple-stateless-auth-library');

const registerUser = async (user) => {
  try {
    await query(insertUser(user));
    return {
      ok: true
    };
  } catch (error) {
    console.info('> create user error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await maybeOne(selectByEmail({ email }));
    const correctPassword = await hash.compare(password)(user.password);

    if (!user || !correctPassword) {
      return {
        ok: false,
        error_code: 'wrong_data'
      };
    }

    return {
      ok: true,
      user
    };
  } catch (error) {
    console.info('> get user error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const getTravel = async ({ userId, travelId }) => {
  try {
    const travel = await maybeOne(selectTravel({ userId, travelId }));

    return travel;
  } catch (error) {
    console.info('> getTravel error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const saveTravel = async (params) => {
  try {
    const travel = await query(insertTravel(params));
    console.log(travel);
    return {
      ok: true,
      travel
    };
  } catch (error) {
    console.info('> getTravel error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const getCard = async ({ cardId, travelId }) => {
  try {
    const card = await maybeOne(selectCard({ cardId, travelId }));

    return card;
  } catch (error) {
    console.info('> getCard error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const saveCard = async (params) => {
  try {
    await query(insertCard(params));
    return {
      ok: true
    };
  } catch (error) {
    console.info('> saveCard error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const getCardByuser = async ({ userId }) => {
  try {
    const card = await maybeOne(selectCardByUser({ userId }));

    return card;
  } catch (error) {
    console.info('> getCardByUser error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

const getTravels = async ({ userId }) => {
  try {
    const response = await query(selectTravelsByUserId({ userId }));
    return {
      ok: true,
      rows: response.rows
    };
  } catch (error) {
    console.info('> selectTravelsByUserId error:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
  getTravel,
  saveTravel,
  getCard,
  saveCard,
  getCardByuser,
  getTravels
};
