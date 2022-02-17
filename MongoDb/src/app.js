const mongoose = require("mongoose");
const validator = require("validator");


//connection creatinf and creating new db
mongoose.connect("mongodb://localhost:27017/tusharkarle")
.then(()=>{console.log("connection successfull")})
.catch((err)=> console.log(err));


//schema
//a mongoose schema defines the structure of the document,default values , validators ,etc

const playlistSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ctype:String,
    videos: {
        type: Number,
        validate(value) { 
            if (value < 0) { 
                throw new Error("videos cannot be negative");
            }
        }
    },
    author: String,
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error "Email invalid";
            }
         }

        
    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now,               //we can also give default value using this format
    }
});


//a mangoose model is a weapper on the moongoose schema .
// a mongoose schema defines the structure of the document,
// default valuees , validators , etc ,,where as a mongoose mode
// provides an interface to the database for creating,
// quering , updating , deleting records , etc


const Playlist = new mongoose.model("Playlist",playlistSchema);


//insert or create document
const createDocument= async()=>{
try{
    const JSPlaylist=new Playlist({
        name:"JAVASCRIPT",
        ctype:"FRONT END",
        videos:150,
        author: "Tushar Karle",
        
        active:true,
    });

    const NODEPlaylist=new Playlist({
        name:"NODE JS",
        ctype:"BACKEND",
        videos:50,
        author: "Tushar Karle",
        email:"tushar@sfk",
        active:true,
    });

    
    const result=await Playlist.insertMany([JSPlaylist,NODEPlaylist]);
    console.log(result);
}
catch(err){
    console.log(err);
}
}; 
createDocument();


//read the document
const getDocument = async () => {

    try {
        const result = await Playlist.find({ ctype: "FRONT END" }).select({ name: 1 }).limit(1).co;
        console.log(result);
    }
    catch (err) {
        console.log(err);
     }
};

// getDocument();



//get the data using comparison operator

const getDocumentf = async () => {

    try {
        const result = await Playlist.find({ $and: [{ name: "NODE JS" }, { videos: 50 }] }).select({ name: 1 });
        console.log(result);
    }
    catch (err) {
        console.log(err);
     }
};

// getDocumentf();



//sorting and count query methods

const getDocumentc = async () => {

    try {
        const result = await Playlist.find().select({ name: 1 }).sort({name:-1});
        console.log(result);
    }
    catch (err) {
        console.log(err);
     }
};

// getDocumentc();



//update document
const updateDocument = async () => {

    try { 
        const result = await Playlist.updateOne({ name: "NODE JS" }, {
            $set: {
                name:"javascript"
        } });
    }
    catch (err)
    {
        console.log(err);
    }

 };
// updateDocument();


// delete the document
const deleteDocument = async () => {
    try {
        const result = await Playlist.deleteOne({ name: "JAVASCRIPT" });
     }
    catch (err) {
        console.log(err);
    }
};
// deleteDocument();