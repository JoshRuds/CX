function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let correctFlag = ""; // store the correct flag globally
let countryNames = {}; // store names from JSON globally

async function randomPng() {
  const r = await fetch("images.json");
  const images = await r.json();
  const ra = images[Math.floor(Math.random() * images.length)];
  return ra;
}

async function setup() {
  const namesRes = await fetch("countryNames.json");
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

  // choose 4 random unique flags
  const choices = [];
  while (choices.length < 4) {
    const flag = images[Math.floor(Math.random() * images.length)];
    if (!choices.includes(flag)) choices.push(flag);
  }

  // set random correct answer
  correctFlag = choices[Math.floor(Math.random() * choices.length)];
  flagimg.setAttribute("src", correctFlag);

  // label buttons
  for (let i = 0; i < 4; i++) {
    const name = countryNames[choices[i]] || choices[i];
    buttons[i].innerText = name;
    buttons[i].value = choices[i];
  }

  // reset feedback
  document.getElementById("feed").innerHTML = "";
}

async function clicked(btn) {
  const x = document.getElementById("feed");
  if (btn.value === correctFlag) {
    x.innerHTML = "✅ Correct!";
  } else {
    x.innerHTML = "❌ Wrong!";
  }
  await sleep(2000);
  x.innerHTML = "";
  setup();
}
