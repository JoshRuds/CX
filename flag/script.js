function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setup() {
  const flag1 = document.getElementById("flag1");
  const flag2 = document.getElementById("flag2");
  const flag3 = document.getElementById("flag3");
  const flag4 = document.getElementById("flag4");
  const flagimg = document.getElementById("flagimg");
  const feed = document.getElementById("feed");
  const buttons = [flag1, flag2, flag3, flag4];

  // Load images.json and countryNames.json
  const [imagesRes, namesRes] = await Promise.all([
    fetch("images.json"),
    fetch("flagnames.json")
  ]);
  const images = await imagesRes.json();
  const countryNames = await namesRes.json();

  // Pick 4 random flags
  let choices = [];
  while (choices.length < 4) {
    const flag = images[Math.floor(Math.random() * images.length)];
    if (!choices.includes(flag)) choices.push(flag);
  }

  // Pick one correct flag to display
  const correct = choices[Math.floor(Math.random() * 4)];
  flagimg.setAttribute("src", correct);
  flagimg.setAttribute("data-correct", correct);

  // Set buttons to show country names
  for (let i = 0; i < 4; i++) {
    const name = countryNames[choices[i]] || choices[i].split("/").pop().replace(".png","");
    buttons[i].innerHTML = name;
    buttons[i].value = choices[i];
  }

  feed.innerHTML = "";
}

async function clicked(btn) {
  const flagimg = document.getElementById("flagimg");
  const feed = document.getElementById("feed");
  const correct = flagimg.getAttribute("data-correct");

  if (btn.value === correct) {
    feed.innerHTML = "✅ Correct!";
  } else {
    feed.innerHTML = `❌ Wrong! It was ${document.getElementById("flag1").value === correct ? document.getElementById("flag1").innerHTML :
                       document.getElementById("flag2").value === correct ? document.getElementById("flag2").innerHTML :
                       document.getElementById("flag3").value === correct ? document.getElementById("flag3").innerHTML :
                       document.getElementById("flag4").innerHTML}`;
  }

  await sleep(2000);
  setup();
}



function clicked(){
 var x = document.getElementById("feed");
 x.innerHTML = "Correct!";
 sleep(2000).then(() => {x.innerHTML = "";setup();});
};