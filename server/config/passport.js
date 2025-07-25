const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) return done(null, false, { message: 'User not found' });
            
            const isMatch = await user.isValidPassword(password);
            if (!isMatch) return done(null, false, { message: 'Wrong password' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
