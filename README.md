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
- Pointless upgrades to aim for!
- Functions and loops aplenty!

### What went well

Getting the initial JavaScript code to work didn't take long thanks to the lessons and practice from this week.

I was really pleased with how the counters saved and loaded in and out of local storage, and that the counter reset worked very simply.

I spent some time on balancing the game by adjusting the basic 'beans per second upgrade' function and got things working how I intended.

I was pleased to get some checks working to make sure the user couldn't:

- Spend when they didn't have 'beans'
- Allow their bean count to go below 0

### Sticky points

Figuring out the math and logic flow of the checks took some time, especially figuring out the 'decimal point' problem, and how to display the numbers I wanted on that page.
'Rubber ducking' my way through, and using trial-and-error got the right solutions in place.

Finding out how to get the information I needed from an object, and also how to link information between objects, took a lot of reading and experimentation.
I eventually realised the keys within my objects needed to be exactly the same, and I discovered the correct syntax for ym 'for-loops' through using a lot of "console.log"s!

### Future Improvements

I'm sure I could make my code tidier and more efficient by including loops for how I've declared some of my variables and how I change text in 'updatePageStats'.

While it works for now, I think I could consolidate some of my objects into one, by having the 'Upgrades' information together like, "ID, Cost, beans-per-second" all in one. I'd imagine this would involve using different for-loops.
Doing this would make future additions slightly easier to implement, by creating one new object in an array, rather than madifying three objects with values for a new 'upgrade'

I wanted to find a way to add a "Caffeine Jitter" to the page, the more beans the user collects.

An options menu, to toggle things like "Caffeine Jitter" and "Sound Effects".

## Further Detail

### Resources

For icons - www.flaticon.com
For images - www.unsplash.com

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

I laid the structure in HTML and CSS for purchaseable 'upgrades' which would later affect the 'coffee beans per second' the user gains.

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

**Enabling/Disabling the Upgrade Buttons**

I created an object called 'buttons' which stored the 'Upgrade Buttons'.
I matched their costs and beans-per-second values in separate objects titled, 'userCostOfUpgrades' and 'beansPerUpgrade'.
I kept 'userCostOfUpgrades' seperate so that I could scale the cost as the user bought more, but also so I could reset the values.

I wrote a function called 'updateButtons' which would loop through 'buttons', find their associated cost, check if the user had enough "beans" to afford the upgrade, then set their 'disabled' attribute to true or false.
https://stackoverflow.com/questions/22456641/disable-non-clickable-an-html-button-in-javascript
https://www.w3schools.com/jsref/prop_reset_disabled.asp

I realised this didn't/wouldn't work for when I'm using 'images' as buttons, so I found a solution here:
https://stackoverflow.com/questions/35187239/disable-or-enable-an-html5-image-with-javascript
And then used ".classList.remove()" / ".classList.add()" to make it clear to the user if the button was enabled or not.

**Adding Upgrades!**

Following the theme of being "the worlds best coffee bean collector", I added four upgrades.
I already had the groundwork for how these would operate:

- Costing 'beans'
- Increasing the 'beans per second' rate
- Increasing in cost on each purchase
- Showing how many upgrades you had on the page

I had to refactor my code a bit by creating a few new objects, moving the existing 'upgrade' into the new objects, then adding new functions to support the upgrades.

It also meant modifying the 'resetUserStats' function to loop through both the 'userStats' and 'userCostOfUpgrades' objects to properly reset to zero.

**Style and Piz-zazz**

Next up: Icons, animations and sound effects!

I got some icons to create a game theme from FlatIcon.

I added a floating animation to the starter buttons with help from here:
https://www.w3schools.com/css/css3_animations.asp
But more clearly from here:
https://fdossena.com/?p=html5cool/clickfx/i.frag

Plus some audio effects on clicks:
https://dev.to/shantanu_jana/how-to-play-sound-on-button-click-in-javascript-3m48
with sounds from here:
www.pixabay.com

I created a new object containing links to the sound effects, match to the Upgrade ID's to easily add the "sound.play()" function to the "getUpgrade()" function I already had.

I added audio to the page with play and pause icons for the user to interact with.
