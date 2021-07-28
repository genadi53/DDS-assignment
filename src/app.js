require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./utils/passport-config");

const userRoutes = require("./routes/user-routes");
const partsRoutes = require("./routes/parts-routes");
const transactionRoutes = require("./routes/transaction-routes");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// const seed = require("../src/seeds/seeds");
// seed();

app.use("/api/", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/parts", partsRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port: ${port}`);
});
