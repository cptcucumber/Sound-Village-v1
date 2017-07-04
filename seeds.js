var mongoose = require("mongoose")
var Card = require("./models/card")
var Comment = require("./models/comment")

var data = [
        {name: "Cloud's Rest", 
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_iMLQdQHHqrSumkj7H2B5G6v_UPp9Fh2QhSMcc4WfHox67BrKQ",
        description: "blah blah blah"
        },
        {name: "Cloud's Rest", 
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_iMLQdQHHqrSumkj7H2B5G6v_UPp9Fh2QhSMcc4WfHox67BrKQ",
        description: "blah blah blah"
        },
        {name: "Cloud's Rest", 
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_iMLQdQHHqrSumkj7H2B5G6v_UPp9Fh2QhSMcc4WfHox67BrKQ",
        description: "blah blah blah"
        },
    ]

function seedDB(){
    Card.remove({}, function(err){
       if(err){
           console.log(err)
       } 
        // console.log("Removed card!")
       
        // data.forEach(function(seed){
                
        //     Card.create(seed, function(err, card){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("Added a new card")
        //             //create comment 
        //             Comment.create(
        //                 {
        //                     text: "This place is great",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err)
        //                     } else {
        //                         card.comments.push(comment) //association
        //                         card.save()
        //                         console.log("created new comment")
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
    })
}

module.exports = seedDB