var { io } = require('socket.io-client');
const socket = io(process.env.WEBPAGE_URL);
socket.on('connect', () =>{console.log('pad.js: ' + socket.id);});

var audio = new Audio("")

var pad1=document.getElementById("pad1");
var pad2=document.getElementById("pad2");
var pad3=document.getElementById("pad3");
var pad4=document.getElementById("pad4");
var pad5=document.getElementById("pad5");
var pad6=document.getElementById("pad6");
var pad7=document.getElementById("pad7");
var pad8=document.getElementById("pad8");
var pad9=document.getElementById("pad9");
var pad10=document.getElementById("pad10");
var pad11=document.getElementById("pad11");
var pad12=document.getElementById("pad12");
var pad13=document.getElementById("pad13");
var pad14=document.getElementById("pad14");
var pad15=document.getElementById("pad15");
var pad16=document.getElementById("pad16");

var testAudio ="https://cryptobeatzaudio.blob.core.windows.net/container1/CardiakClap.wav";
var audio = new Audio(testAudio);
function playAudio(){
audio.play();
}

pad1.addEventListener('click', ()=>{playAudio(), console.log("click")} );
var slider = document.getElementById("bank-slider-range");
var output = document.getElementById("bank-slider-value");
slider.addEventListener("input", ()=>{output.innerHTML = slider.value;});
