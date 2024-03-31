// Variables::
// -- General Buttons
const coffeeButton = document.getElementById("coffeeButton");
const resetButton = document.getElementById("resetButton");
// -- Upgrade Buttons
const buttons = {
  easyUpgradeButton: document.getElementById("upgradeButton"),
  treeButton: document.getElementById("treeButton"),
  workerButton: document.getElementById("workerButton"),
  traderButton: document.getElementById("traderButton"),
  formulaButton: document.getElementById("formulaButton"),
};
// -- Page Display
const beanCounter = document.getElementById("beanCounter");
const beansPerSecond = document.getElementById("beansPerSecond");
const currentCost = document.getElementById("currentCost");
// Upgrade Zone Cost Displays
const treeCost = document.getElementById("treeCost");
const workerCost = document.getElementById("workerCost");
const traderCost = document.getElementById("traderCost");
const formulaCost = document.getElementById("formulaCost");
// Displays how many of the upgrade the User has
const usersTrees = document.getElementById("usersTrees");
const usersWorkers = document.getElementById("usersWorkers");
const usersTraders = document.getElementById("usersTraders");
const usersFormulas = document.getElementById("usersFormulas");
// Displays how many bps the user gets from upgrades
const easyCount = document.getElementById("easyCount");
const treeCount = document.getElementById("treeCount");
const workerCount = document.getElementById("workerCount");

//  -- Set the User Stats Object
const userStats = {
  beanCount: 0,
  beansPerSecond: 0,
  treeButton: 0,
  workerButton: 0,
  traderButton: 0,
  formulaButton: 0,
};
// -- Set the cost of the upgrades, and make them match the keys in the 'buttons' object.
const userCostOfUpgrades = {
  easyUpgradeButton: 5,
  treeButton: 100,
  workerButton: 1000,
  traderButton: 20000,
  formulaButton: 100000,
};

const baseCostOfUpgrades = {
  easyUpgradeButton: 5,
  treeButton: 100,
  workerButton: 3000,
  traderButton: 20000,
  formulaButton: 100000,
};

const beansPerUpgrade = {
  easyUpgradeButton: 0.5,
  treeButton: 10,
  workerButton: 50,
  traderButton: 200,
  formulaButton: 500,
};

// Update Buttons and Stats on page load::
updateButtons();

// Runs once to check if a user has locally stored stats, then updates the live stats to match.
const storedUserStats = JSON.parse(localStorage.getItem("userStats"));
const storedUserCosts = JSON.parse(localStorage.getItem("userCostOfUpgrades"));
if (storedUserStats != null) {
  for (let currentStat in userStats) {
    userStats[currentStat] = storedUserStats[currentStat];
  }
  updatePageStats();
}

if (storedUserCosts != null) {
  for (let currentCost in userCostOfUpgrades) {
    userCostOfUpgrades[currentCost] = storedUserCosts[currentCost];
  }
  updatePageStats();
}

// Functions::

function increaseBeanCount() {
  userStats.beanCount++;
  updateAll();
}
// This increases the cost of the easy upgrade according to the users Beans Per Second rate.
function calculateEasyUpgradeButton() {
  // Short if-statement to make sure the cost doesn't increase too early in the game.
  if (userStats.beansPerSecond > 1) {
    userCostOfUpgrades.easyUpgradeButton =
      baseCostOfUpgrades.easyUpgradeButton * userStats.beansPerSecond;
  }
}
// This handles the simple upgrade::
function getEasyUpgrade() {
  calculateEasyUpgradeButton();

  // makes sure the user can afford the upgrade.
  if (userStats.beanCount > userCostOfUpgrades.easyUpgradeButton - 1) {
    userStats.beanCount =
      userStats.beanCount - userCostOfUpgrades.easyUpgradeButton;
    userStats.beansPerSecond += beansPerUpgrade.easyUpgradeButton;

    // Use of Math.round() to ensure a number with one decimal place.
    userStats.beansPerSecond = Math.round(userStats.beansPerSecond * 10) / 10;
    updateAll();
  }
}
// This handles the Upgrade Zone cost increases
function calculateOtherUpgradeCost(thisUpgrade) {
  // It uses a similar way to increase the cost on each price increase, then rounds it to a sensible number.
  console.log(userCostOfUpgrades[thisUpgrade]);
  userCostOfUpgrades[thisUpgrade] *= 2;
  userCostOfUpgrades[thisUpgrade] =
    Math.round(userCostOfUpgrades[thisUpgrade] * 10) / 10;

  console.log(userCostOfUpgrades[thisUpgrade]);
}
// Higher cost upgrades::
function getUpgrade(name) {
  // This gets the id of the button which has been clicked:
  let thisUpgrade = name.target.id;
  // This applies the button ID to the matching cost in the costOfUpgrades object: costOfUpgrades[thisUpgrade]
  // This checks the user can afford the ugrade and acts appropriately if they can.
  if (userStats.beanCount > userCostOfUpgrades[thisUpgrade] - 1) {
    console.log("You got an upgrade!");
    userStats[thisUpgrade] = userStats[thisUpgrade] + 1;
    userStats.beanCount -= userCostOfUpgrades[thisUpgrade];
    userStats.beansPerSecond += beansPerUpgrade[thisUpgrade];
    // calculate upgrade cost?
    console.log(`You have ${userStats[thisUpgrade]} ${thisUpgrade}s`);
  } else {
    console.log("You can't afford it!");
  }
  calculateOtherUpgradeCost(thisUpgrade);

  updateAll();
}

