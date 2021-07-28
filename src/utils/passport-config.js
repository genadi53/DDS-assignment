const User = require("../../models/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
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
};
