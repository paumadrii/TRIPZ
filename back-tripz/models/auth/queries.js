const { sql } = require('slonik');

const insertUsers = (username, email, password) => sql.unsafe`
    INSERT INTO users (
        username, email, password
    )VALUES (
       ${username} , ${email}, ${password}
    )
`;

const selectByEmail = (email) => sql.unsafe`
        SELECT username, email, password
        FROM users
        WHERE email LIKE ${email}
`;

module.exports = {
  insertUsers,
  selectByEmail
};
