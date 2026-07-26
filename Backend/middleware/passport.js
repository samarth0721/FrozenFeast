const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const BACKEND_URL = process.env.BACKEND_URL || "https://frozenfeast.onrender.com";

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/api/v1/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create user by Google ID or email
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.googleId = profile.id; // Link existing user
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    role: 'Customer' // Default
                });
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${BACKEND_URL}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.facebookId = profile.id;
                await user.save();
            } else {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id,
                    role: 'Customer'
                });
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Serialize/Deserialize for sessions (optional, since we use JWT)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;