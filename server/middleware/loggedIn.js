// middleware to check if the user is logged in or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) next();
    res.redirect('/');
}

module.exports = isLoggedIn;