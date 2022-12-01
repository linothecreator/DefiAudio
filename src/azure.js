var {disableResponseDecompressionPolicy}= require("@azure/core-http");
var {ClientRequest} = require("http");
require("regenerator-runtime/runtime");
var {BlobServiceClient} = require("@azure/storage-blob");
var { io } = require('socket.io-client');
const { send } = require("process");
require('dotenv').config();

var SASurl=process.env.SAS_URL;
const container=process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(SASurl); 
const containerClient = blobServiceClient.getContainerClient(container);

//Setup and configure Socket IO
const socket = io(process.env.WEBPAGE_URL);

socket.on('connect', () =>{console.log('azure.js: ' + socket.id);});

var blobUrl;
function sendURL (_url) {socket.emit('event', _url);}




function uploadBlob() {
    console.log(_fileInput.files[0].name);
    //Pass file to API
    blockBlobClient=containerClient.getBlockBlobClient(_fileInput.files[0].name);
    //Get URL
    blobUrl=blockBlobClient.url; console.log(blobUrl);
    //emit url to main server.js
    sendURL(blobUrl);

    //upload file to azure storage container
    blockBlobClient.uploadBrowserData(_fileInput.input);  
}

var selectButton = document.getElementById("selectButton");
var _fileInput = document.getElementById("fileInput");
var dummyButton=document.getElementById("dummyButton");
var formButton=document.getElementById("formButton");
var form=document.getElementById("form");

selectButton.addEventListener("click", () => _fileInput.click());
_fileInput.addEventListener("change", uploadBlob);
dummyButton.addEventListener("click", () => formButton.click());
