var express = require("express");
var router = express.Router();
var Card = require("../models/card");
var middleware = require("../middleware");

//INDEX - show all cards
router.get("/", function(req, res) {
    Card.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("cards/index.ejs", {cards:allCampgrounds}); //source of campgrounds no longer the array
        }
    });
});

//CREATE - add new card to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCard = {name: name, image: image, description: desc, author: author};
    Card.create(newCard, function(err, newlyCreated){
        if(err){
            // name can't be blank
        } else {
            res.redirect("/cards");
        }
    });
});

//NEW - show form to create new card
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("cards/new.ejs");
});

//SHOW - shows more info about one card
router.get("/:id", function(req, res){
   Card.findById(req.params.id).populate("comments").exec(function(err, foundCard){ //convert ids -> comments
       if(err){
           console.log(err);
       } else {
           console.log("This card's information is:");
           console.log(foundCard);
           res.render("cards/show.ejs", {card: foundCard});
       }
   });
});

//EDIT CARD 

router.get("/:id/edit", middleware.checkCardOwnership, function(req,res){
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err);
        } else {
            res.render("cards/edit", {card: foundCard});
        }
    });
});

// UPDATE CARD IN DATABASE
router.put("/:id", middleware.checkCardOwnership, function(req, res){ //if middleware is fulfilled, function(req,res) runs
    Card.findByIdAndUpdate(req.params.id, req.body.card, function(err, updatedCard){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/cards/" + req.params.id);
        }
        });
});

router.delete("/:id", middleware.checkCardOwnership, function(req, res){
    Card.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/cards");
        }
    });
}) ;

module.exports = router;