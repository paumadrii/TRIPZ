require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { db } = require("./configs/db");
const corsOptions = require("./configs/cors");
const errors = require("./misc/errors");

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const routes = require("./routes");
app.use(routes(db));

app.use((_, __, next) => {
  next(errors[404]);
});

app.use(({ statusCode, error }, _, res, __) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});
app.listen(process.env.PORT, () =>
  console.info(`> listening at: ${process.env.PORT}`)
);
