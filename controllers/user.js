const user = require("../models/user.js");

module.exports.signupForm = (req,res) =>{
    res.render("users/signup.ejs")
}

module.exports.signUp =async(req,res) =>{
try{
    let{username ,email,password} = req.body;
    const newuser = new user({username,email});
    const registereduser = await user.register(newuser,password);
    console.log(registereduser);
    req.login(registereduser, (err) =>{
        if (err){
            return next(err)
        }
        req.flash("success", "welcome to Roaver");
     res.redirect("/listings");
    });
}catch(e){
    req.flash("error",e.message)
    res.redirect("/signup");
}};

module.exports.loginForm = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.login =async(req,res)=>{
        req.flash("success", "welcome to Roaver");
        res.redirect("/listings");
};
module.exports.logout = (req,res,next) =>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you are loged out");
        res.redirect("/listings");
    })
}
