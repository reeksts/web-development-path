'use strict';

// Data needed for a later exercise

const weekdayss = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const openingHours = {
  // ES6 improvement - property names can be computed
    [weekdayss[3]]: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  // this function takes an object as an argument and does destructuring-
  orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
    console.log('---------------------------------------------------------------')
    console.log(starterIndex);
    console.log(mainIndex);
    console.log(time);
    console.log(address);
    console.log('---------------------------------------------------------------')
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log('your ingredients:')
    console.log(ing1, ing2, ing3)
  },

  // ES6 improvement - no need to write the function() any more
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  // ES6 enhanced object literals (no more openingHours: openingHours)
  openingHours,

};

// *********************************************************************************************************************
// ************************************* DESTRUCTURING OBJECTS *********************************************************
// *********************************************************************************************************************

// extracting values:
const {name, openingHours: openingHour, categories} = restaurant;
console.log(name, openingHours, categories);

// renaming extracted values:
const {name: restaurantName, openingHour: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

// assigning default values if value is not found:
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

// Mutating variables
let e = 111;
let f = 999;
console.log(e, f);
const obj = {e: 23, f: 7, g: 14};
// need to wrap everything into parenthesis otherwise this is trying to assign to a code block
({e, f} = obj);
console.log(e, f);

// destructuring nested objects and assigning new names and giving default
const {fri: {open: op = 8, close: cl = 22}} = openingHour;
console.log(op, cl);

restaurant.orderDelivery({time: '22:30', address: 'Via del Sole, 21', mainIndex: 2, starterIndex: 2})

// *********************************************************************************************************************
// ************************************* DESTRUCTURING ARRAYS **********************************************************
// *********************************************************************************************************************

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destructuring assignment:
const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// swapping variables:
//const temp = main;
//main = secondary;
//secondary = temp;
//console.log(main, secondary);

// swapping with destructuring arrays:
[main, secondary] = [secondary, main]
console.log(main, secondary);


const stuff = restaurant.order(2, 0)
console.log(stuff)
const [starterFood, mainFood] = restaurant.order(2, 0)
console.log(starterFood, mainFood);

// Nested destructuring
const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;
//console.log(i, j);
const [i, , [j, k]] = nested
console.log(i, j, k);

// Default values if one is not found in the
const [p=1, q=1, r=1] = [8, 9]
console.log(p, q, r);
console.log(nested[5])

// *********************************************************************************************************************
// ************************************* SPREAD OPERATOR ***************************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------')
console.log('-----------------------SPREAD OPERATOR-------------------------')
console.log('---------------------------------------------------------------')
const arr1 = [7, 8, 9]
// spreading into new array:
const newArray = [1, 2, ...arr1]
console.log(newArray)

// logging individual operators:
console.log(...newArray)

// this creates completely new array with spread operator
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu)

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays or more
const menuuu = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menuuu)

// Spread operator works on all iterables:
// Iterables: arrays, strings, maps, set.

const strstr = 'karlis';
const letters = [...strstr, 'S']
console.log(letters)
console.log(...strstr)
console.log([...strstr].length)

console.log('before loop')
for (let i = 0; i < [...strstr].length; i++) {
  console.log('yooo')
  console.log(strstr[i])
}
console.log('after loop')

//const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')]
//restaurant.orderPasta(...ingredients)

// Objects can also be spread to for example make a new object
const newRestaurant = {...restaurant, founder: 'Guiseppe'}
console.log(newRestaurant)

// this makes a shallow copy:
const restaurantCopy = {...restaurant}


// *********************************************************************************************************************
// ************************************* REST PATTERN ******************************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------')
console.log('-----------------------REST PATTERN----------------------------')
console.log('---------------------------------------------------------------')

// REST is on the left hand side of the assignment operator.
// SPREAD is on the right side of the assignment operator.
const [aa, bb, ...oth] = [1, 2, 3, 4, 5]
console.log(oth)

// this is very similar to python,
// rest has to be the last and only one!
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood)

const {sat, ...weekdays} = restaurant.openingHours
console.log(sat)
console.log(weekdays)

