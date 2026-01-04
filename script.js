// =====================
// VARIABLES
// =====================
let score = 0;
let clickPower = 1;
let upgradePrice = 10;

let totalClicks = 0;

let prestigeCount = 0;
let prestigeMultiplier = 1;

let autoClickStarted = false;
let bonus2500Applied = false;

const prestigeSteps = [7000, 100000, 10000000, 500000000, 3000000000];

// =====================
// ELEMENTS
// =====================
const scoreEl = document.getElementById("score");
const powerEl = document.getElementById("power");
const shopBtn = document.getElementById("shopBtn");

const prestigeCountEl = document.getElementById("prestigeCount");
const prestigeNeedEl = document.getElementById("prestigeNeed");

const bravoEl = document.getElementById("bravo");
const indispoEl = document.getElementById("indispo");

const prestigePanel = document.getElementById("prestigePanel");

// =====================
// UI
// =====================
function updateUI() {
  scoreEl.textContent = score;
  powerEl.textContent = clickPower * prestigeMultiplier;

  shopBtn.textContent = `🛒 Boutique (${upgradePrice} points)`;

  prestigeCountEl.textContent = prestigeCount;
  prestigeNeedEl.textContent =
    prestigeSteps[prestigeCount] ?? "MAX";
}

// =====================
// CLIC
// =====================
function doClick() {
  const gain = clickPower * prestigeMultiplier;

  score += gain;
  totalClicks += 1;

  checkAutoClick();
  check2500Bonus();
  updateUI();
}

document.getElementById("clickBtn").onclick = doClick;

// barre espace
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    doClick();
  }
});

// =====================
// BOUTIQUE
// =====================
shopBtn.onclick = () => {
  if (score < upgradePrice) return;

  score -= upgradePrice;
  clickPower += 2;
  upgradePrice *= 2;

  showBravo();
  updateUI();
};

// =====================
// AUTO-CLIC (2000 clics)
// =====================
function checkAutoClick() {
  if (autoClickStarted) return;

  if (totalClicks >= 2000) {
    autoClickStarted = true;

    setInterval(() => {
      score += clickPower * prestigeMultiplier;
      totalClicks += 1;
      updateUI();
    }, 200);
  }
}

// =====================
// BONUS +5 À 2500 CLICS
// =====================
function check2500Bonus() {
  if (bonus2500Applied) return;

  if (totalClicks >= 2500) {
    clickPower += 5;
    bonus2500Applied = true;
    showBravo();
    updateUI();
  }
}

// =====================
// PRESTIGE
// =====================
document.getElementById("openPrestigeBtn").onclick = () => {
  prestigePanel.style.display = "block";
};

document.getElementById("closePrestigeBtn").onclick = () => {
  prestigePanel.style.display = "none";
};

document.getElementById("doPrestigeBtn").onclick = () => {
  const need = prestigeSteps[prestigeCount];

  if (!need || totalClicks < need) {
    showIndispo();
    return;
  }

  prestigeCount++;
  prestigeMultiplier *= 2;

  score = 0;
  clickPower = 1;
  upgradePrice = 10;
  totalClicks = 0;
  autoClickStarted = false;
  bonus2500Applied = false;

  prestigePanel.style.display = "none";
  updateUI();
};

// =====================
// RESET
// =====================
document.getElementById("resetBtn").onclick = () => {
  if (!confirm("Tout remettre à zéro ?")) return;

  score = 0;
  clickPower = 1;
  upgradePrice = 10;
  prestigeCount = 0;
  prestigeMultiplier = 1;
  totalClicks = 0;
  autoClickStarted = false;
  bonus2500Applied = false;

  updateUI();
};

// =====================
// MESSAGES
// =====================
function showBravo() {
  bravoEl.style.display = "block";
  setTimeout(() => {
    bravoEl.style.display = "none";
  }, 1000);
}

function showIndispo() {
  indispoEl.style.display = "block";
  setTimeout(() => {
    indispoEl.style.display = "none";
  }, 1000);
}

// =====================
// START
// =====================
function saveGame() {
  const data = {
    score,
    clickPower,
    upgradePrice,
    totalClicks,
    prestigeCount,
    prestigeMultiplier,
    autoClickStarted,
    bonus2500Applied
  };
  localStorage.setItem("clickerSave", JSON.stringify(data));
}
updateUI();
