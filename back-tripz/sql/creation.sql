-- DROP TABLE IF EXISTS airports;
-- DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS airports (
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL,
    tz TEXT NOT NULL,
    type TEXT NOT NULL,
    fullname TEXT
)

CREATE TABLE IF NOT EXISTS travels (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    code_airport_out TEXT NOT NULL,
    code_airport_in TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    travel_id TEXT NOT NULL,
    airline TEXT,
    hourDep TEXT,
    cityDep TEXT,
    flightNumber TEXT,
    duration TEXT,
    hourArr TEXT,
    cityArr TEXT,
    price TEXT,
    url TEXT
)

/*
SELECT *,
(select name as name_airport_out FROM airports WHERE airports.code = travels.code_airport_out),
(select city as city_airport_out FROM airports WHERE airports.code = travels.code_airport_out),
(select name as name_airport_in FROM airports WHERE airports.code = travels.code_airport_in),
(select city as city_airport_in FROM airports WHERE airports.code = travels.code_airport_in)
FROM travels
JOIN cards ON travels.id = cards.travel_id
WHERE travels.user_id LIKE '21fbd35b-8f9c-45f2-85df-538f314ca3f4'
*/