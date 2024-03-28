// variables
// --Buttons
const coffeeButton = document.getElementById("coffeeButton");
const upgradeButton = document.getElementById("upgradeButton");
// --Page Display
const beanCounter = document.getElementById("beanCounter");
const beansPerSecond = document.getElementById("beansPerSecond");
//  --User Stats Object
const userStats = {
  beanCount: 0,
  beansPerSecond: 0,
};

// functions
function increaseBeanCount() {
  userStats.beanCount++;
  console.log(userStats.beanCount);
}

// event listeners
coffeeButton.addEventListener("click", increaseBeanCount);
upgradeButton.addEventListener("click", getUpgrade);
