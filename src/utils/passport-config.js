const User = require("../../models/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ where: { email } }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user[0].dataValues.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user[0].dataValues.uuid);
  });

  passport.deserializeUser((uuid, cb) => {
    User.findOne({ where: { uuid } }, (err, user) => {
      const userInformation = {
        firstName: user[0].dataValues.firstName,
        lastName: user[0].dataValues.lastName,
        email: user[0].dataValues.email,
        isAdmin: user[0].dataValues.isAdmin,
      };
      cb(err, userInformation);
    });
  });
};
