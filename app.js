var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Card        = require("./models/card"), // otherwise Card will be assigned to a {}
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

//requiring routes
var commentRoutes = require("./routes/comments.js"),
    cardRoutes = require("./routes/cards.js"),
    indexRoutes = require("./routes/index.js");
    
    console.log("process.env.DATABASEURL is")
    console.log(process.env.DATABASEURL);
    if(!process.env.DATABASEURL){
        var url = 'mongodb://localhost/my_database'
    } else {
        var url = process.env.DATABASEURL
    }
    mongoose.connect(url)
    mongoose.connect('mongodb://localhost/my_database')

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //__dirname is the entire path
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport configuration
app.use(require("express-session")(
    {
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialize: false 
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate())) //method from passport-local-mongoose
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) //also from passport-local-mongoose

app.use(function(req, res, next){
    res.locals.currentUser = req.user; //middleware, currentUser within template, route handler for next()
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next(); //every template has this
});

app.use("/", indexRoutes);
app.use("/cards/:id/comments", commentRoutes);
app.use("/cards", cardRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started!");
});