// rest operator in functions:
const adding = function (...numbers) {
  let sum = 0;
  for (let i = 0; i<numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

adding(2,);
adding(2, 3);
adding(2, 3, 4);
adding(2, 3, 4, 5);

const xx = [23, 5, 7];
adding(...xx);

restaurant.orderPizza('mushrooms', 'onions', 'olives')


// *********************************************************************************************************************
// ************************************* SHORT CIRCUITING (&& and ||) ***************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------')
console.log('----------------SHORT CIRCUITING (&& and ||)-------------------')
console.log('---------------------------------------------------------------')

// use any data type, return any dat type, short-circuit evaluation

console.log('---- || ----')

//short-circuiting - if the first value is truthy value, then it will immediately be returned!
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // hello is the first truthy value!

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1)

// problem when the actual number is 0;
restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10
console.log(`guests2: ${guests2}`)

// Nullish coalescing operator:
// Nullish values: null and undefined (Not 0 or '')
// Only nullish values would short-circuit the evaluation with ??
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(`guestsCorrect: ${guestsCorrect}`)

console.log('---- && ----');
// basically this will return teh first falsy value or last if all ar truthy

console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log(7 && 'Jonas' && null && 10);

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinache')
}

// if teh first value if falsy, then it will terminate that evaluation
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinache')


// *********************************************************************************************************************
// ************************************* LOGICAL ASSIGNMENT OPERATORS **************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------')
console.log('----------------LOGICAL ASSIGNMENT OPERATORS-------------------')
console.log('---------------------------------------------------------------')

const rest1 = {
  name: 'Capri',
  numGuests: 20,
}

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
}

// rest1.numGuests = rest1.numGuests || 10  // here is a short-circuiting
// rest2.numGuests = rest2.numGuests || 10

// OR assignment operator
rest1.numGuests ||= 10
rest2.numGuests ||= 10
console.log(rest1)
console.log(rest2)

// OR assignment operator - here is the problem again with 0 value!
rest1.numGuests = 0
rest1.numGuests ||= 10
console.log(rest1)

// LOGICAL NULLISH assignment operator - fixes teh problem with 0
rest1.numGuests = 0
rest1.numGuests ??= 10
console.log(rest1)

rest1.owner = rest1.owner && '<ANONYMOUS>' // short-circuits on the first value
console.log(rest1.owner)
rest2.owner = rest2.owner && '<ANONYMOUS>'  // short-circuits on the second value
console.log(rest2.owner)

// LOGICAL AND assignment operator
// assigns the value if it is currently truthy
rest1.owner &&= '<ANONYMOUS>'
rest2.owner &&= '<ANONYMOUS>'
console.log(rest1.owner)
console.log(rest2.owner)


// *********************************************************************************************************************
// ************************************* CODING CHALLENEGE #1 **********************************************************
// *********************************************************************************************************************

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function(...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(`${players[i]}: ${this.score}`)
  }
}
};

// #1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// #2
const [gk1, ...fieldplayers1] = players1
const [gk2, ...fieldplayers2] = players2
console.log(gk1, fieldplayers1);
console.log(gk2, fieldplayers2);

// #3
const allPLayers = [...players1, ...players2];
console.log(allPLayers);

// #4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// #5
const {odds: {team1, x: draw, team2}} = game
console.log(team1, draw, team2);

// #6
game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
game.printGoals(...game.scored);

// #7
team1 < team2 && console.log('Team 1 is more likely to win!')
team1 > team2 && console.log('Team 2 is more likely to win!')


// *********************************************************************************************************************
// ********************************************** For-of loop **********************************************************
// *********************************************************************************************************************

const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// continue and break keywords work in the for-of loop
for (const item of menu1) {
  console.log(item);
}

for (const [i, el] of menu1.entries()) {
  console.log(i);
  console.log(el);
}


// *********************************************************************************************************************
// ********************************************** Enhanced Object Literals *********************************************
// *********************************************************************************************************************

// See the ES6 change comments in the main dataset

// *********************************************************************************************************************
// ********************************************** Enhanced Object Literals *********************************************
// *********************************************************************************************************************

// optional chaining:
// exists here means if it is not nullish (nullish is null or undefined)
console.log(restaurant.openingHours?.mon?.open)

const somedays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

for (const day of somedays) {
  const open = restaurant.openingHours[day]?.open ?? 'close'
  console.log(`On ${day}, we open at ${open}`)
}

// methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist')

//arrays
// check if the value exist
const users = [
  {name: 'jonas'}
]

console.log(users[1]?.name ?? 'User array empty ')


// *********************************************************************************************************************
// ************************************* Looping objects: keys, values, entries ****************************************
// *********************************************************************************************************************

