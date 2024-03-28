// variables
// --Buttons
const coffeeButton = document.getElementById("coffeeButton");
const upgradeButton = document.getElementById("upgradeButton");
const resetButton = document.getElementById("resetButton");
// --Page Display
const beanCounter = document.getElementById("beanCounter");
const beansPerSecond = document.getElementById("beansPerSecond");
//  --Set the User Stats Object
const userStats = {
  beanCount: 0,
  beansPerSecond: 0,
};

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

  updatePageStats();
}

// functions
function increaseBeanCount() {
  userStats.beanCount++;
  updatePageStats();
  updateUserStorage();
}

function getUpgrade() {
  userStats.beanCount--;
  userStats.beansPerSecond++;
  updatePageStats();
  updateUserStorage();
}

function updatePageStats() {
  beanCounter.textContent = userStats.beanCount;
  beansPerSecond.textContent = userStats.beansPerSecond;
}

function updateUserStorage() {
  localStorage.setItem("userStats", JSON.stringify(userStats));
}

function resetUserStats() {
  userStats.beanCount = 0;
  userStats.beansPerSecond = 0;
  updatePageStats();
  updateUserStorage();
}

setInterval(() => {
  userStats.beanCount = userStats.beanCount + userStats.beansPerSecond;
  updatePageStats();
  updateUserStorage();
}, 1000);

// event listeners
coffeeButton.addEventListener("click", increaseBeanCount);
upgradeButton.addEventListener("click", getUpgrade);
resetButton.addEventListener("click", resetUserStats);
