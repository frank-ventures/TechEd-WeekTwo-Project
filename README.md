# Week Two Project

## Project- Cookie Clicker style game!

Creating an interactive web page experience was this weeks direction, and I themed mine around coffee and caffeine.

There were three main sections to the project this week:

- The 'cookie' to click
- An incremental counter which saved locally
- Optional upgrades in a shop

Beyond that were some extra additions:

- Animations
- Personal styling
- More complex upgrades

I kept track of my thoughts and tasks here: https://frankjs.notion.site/Day-Nine-9c5ea40fad3e4b31aaacca0253e92175

### Features!

- Balanced gameplay, generous amounts of math checks to ensure steady progress.
- Responsive buttons
- Live counters
- Game reset
- Feelings of Hygge thanks to soft, cosy imagery...

### What went well

Getting the initial JavaScript code to work didn't take long thanks to the lessons and practice from this week.

I was really pleased with how the counters saved and loaded in and out of local storage, and that the counter reset worked very simply.

I spent some time on balancing the game by adjusting the basic 'beans per second upgrade' function and got things working how I intended.

I was pleased to get some checks working to make sure the user couldn't:

- Spend when they didn't have 'beans'
- Allow their bean count to go below 0

### Sticky points

Figuring out the math and logic flow of the checks took some time, but 'rubber ducking' my way through, and using trial-and-error got the right solutions in place.

## Further Detail

### Resources

For icons - www.flaticon.com
For images - www.unsplash.com/

### A Simple Start

I started with a very basic page, with very little UI aesthetics! This allowed me to focus on the JS code.

I kept my basic JS code easy-to-read, naming the buttons and functions very plainly. This allowed me to follow the trail of execution after a 'button press'.

Using a little CSS let me visually seperate the page.

I realised that loading the User Stats on page load could probably be done as a "for loop" for an object, but decided this would be a stretch implementation.

### Developing the style

I went for a theme of a cosy coffee shop for some of the page elements.

I grabbed stock images of wood from Unsplash for the backgrounds.

I utilised shared CSS classes to repeat theming across the page.

I started to use icons instead of buttons to operate the JavaScript.

### Extra parts

I laid the structure in HTML and CSS for purchaseable 'upgrades'.

These will affect the 'coffee beans per second' the user gains.

**Reducing the beans per second**

I changed the way the "beans per second increase" function worked, so as to balance the game. I changed it from "1 bps" to "0.2" bps.

This however brought in a bug where occasionally the number displayed would be 15 decimal places long! I needed it to only be as long as one decimal place.

I fixed this by using a "Math.round" formula;
userStats.beansPerSecond = Math.round(userStats.beansPerSecond \* 10) / 10;
Which I discovered here: https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript
and also appending ".toFixed(x)" to the stats displayed on the page. These only needed to be strings as the JS didn't rely on them, but, they needed to be displayed as user-friendly numbers!

**Increasing the cost of easy upgrades**

The game was way too easy! "Just click this button to increase your 'beans per second' rate!"

That simply wouldn't do.

I created a new variable in the 'userStats' object called "userUpgradeCost", and a global "baseUpgradeCost".

Then, a function called "calculateUpgradeCost" which dynamically changed the cost of the upgrade button depending on the users current 'bps' rate. I had to spend a little time here to figure out the right math to use.

Finally, I amended the "getUpgrade" function to use this new cost, and checked if the user could afford an "easy" upgrade!
