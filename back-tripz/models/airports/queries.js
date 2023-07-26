const { sql } = require("slonik");

const insertAirport = (airport) => sql.unsafe`
    INSERT INTO airports (
        code, name ,city, state , country, tz , type, fullname
    )VALUES (
       ${airport.code} , ${airport.name},  ${airport.city},  ${airport.state},  ${airport.country},  ${airport.tz},  ${airport.type}, ${airport.fullname}
    )
`;

const selectAirport = (name) => sql.unsafe`
  SELECT code, name, city, state, country
  FROM airports
  WHERE fullname LIKE '%' || ${name.toLowerCase()} || '%'

`;

module.exports = {
  insertAirport,
  selectAirport,
};
