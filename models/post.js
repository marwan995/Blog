const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    Reacts: {
        type: Number, default: 0
    },
    commentsCounter: {
        type: Number, default: 0
    },
    description: {type: String,
        default: " "
       },
    img:{type: String,
        default: " "
       },
    username: String,
    userImg: {type: String,
        default: "default.jpg"
       },
    comments:{type: [{
        username: String,
        Comment: String,
        img: String
    }],
    default:[]
},
date:Date
})
let post = mongoose.model('Post', postSchema);
module.exports = post;

