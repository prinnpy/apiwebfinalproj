const passport = require('passport');  //requiring the original passport npm module


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));   // attempt to authorize the user coming into this route
           // 'google' > assigns the string 'google' to the strategy we are using in passport.use seen above
           // scope: gives us access to username and passport

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req,res) =>{
        req.logout();    // kills the cookie the user was using
        res.redirect('/');

    });


    app.get('/api/current_user', (req, res) =>{
        res.send(req.user);
    })
};
