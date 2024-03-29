// variables
// --Buttons
const coffeeButton = document.getElementById("coffeeButton");
const upgradeButton = document.getElementById("upgradeButton");
const resetButton = document.getElementById("resetButton");
// --Page Display
const beanCounter = document.getElementById("beanCounter");
const beansPerSecond = document.getElementById("beansPerSecond");
const currentCost = document.getElementById("currentCost");
//  --Set the User Stats Object
const userStats = {
  beanCount: 0,
  beansPerSecond: 0,
  userUpgradeCost: 5,
};

const baseUpgradeCost = 5;

// Runs once on page load to check if a user has locally stored stats, then updates the live stats to match.
const storedUserStats = JSON.parse(localStorage.getItem("userStats"));

if (storedUserStats) {
  // I will bring in a 'for loop' later, once I understand how to implement it, to update the object.
  //   for (let key in storedUserStats) {
  //     if (storedUserStats.hasOwnProperty(key)) {
  //       const element = object[key];
  //     }
  //   }
  userStats.beanCount = storedUserStats.beanCount;
  userStats.beansPerSecond = storedUserStats.beansPerSecond;
  userStats.userUpgradeCost = storedUserStats.userUpgradeCost;

  updatePageStats();
}

// functions
function increaseBeanCount() {
  userStats.beanCount++;
  updatePageStats();
  updateUserStorage();
}

function calculateUpgradeCost() {
  // Short if-statement to make sure the cost doesn't increase too early in the game.
  if (userStats.beansPerSecond > 1) {
    userStats.userUpgradeCost = baseUpgradeCost * userStats.beansPerSecond;
  }
}

function getEasyUpgrade() {
  calculateUpgradeCost();

  // makes sure the user can afford the upgrade.
  if (userStats.beanCount > userStats.userUpgradeCost - 1) {
    userStats.beanCount = userStats.beanCount - userStats.userUpgradeCost;
    userStats.beansPerSecond += 0.2;

    // Use of Math.round() to ensure a number with one decimal place.
    userStats.beansPerSecond = Math.round(userStats.beansPerSecond * 10) / 10;

    updatePageStats();
    updateUserStorage();
  }
}

function updatePageStats() {
  beanCounter.textContent = userStats.beanCount.toFixed(0);
  beansPerSecond.textContent = userStats.beansPerSecond.toFixed(1);
  currentCost.textContent = userStats.userUpgradeCost.toFixed(0);
}

function updateUserStorage() {
  localStorage.setItem("userStats", JSON.stringify(userStats));
}

function resetUserStats() {
  userStats.beanCount = 0;
  userStats.beansPerSecond = 0;
  userStats.userUpgradeCost = 5;
  updatePageStats();
  updateUserStorage();
}

setInterval(() => {
  userStats.beanCount = userStats.beanCount + userStats.beansPerSecond;
  // more Math.round() to ensure one decimal place.
  userStats.beanCount = Math.round(userStats.beanCount * 10) / 10;

  updatePageStats();
  updateUserStorage();
}, 1000);

// event listeners
coffeeButton.addEventListener("click", increaseBeanCount);
upgradeButton.addEventListener("click", getEasyUpgrade);
resetButton.addEventListener("click", resetUserStats);
