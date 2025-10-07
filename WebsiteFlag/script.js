function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};

async function randomPng() {
  const r = await fetch("images.json");
  const images = await r.json();
  var ra = images[Math.floor(Math.random() * images.length)];
  return ra;
};

async function setup() {
  var flag1 = document.getElementById("flag1");
  var flag2 = document.getElementById("flag2");
  var flag3 = document.getElementById("flag3");
  var flag4 = document.getElementById("flag4");
  var flagimg = document.getElementById("flagimg");

  flag1.innerHTML = "";
  var flag = await randomPng();

  flagimg.setAttribute("src", flag);
};



function clicked(){
 var x = document.getElementById("feed");
 x.innerHTML = "Correct!";
 sleep(2000).then(() => {x.innerHTML = "";setup();});
};