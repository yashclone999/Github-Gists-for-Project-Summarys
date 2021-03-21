const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dbname = "github";
const url = `mongodb://localhost:27017/${dbname}`;

const connectToDB = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connectToDB
    .then((db) => {
        console.log("conected to mongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

 

   

module.exports = connectToDB;

