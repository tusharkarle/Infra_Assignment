const express = require("express");
const res = require("express/lib/response");
const path = require("path");

const app=express();

const hbs= require("hbs");

/* 
staticPath=path.join(__dirname+"../public");
console.log(staticPath);
// builtin middleware
app.use(express.static(staticPath));
 */

const templatePath=path.join(__dirname,"../templates");
const PartialPath=path.join(__dirname,"../templates");


// to set the view engine
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(PartialPath);;


// template engine route
app.get("",(req,res)=>{
    res.render('index',{
        channelName:"tushar karle",
    });
});


app.get("/about",(req,res)=>{
// res.send("Homepage");
res.render("about");
});

app.listen(8000,()=>{
console.log("listing to the 8000 port")
});