// keys
let openStr = `We are open on: `
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `
  console.log(day)
}
console.log(openStr)

// values
for (const val of Object.values(openingHours)) {
  console.log(val)
}

// entries
for (const [day, val] of Object.entries(openingHours)) {
  console.log(day)
  console.log(val)
}

// *********************************************************************************************************************
// ************************************* CODING CHALLENEGE #2 **********************************************************
// *********************************************************************************************************************

// #1: (my)
for (const [item, player] of game.scored.entries()) {
  console.log(`Goal ${item + 1}: player`);
}

// #2: (my)
let avgOdd = 0;
for (const value of Object.values(game.odds)) {
  avgOdd += value;
}
avgOdd /= Object.values(game.odds).length;
console.log(avgOdd);

// #3: (my)
for (const [key, value] of Object.entries(game.odds)) {
  if (key !== 'x') {
    console.log(`Odd of victory: ${game[key]}: ${value}`);
  } else {
    console.log(`Odd of draw: ${value}`);
  }
}

// BONUS

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// *********************************************************************************************************************
// ***************************************************** SETS **********************************************************
// *********************************************************************************************************************

const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'])
console.log(ordersSet)

// this also works..
console.log(new Set('Karlis'))

// size not length
console.log(ordersSet.size)

// check if element exist
console.log(ordersSet.has('Pizza'))

// add element:
ordersSet.add('Garlic bread')
console.log(ordersSet)

// delete element
ordersSet.delete('Risotto')
console.log(ordersSet)

// however set sdo not have indexing/ not supposed to get values out
// but you can still get them out with a for loop
for (const stuff of ordersSet) {
  console.log(stuff);
}

// delete all elements
//ordersSet.clear()

// set can be converted back to array
// spread opeartor works because Set is also an iterable
const newArrayy = [...new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'])];
console.log(newArrayy);

// *********************************************************************************************************************
// ******************************************* MAPS: fundamentals ******************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------')
console.log('----------------------MAPS: fundamentals-----------------------')
console.log('---------------------------------------------------------------')

const rest = new Map();

// set method also returns the updated map - this allows to chain it
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy').set(2, 'Lisbon, Portuga');
console.log(rest)
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :(')
console.log(rest);

// get method to read data from map
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// has method - to check if has a certain key
console.log(rest.has('categories'));

// delete method
rest.delete(2);
console.log(rest);

// size property
console.log(rest.size)

// clear method
// console.log(rest.clear)

rest.set([1, 2], 'Test');
console.log(rest)

// getting data if key is array:
// this below won't work, because it is not the same array
console.log(rest.get([1, 2]))

const someArr = [1, 2]
rest.set(someArr, 'test')
console.log(rest.get(someArr))

rest.set(document.querySelector('h1'), 'heading')
console.log(rest)

// another way to populate a Map with an array
const questions = new Map([['question', 'What is the best programming languege in the world'],
[1, 'C'],
[2, 'Java'],
[3, 'JavaScript'],
['correct', 3],
[true, 'Correct'],
[false, 'Wrong, try again']])
console.log(questions)

//convert objects to maps
const hoursMap = new Map(Object.entries(openingHours))
console.log(hoursMap)

// iteration on maps:
console.log(questions.get('question'))
for (const [key, value] of questions) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key}: ${value}`)
  }
}
//const answer = Number(prompt('What is your answer?'))
//console.log(questions.get(questions.get('correct') === answer))

//Convert Map to Array:
console.log(...questions)

const randomMap = new Map([[[1, 2], 12], [[3, 4], 15] ])
console.log(randomMap)
const unpacked = [...randomMap]
console.log(unpacked)

// *********************************************************************************************************************
// ************************************* CODING CHALLENEGE #3 **********************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('--------------------CODING CHALLENEGE #3-----------------------');
console.log('---------------------------------------------------------------');

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// #1 (my)
console.log('----------------------------------')
const eventsSet = new Set();
const eventsArr = [];
for (const [key, value] of gameEvents) {
  eventsSet.add(value);
  if (!eventsArr.includes(value)) {
    eventsArr.push(value);
  }
}
console.log(eventsSet);
console.log(eventsArr);

// #1 (course)
console.log('----------------------------------')
console.log([...new Set(gameEvents.values())])

// #2 (my)
console.log('----------------------------------')
gameEvents.delete(64);
console.log(gameEvents);

// #3 (my)
console.log('----------------------------------')
const calcAvgEvent = function() {
  let lastTime = 0;
  let totalDiffs = 0;
  for (const [time, ] of gameEvents) {
    totalDiffs += (time - lastTime);
    lastTime = time;
  }
  return totalDiffs / gameEvents.size;
}

const avgEventTime = calcAvgEvent();
console.log(`An event happened, on average, every ${avgEventTime} minutes`);

// #3 (course)
console.log('----------------------------------')
console.log(`An event happened, on average, every ${[...gameEvents.keys()].pop() / gameEvents.size} minutes`);

