const { sql } = require('slonik');

const insertUser = ({ username, email, password }) => sql.unsafe`
    INSERT INTO users (
        username, email, password
    )VALUES (
       ${username} , ${email}, ${password}
    )
`;

const selectByEmail = ({ email }) => sql.unsafe`
        SELECT username, email, password, id
        FROM users
        WHERE email LIKE ${email}
`;

const selectTravel = ({ userId, travelId }) => sql.unsafe`
        SELECT *
        FROM travels
        WHERE id LIKE ${travelId} AND user_id LIKE ${userId}
`;

const insertTravel = ({ userId, travelId, codeAirportOut, codeAirportIn }) => sql.unsafe`
    INSERT INTO travels (
          id, user_id, code_airport_out, code_airport_in
      )VALUES (
         ${travelId} , ${userId}, ${codeAirportOut}, ${codeAirportIn}
      )
`;

const selectCard = ({ cardId, travelId }) => sql.unsafe`
        SELECT *
        FROM cards
        WHERE id LIKE ${cardId} AND travel_id LIKE ${travelId}
`;

const insertCard = ({ cardId, travelId, airline, hourDep, cityDep, flightNumber, duration, hourArr, cityArr, price, url }) => sql.unsafe`
    INSERT INTO cards (
        id, 
        travel_id, 
        airline,
        hourDep,
        cityDep,
        flightNumber,
        duration,
        hourArr,
        cityArr,
        price,
        url
      )VALUES (
         ${cardId}, 
         ${travelId},
            ${airline},
            ${hourDep},
            ${cityDep},
            ${flightNumber},
            ${duration},
            ${hourArr},
            ${cityArr},
            ${price},
            ${url}
      )
`;

const selectCardByUser = ({ userId }) => sql.unsafe`
      SELECT * 
      FROM travels t 
      JOIN cards c 
      ON t.id = c.travel_id WHERE t.user_id LIKE ${userId}
`;

const selectTravelsByUserId = ({ userId }) => sql.unsafe`
  SELECT *,
(select name as name_airport_out FROM airports WHERE airports.code = travels.code_airport_out),
(select city as city_airport_out FROM airports WHERE airports.code = travels.code_airport_out),
(select name as name_airport_in FROM airports WHERE airports.code = travels.code_airport_in),
(select city as city_airport_in FROM airports WHERE airports.code = travels.code_airport_in)
FROM travels
JOIN cards ON travels.id = cards.travel_id
WHERE travels.user_id LIKE ${userId}
`;

module.exports = {
  insertUser,
  selectByEmail,
  selectTravel,
  insertTravel,
  selectCard,
  insertCard,
  selectCardByUser,
  selectTravelsByUserId
};
