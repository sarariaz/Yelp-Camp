var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground"); // we are importing campground schema from campground.js
var seedDB = require("./seeds");
seedDB(); // means that we are exporting a FUNCTION

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



//creating a new campground
 
/*Campground.create({
    name: "Salmon Creek" ,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg",
    description: "This is a huge campground"
},  function(err, campground){
     if(err){
         console.log("OPPsss");
         console.log(err);
     }
     else{
         console.log("Campground Addded");
         console.log(campground);
     }
});  */



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   //Get all campgrounds from db
   Campground.find({},function(err, allcampground){
       if(err){
           console.log(err);
           console.log("Error");

       }
       else{
        res.render("index", {campgrounds: allcampground});
       }
   } )
  
});

app.post("/campgrounds", function(req , res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name : name , image : image , description: description};

    //create a new campground and save it to db
    Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);

      }
      else {
        res.redirect("/campgrounds");
      }
    });

   

});

app.get("/campgrounds/new", function(req , res){
    
    res.render("new");
});

// SHOWS MORE INFORMATION ABOUT ONE CAMPGROUND

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){ // we used .populate to translate the id comments.
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundCampground});
        }
    })
});

app.listen(3000, function(){
    console.log("YelpCamp started!");
});