const User = require("../models/user");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try{
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to the app!");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", "Username is already registered!");
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm = (req,res)=>{
   res.render("users/login.ejs");
}

module.exports.Login = async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");

    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
}

