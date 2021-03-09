const {User} = require("./db/models");

const loginUser = (req, res, user) => {
    console.log("test before");
    req.session.auth = {userId: user.id}
    console.log(req.session.auth);
    console.log("test after");
}

const logoutUser = (req, res) => {
    console.log("test before delete session");
    delete req.session.auth;
    console.log(req.session.auth);
    console.log("test after delete session");

}

const requireAuth = (req, res, next) => {
    if(!res.locals.authenticated){
        return res.redirect("/login");
    }
    return next();
}

const restoreUser = async (req, res, next) => {
    //Log the session object to the console
    //to assist with debugging
    // console.log(req.session);

    if(req.session.auth){
        const {userId} = req.session.auth;

        try{
            const user = await User.findByPk(userId);
            if(user){
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }

        }catch(err){
            res.locals.authenticated = false;
            next(err);
        }

    }else {
        res.locals.authenticated = false;
        next();
    }
}

module.exports = { loginUser, logoutUser, requireAuth, restoreUser }
