const express=require("express");
const path=require("path");

const app=express();
/* 
app.get(route,callback) --> to get the data from server 

    route -->means if we put the address such as / , /contact 
    callback--> means what we have to show when this is called
    
*/

//path of html or website
const staticPath =path.join(__dirname,"../public");
// console.log(path.join(__dirname,"../public/index.html"));

//builtin middleware
app.use(express.static(staticPath));


app.get("/",(req,res)=>{
    res.send("home page");
});
app.get("/about",(req,res)=>{
    res.send("about us");
});

app.get("/contact",(req,res)=>{
    res.send("contact us");
});


app.listen(8000,()=>{
    console.log("listing the port at 8000");
});

/* the callback function has 2 parameters , request and response
the request obj (req) represents the http request and has properties for the request query string, parameters , body and http leaders,etc


similar;y the response object represents the http response that the express app send when it recieves an http request

*/