function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let correctFlag = ""; 
let countryNames = {}; 

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
  const flagimg = document.getElementById("flagimg");

  const choices = [];
  while (choices.length < 4) {
    const flag = images[Math.floor(Math.random() * images.length)];
    if (!choices.includes(flag)) choices.push(flag);
  }

  correctFlag = choices[Math.floor(Math.random() * choices.length)];
  flagimg.setAttribute("src", correctFlag);

  for (let i = 0; i < 4; i++) {
    const code = strip(choices[i]);
    const name = countryNames[code] || code.toUpperCase();
    buttons[i].innerText = name;
    buttons[i].value = code;
  }

  document.getElementById("feed").innerHTML = "";
}

async function clicked(btn) {
  const x = document.getElementById("feed");
  if (btn.value === strip(correctFlag)) {
    x.innerHTML = "✅ Correct!";
  } else {
    x.innerHTML = "❌ Wrong!";
  }
  await sleep(2000);
  x.innerHTML = "";
  setup();
}
