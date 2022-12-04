'use strict';

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive')

// const interface = 'Audio';
// const private = 444;

 function logger() {
    console.log('My name is Karlis');
 }

// calling running or invoking the function
logger();
logger();
logger();

// it is legit to pass arguments that are not defined in the fucntion parameters
logger(12, 12, 12, 12, 12)

// function declaration
// function can be called before declaration
function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges!`;
    return juice;
}

const returned = fruitProcessor(10, 10);
console.log(returned);

const juice2 = fruitProcessor(20, 20);
console.log(juice2);

function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const aeg1 = calcAge1(1991);
console.log(aeg1)

// Function expression
// funciton cannot be called before declaration
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const age2 = calcAge2(1992)
console.log(age2)

const calcAge = birthYear => 2037 - birthYear;
console.log(calcAge(1993));

const yearsUntilRetirement = (birtYear, firstName) => {
    const age = 2037 - birtYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`
}

console.log(yearsUntilRetirement(1991, 'Koko'))

function func2 (a) {
    return a + 2
}

function func1 (a, b) {
   return func2(a) + 2 + b
}

const outers = func1(2, 2)
console.log(outers)

function func3(a) {
    return a;
}

const func4 = (a, b) => {
    return (a + b)
}

const func5 = function(b) {
    return b
}

console.log(func3(3))
console.log(func4(3, 3))
console.log(func5(4))

// ===============================================================
// ------------------------- ARRAYS ------------------------------
// ===============================================================

const friends = ['fello1', 'fello2', 'fello3']
console.log(friends)

const years = new Array(91, 92, '93')
console.log(years)
console.log(years[2])
console.log(years[years.length-1])
console.log(years.length)
friends[1] = 'papa'
console.log(friends)

// .push() - returns new length
friends.push('kaak')
console.log(friends)

const newLength = friends.push('akka')
console.log(friends)
console.log(newLength)

// .unshift() - add to beginning, returns new length
friends.unshift('kjkds')
console.log(friends)

// .pop() 0 removes
friends.pop()
console.log(friends)

// .shift() - removes from beginning, returns the element
friends.shift()
console.log(friends)

// .indexOf() - gives index of the element
console.log(friends.indexOf('papa'))

// .includes() - returns bool if exist or not
console.log(friends.includes('papa'))
console.log(friends.includes('sds'))

const a = (b, c) => b <= 1 && c >= 2 || b*c === 2 && b/c !== 3 ? b**2 : b*c;


// ===============================================================
// ------------------------- OBJECTS -----------------------------
// ===============================================================

const jonas = {
    'first': friends,
    'second': 12,
    'third': 12,
    'fourth': 12,
};

console.log(jonas)

console.log(jonas.first)
console.log(jonas['first'])
console.log(jonas['sec'+'ond'])

/*
const option = prompt('Which option:')
console.log(jonas[option])
*/

jonas.location = 'value'
console.log(jonas)
jonas['another'] = 'value'
console.log(jonas)
console.log(jonas.first.length)
console.log(jonas.first[1])

const kokas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense:  false,
    // calcAge: function(birthYear) {
    //     return 2037 - birthYear;
    // }
    // calcAge: function() {
    //     console.log(this)
    //     return 2037 - this.birthYear;
    // },
    calcAge: function() {
        this.age = 2037 - this.birthYear;
        return  this.age;
    },

    getSummary: function() {
        return `${this.firstName} ${this.lastName} is ${this.calcAge()} years old
        and is ${this.job} and he has ${this.hasDriversLicense ? 'drivers license' : 'not drivers license'}`
    }
};

console.log(kokas.getSummary())
console.log(kokas.getSummary())

console.log(kokas.calcAge(1991));
console.log(kokas.calcAge(kokas.birthYear));
console.log(kokas.thisthis);

const stuff = {
    stuff: this
}
console.log(stuff.stuff)

console.log(kokas.age)

const stuffy = {
    stuff1: 12,
    stuff2: function() {
        this.agy = this.stuff1 + 12;
        return this.agy;
    }
}
stuffy.stuff2();

console.log(stuffy.agy);


// ===============================================================
// ------------------------- FOR LOOP ----------------------------
// ===============================================================

for(let i = 1; i <= 10; i++) {
    console.log(`this is number ${i}`)
}

const friends1 = [true, 'fello2', [1, 2], 46, 'another string']

const newstuff = []
for(let i = 0; i < friends1.length; i++) {
    console.log(friends1[i], typeof friends1[i]);
    newstuff[i] = typeof friends1[i];
}

console.log(newstuff)

// continue option
for(let i = 0; i < friends1.length; i++) {
    if(typeof friends1[i] !== 'string') continue;
    console.log(friends1[i]);
}

// break option
for(let i = 0; i < friends1.length; i++) {
    if(typeof friends1[i] === 'number') break;
    console.log(friends1[i]);
}

// looping backwards
console.log("below this the array is looped through backwards:")
for(let i = friends1.length -1; i >= 0; i--) {
    console.log(friends1[i]);
}

// nested loop

for(let i = 1; i <= 3; i++) {
    for(let j = 1; j <= 3; j++) {
        console.log(`i = ${i}; j = ${j}`)
    }
}

// ===============================================================
// ------------------------ WHILE LOOP ---------------------------
// ===============================================================

let rep = 1;
while (rep <= 10) {
    console.log(`Lifting weights repetition: ${rep}`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1
console.log(dice)

let store_count = 0;
for (let i = 0; i <= 100; i++) {
    const number = Math.trunc(Math.random() * 6);
    if (number === 5) {
        store_count += 1
    }
}

console.log(store_count)

while (dice !== 6) {
    console.log(`You rolled a ${dice}`)
    dice = Math.trunc(Math.random() * 6) + 1
    if (dice === 6) console.log('Loop is about to end...')
}



// Coding challenge #1

const myarr = [9, 20, 12, 14, 10];

const printForecats = function (arr) {
    let str = '...';
    for (let i = 0; i < arr.length; i++) {
        str += ` ${arr[i]}°C in ${i + 1} days ...`;
    }
    console.log(str)
}

printForecats(myarr)
