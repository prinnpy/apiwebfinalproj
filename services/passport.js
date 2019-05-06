const passport = require('passport');  // how to handle authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; // which auth strategy to use
const mongoose  = require('mongoose');
//const User = mongoose.model('users');
const keys = require('../Config/Keys.js');



mongoose.Promise = global.Promise;

const User = mongoose.model('users');  // One argument means we're trying to fetch something out of mongoose
///////

// Create a "cookie" for the user that was just created below (e.g. the "existingUser")
passport.serializeUser((user, done )=> {
    done(null, user.id);                     // the .id here is the UserSchema _id, not the google profile.Id
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
        .then(user => {
            done(null, user);
        });

});

// using "Sign-in with Google" strategy
passport.use(new GoogleStrategy(                 // Creates a new instance of the Google passport stategy
    {
        clientID: keys.googleClientID,           // passport.use => I want to use GoogleStrategy
        clientSecret: keys.googleClientSecret,   // Arguments needed to get permission from google
        callbackURL: '/auth/google/callback',     // route the user is sent to after google grants permission
        proxy: true //
    },

    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})     //  check if the user exists
                                                                            // If it does, cool
        if (existingUser){
            console.log("User exists"); // for production only
            done(null, existingUser);   // 1st argument is an error argument, 2nd argument is the user record

        }else{   // If it doesnt exist, add it to the database
                 // How user profile save() is implemented in the video
                 //new User({googleId: profile.id}).save(); // must call the function "save()" to actually save to the database.

            // how we saved the user in our class examples
            var userNew = new User();
            userNew.googleId = profile.id;
            userNew.firstName = profile.name.givenName;
            userNew.lastName = profile.name.familyName;
            userNew.email = profile.emails[0].value;
            const user = await userNew.save()
                done(null, user);
        }

        console.log('access token', accessToken);   // for development only
        console.log('refresh token', refreshToken); // for development only
        console.log('profile:', profile);           // for development only

        console.log('First Name:', profile.name.givenName);  // for development only
        console.log('Last Name:', profile.name.familyName);  // for development purposes
        console.log('email:', profile.emails[0].value);      // for development only
        }
    )
);
