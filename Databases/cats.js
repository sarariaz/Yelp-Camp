var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost//cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number

});

var Cat = mongoose.model("Cat", catSchema);
//adding a new cat to db 
 var george= new Cat({
     name: "George",
     age: 12
 });

 george.save(function(err, cat){
     if(err){
         console.log("There is error");

     } else
     {
         console.log("You saved a cat in DB");
         console.log(cat);
     }
 });