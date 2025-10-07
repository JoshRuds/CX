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

  // get four random image paths
  var f1 = await randomPng();
  var f2 = await randomPng();
  var f3 = await randomPng();
  var f4 = await randomPng();

  // show just filenames as button text (not full paths)
  flag1.innerHTML = f1.split("/").pop().replace(".png", "");
  flag2.innerHTML = f2.split("/").pop().replace(".png", "");
  flag3.innerHTML = f3.split("/").pop().replace(".png", "");
  flag4.innerHTML = f4.split("/").pop().replace(".png", "");

  // pick one randomly for the displayed flag
  var flags = [f1, f2, f3, f4];
  var flag = flags[Math.floor(Math.random() * 4)];

  flagimg.setAttribute("src", flag);
};



function clicked(){
 var x = document.getElementById("feed");
 x.innerHTML = "Correct!";
 sleep(2000).then(() => {x.innerHTML = "";setup();});
};