const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const app = express();
// clientId 940402436141-sm3pj6g8mcdhnkge669fst815bbsdmrg.apps.googleusercontent.com
// clientSecret S-GZsJOZBKR8ZuiykHhQqVPm
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
