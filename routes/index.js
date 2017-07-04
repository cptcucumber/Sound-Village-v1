var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")

router.get("/", function(req, res){
    res.render("landing.ejs")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

//Auth Routes

router.get("/register", function(req, res){
    res.render("register")
})

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){ // assigns gigantic monstrosity to username
        if(err){
            console.log(err)
            return res.render("register") 
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/cards")
        })
    }) //register handles logic, stores crazy hash not password
})

router.get("/login", function(req, res){
    res.render("login")
})

router.post("/login", passport.authenticate("local", { //when request comes in, the passport....middleware code runs first
    successRedirect: "/cards", // will call authenticate method which we setup up there towards the top
    failureRedirect: "/login"  // use passport-local-mongoose, req.body.username authenticate with what we have in database
    }), function(req, res){    
    res.render("register.ejs", {message: req.flash("error") } )
}) 

router.get("/logout", function(req, res){
    req.logout()
    req.flash("error", "Logged You Out")
    res.redirect("/cards")
})

module.exports = router