// Page Updates::
function updatePageStats() {
  // User stats
  beanCounter.textContent = userStats.beanCount.toFixed(0);
  beansPerSecond.textContent = userStats.beansPerSecond.toFixed(1);
  // Upgrade Zone
  usersTrees.textContent = userStats.treeButton;
  usersWorkers.textContent = userStats.workerButton;
  usersTraders.textContent = userStats.traderButton;
  usersFormulas.textContent = userStats.formulaButton;
  // Current easy cost
  currentCost.textContent = userCostOfUpgrades.easyUpgradeButton.toFixed(0);
  // Upgrades Store
  treeCost.textContent = userCostOfUpgrades.treeButton.toFixed(0);
  workerCost.textContent = userCostOfUpgrades.workerButton.toFixed(0);
  traderCost.textContent = userCostOfUpgrades.traderButton.toFixed(0);
  formulaCost.textContent = userCostOfUpgrades.formulaButton.toFixed(0);

  easyCount.textContent = beansPerUpgrade.easyUpgradeButton;
  treeCount.textContent = beansPerUpgrade.treeButton;
  workerCount.textContent = beansPerUpgrade.workerButton;
}

function updateUserStorage() {
  localStorage.setItem("userStats", JSON.stringify(userStats));
  localStorage.setItem(
    "userCostOfUpgrades",
    JSON.stringify(userCostOfUpgrades)
  );
}

function updateButtons() {
  // We loop through the globally declared objects, which relate to upgrades:
  for (const buttonID in buttons) {
    // We set a variable to be the button on the page, thanks to 'document.getElementById'
    const buttonElement = buttons[buttonID];
    // We set a variable to be the cost which matches the key of the current button
    const upgradeCost = userCostOfUpgrades[buttonID];

    // Then we check if the user can afford the current upgrade and set visibility to match
    if (userStats.beanCount > upgradeCost - 1) {
      buttonElement.style.pointerEvents = "auto";
      buttonElement.classList.remove("button-disabled");
    } else {
      buttonElement.style.pointerEvents = "none";
      buttonElement.classList.add("button-disabled");
    }
  }
}

// Easier to call page updates in one functiion
function updateAll() {
  calculateEasyUpgradeButton();
  updatePageStats();
  updateUserStorage();
  updateButtons();
}

function resetUserStats() {
  // A for-loop to reset the userStats object.
  for (let resetUser in userStats) {
    // 'resetThis' is the placeholder for the key in each loop
    userStats[resetUser] = 0;
  }
  // A for-loop to reset the userCostOfUpgrades object.
  for (resetCost in userCostOfUpgrades) {
    userCostOfUpgrades[resetCost] = baseCostOfUpgrades[resetCost];
  }
  updateAll();
}

setInterval(() => {
  userStats.beanCount = userStats.beanCount + userStats.beansPerSecond;
  // more Math.round() to ensure one decimal place.
  userStats.beanCount = Math.round(userStats.beanCount * 10) / 10;
  updateAll();
}, 1000);

// Event listeners::
coffeeButton.addEventListener("click", increaseBeanCount);
buttons.easyUpgradeButton.addEventListener("click", getEasyUpgrade);
treeButton.addEventListener("click", getUpgrade);
workerButton.addEventListener("click", getUpgrade);
traderButton.addEventListener("click", getUpgrade);
formulaButton.addEventListener("click", getUpgrade);
resetButton.addEventListener("click", resetUserStats);
