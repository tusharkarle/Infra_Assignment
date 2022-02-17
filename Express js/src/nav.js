



/* exercise to do the js routing 
    1.homepaage
    2.about
    3. contact
    4. temp
*/

const express = require("express");

// import express from "express";

const app=express();

app.get("/",(req,res)=>{
    res.write("<h1>homepage</h1>");
    res.write("<h1>homepage</h1>");
    res.send();
});

app.get("/contact",(req,res)=>{
    res.send("contact");

});
app.get("/about",(req,res)=>{
    res.send("about");

});
// app.get("/temp",(req,res)=>{
//     res.send([{
//         id:1,
//         name:"vinod",
//     },
//     {
//         id:1,
//         name:"vinod",
//     }]);

// });

app.get("/temp",(req,res)=>{
    res.json([{
        id:1,
        name:"vinod",
    },
    {
        id:1,
        name:"vinod",
    }]);

});

/* the methods are identical when an object or array is passed but res.json() will also convert non-objects such as null and undefined which are not valid in js */

app.listen(8000,()=>{
    console.log("listing the port 8000");
})