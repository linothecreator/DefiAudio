const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const process= require('process');
const mongoose = require('mongoose');
const Bundler = require('parcel-bundler');
require('dotenv').config();

const app = express();
//MongoDB Post Method
var ab1, library, empSchema;
//html form data variables
var fName, lName, fileName, selectButton, _fileInput; 
//parcel bundler
const file = ["./upload.html", "/server.js"]; const options ={publicUrl: '/'};
let bundler = new Bundler(file, options);
//express.js middleware
app.use(express.json());
app.use("/dist", express.static('./dist'));
app.use("/src", express.static('./src'));
app.use(bodyParser.urlencoded({ extended: true }));



mongooseConnect();
createLibSchema();
createLibModel();
fetchUserData();
//====================================================================================================
//UPLOAD POST METHOD 

app.route('/upload').all (function (req, res) {
      // html element variables (body-psarser)
    var fName=req.body.firstName;
    var lName=req.body.lastName;
    var fileName=req.body.fileName;
    var selectButton=req.body.selectButton;
    var _fileInput=req.body.fileInput;  
    
    if(!library||library===""||library===null){createLibModel()} 

    saveData();
    res.send("post")});

//====================================================================================================
//load main mage

//middleware

app.get('/', async (req, res) => {
    console.log("endpoint:'/' Message: Hello World");
    res.sendFile(process.cwd() + "/dist/upload.html")
});
app.use("/", bundler.middleware());

//====================================================================================================
//SOCKET.IO
const server = require('http').createServer(app);
const io = require('socket.io')(server); 

io.on('connection', socket => {console.log(socket.id); socket.on('event', (data)=>{ab1=data; console.log(ab1);})});

//====================================================================================================
//UPLOAD META TO MONGODB
//CONNECT
var libSchema;
function mongooseConnect(){
    conn = mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, });
    if (conn) {console.log("Mongoose Connected")}
    else{console.log("Mongoose could not connect")}
    var _test = mongoose.modelNames;
    console.log(_test);
}
function createLibSchema(){
            libSchema = new mongoose.Schema(
                { "username":String,
                     "libraries":
                     
                     {"library":[
                    {
                        "libraryName":String,
        
                        "files":[{
                        "filename": String, 
                        "fileUrl": String}]}]}
                });
         if(libSchema){console.log("lib schema' Done");}
        return libSchema;}

function createLibModel() {library = mongoose.model('library', libSchema);
        if(library){console.log("'library model' Done" )}}
        
function saveData() {
            if(ab1){
            const newLibrary = new library({
                "username": "username",
                "libraries":
                
                {"library":[
               {
                   "libraryName":"library",
   
                   "files":[{
                   "filename": "filename", 
                   "fileUrl": ab1}]}]}});
        
            if(newLibrary){console.log("3/3 'library object' Done"); newLibrary.save();}}
            else{ console.log("Could not retrieve file url");}}
        
//====================================================================================================
//GET META FROM MONGODB
var userData;
async function fetchUserData(){userData = await library.find({username: "username"});
console.log("function fetchUserData");
console.log(userData);
console.log(library.username)}

//====================================================================================================
server.listen(process.env.PORT, () => {console.log('listening on port ' + process.env.PORT);});