// #4 (my)
console.log('----------------------------------')
for (const [key, val] of gameEvents) {
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${val}`)
  } else {
    console.log(`[SECOND HALF] ${key}: ${val}`)
  }
}


// #4 (course)
console.log('----------------------------------')
for (const [key, val] of gameEvents) {
  const half = key <= 45 ? 'FIRST' : 'SECOND'
  console.log(`[${half} HALF] ${key}: ${val}`)
}


// *********************************************************************************************************************
// ************************************* WORKING WITH STRINGS - PART #1 ************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('---------------WORKING WITH STRINGS - PART #1------------------');
console.log('---------------------------------------------------------------');

const airline = 'TAP Air Portugal';
const plane = 'A320';

//individual element
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//length of strings
console.log(plane.length);

// indexOf method
console.log(airline.indexOf('r'));
console.log(airline.indexOf('Portugal'), 'Portugal'); // returns the index where it starts
console.log(airline.indexOf('portugal'), 'portugal'); // returns -1 because did not find

// lastIndexOf method
console.log(airline.lastIndexOf('r'));

// slice - index from where to start slicing
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));
console.log(airline.slice(-2));

const checkMiddleSeat = function(seat) {
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat!')
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23B');
checkMiddleSeat('3E');

// this is how strings become objects, so they could have methods
console.log(new String('karlis'));
console.log(typeof new String('karlis'));


// *********************************************************************************************************************
// ************************************* WORKING WITH STRINGS - PART #2 ************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('---------------WORKING WITH STRINGS - PART #2------------------');
console.log('---------------------------------------------------------------');

// changing to lowercase
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalization in passenger name
const passenger = 'KaRliS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
// in one step:
console.log(loginEmail.toLowerCase().trim());
console.log(email === trimmedEmail);

// replacing part
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passenger come to boarding door 23. Boarding door 23.';
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.includes('Boeing'));
console.log(plane1.startsWith('Air'));

if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}
console.log('----------------------------------')
const checkBaggage = function(items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board!')
  } else {
    console.log('Welcome aboard!')
  }
}

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and gun for protection');


// *********************************************************************************************************************
// ************************************* WORKING WITH STRINGS - PART #3 ************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('---------------WORKING WITH STRINGS - PART #3------------------');
console.log('---------------------------------------------------------------');


// split
console.log('a+very+nice+string'.split('+'));
console.log('a very nice string'.split(' '));

const [fName, lName] = 'Karlis Rieksts'.split(' ')
console.log(fName, lName)

// join
console.log(['Mr.', fName, lName.toUpperCase()].join(' '))

const capitalizeName = function(name) {
  const names = name.split(' ')
  let namesUpper = []
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1))
  }
  console.log(namesUpper.join(' '))
}

capitalizeName('jessica ann smith davis');
capitalizeName('karlis rieksts')

const myName = 'karlis'
console.log(myName[0].toUpperCase() + myName.slice(1))

// padding
const message = 'Go to gate 23!'
console.log(message.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function(number) {
  // this converts to string - alternative for String()
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*')
}

console.log(maskCreditCard(7887373793936565));
console.log(maskCreditCard('7887373793936565'));
console.log(maskCreditCard(22222));

// Repeat
const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function(n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
}

planesInLine(5);
planesInLine(100);


// *********************************************************************************************************************
// ************************************* CODING CHALLENEGE #4 **********************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('--------------------CODING CHALLENEGE #4-----------------------');
console.log('---------------------------------------------------------------');

const toCamelCase = function(name) {
    const splitted = name.toLowerCase().trim().split('_')
    return splitted[0] + splitted[1][0].toUpperCase()+splitted[1].slice(1)
}

console.log(toCamelCase('underscore_case'));
console.log(toCamelCase(' first_name'));
console.log(toCamelCase('Some_Variable'));
console.log(toCamelCase('  calculate_AGE'));
console.log(toCamelCase('delayed_departure'));

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const splitted = text.split('\n');
  for (const [val, name] of splitted.entries()) {
    console.log(toCamelCase(name).padEnd(20), `${'✅'.repeat(val + 1)}`);
  }
})

// *********************************************************************************************************************
// ********************************** STRING METHODS PRACTICE **********************************************************
// *********************************************************************************************************************

console.log('---------------------------------------------------------------');
console.log('-------------------STRING METHODS PRACTICE---------------------');
console.log('---------------------------------------------------------------');

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightsInfo = function(info) {
  const rows = info.split('+');

  const getCode = str => str.slice(0,3).toUpperCase()

  for (const row of rows) {
    const [type, from, to, time] = row.split(';');
    const printStr = `${type.startsWith('_Delayed') ? '❗' : ''}${type.replaceAll('_', ' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(50);
    console.log(printStr);
  }
}

flightsInfo(flights);