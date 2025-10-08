function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let correctFlag = ""; 
let countryNames = {}; 
var score = 0
var done = 0

function strip(flagPath) {
  // remove "flags/" and ".png"
  return flagPath.replace("flags/", "").replace(".png", "");
}

async function randomPng() {
  const r = await fetch("images.json");
  const images = await r.json();
  const ra = images[Math.floor(Math.random() * images.length)];
  return ra;
}

async function setup() {
  const flagimg = document.getElementById("flagimg");
  flagimg.setAttribute("src", "wait.webp")
  const scoreh6 = document.getElementById("score");
  scoreh6.innerHTML = "Score: "+score+"/"+done+" || "+Math.floor((score/done)*100)+"%";
  const namesRes = await fetch("flagnames.json");
  countryNames = await namesRes.json();

  const r = await fetch("images.json");
  const images = await r.json();

  const buttons = [
    document.getElementById("flag1"),
    document.getElementById("flag2"),
    document.getElementById("flag3"),
    document.getElementById("flag4")
  ];
  

  const choices = [];
  while (choices.length < 4) {
    const flag = images[Math.floor(Math.random() * images.length)];
    if (!choices.includes(flag)) choices.push(flag);
  }

  correctFlag = choices[Math.floor(Math.random() * choices.length)];
  flagimg.setAttribute("src", correctFlag);

  for (let i = 0; i < 4; i++) {
    const fileName = choices[i];       // "flags/ad.png"
    const name = countryNames[fileName] || fileName; // use full filename as key
    buttons[i].innerText = name;       // display the name from JSON
    buttons[i].value = fileName;       // store full path for checking
  }

  document.getElementById("feed").innerHTML = "";
}

async function clicked(btn) {
  done = done + 1
  const x = document.getElementById("feed");
  if (btn.value === correctFlag) {
    x.innerHTML = "✅ Correct!";
    score = score + 1 
  } else {
    x.innerHTML = "❌ Wrong!";
  }
  await sleep(2000);
  x.innerHTML = "";
  setup();
}
