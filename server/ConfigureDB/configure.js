const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dbname = "app";
const password = 'iamnottelling';
const username = 'yashthakur';
const url = `mongodb+srv://${username}:${password}@cluster0.sovkt.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connectToDB = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connectToDB
    .then((db) => {
        console.log("conected to mongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

 

   

module.exports = connectToDB;

{/*
 * For MongoDB at PC
 * 
 * const dbname = "github";
 * const url = `mongodb://localhost:27017/${dbname}`;
 * 
 * 
 */ }