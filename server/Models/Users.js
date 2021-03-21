const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

var Users = new schema({
    
    access_token: {
        type: String
    } 

});

Users.plugin(passportLocalMongoose);

const User = mongoose.model("User", Users);
module.exports = User;


