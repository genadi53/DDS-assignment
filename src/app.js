require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("../models/User");

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
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      var user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user == null) {
        return done(null, false, { message: "Incorrect email." });
      }
      const isPassValid = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!isPassValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, {
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});
passport.deserializeUser(function (user, done) {
  done(null, {
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

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
