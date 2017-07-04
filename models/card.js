var mongoose = require("mongoose")
var cardSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

var Card = mongoose.model("Card", cardSchema)

module.exports = mongoose.model("Card", cardSchema)