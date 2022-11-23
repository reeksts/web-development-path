// -------- Practice assignments -----------

let js = 'amazing';
console.log(2 + 2);

let firstName = "Jonas"
console.log(firstName)

stuff = 2
console.log(stuff)



// -------- Data types -----------



// This is comment

/*
multiline comment
 */

console.log(true)

let stuff2 = true
console.log(stuff2)

console.log(typeof true)
console.log(typeof "ssfdfd")
console.log(typeof 121212)

let year;
console.log(year)
console.log(typeof year)

console.log(typeof null) //this has a bug

// -------- let, const and var -----------

let age = 30;
age = 31;

let height;
height = 100;

const birthYear = 1991;

// old way of defining variables:
var toto = 20;
toto = 10;


// -------- Basic operators -----------

const now = 2037;
const ageJonah = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonah, ageSarah)

console.log(ageJonah * 2, ageJonah/2, 2**3)

const oneName = 'first';
const twoName = 'last';
console.log(oneName, ' ', twoName);

let x = 10;
x += 5;
x *= 3;
x++;
x--;
console.log(x)

console.log(2 < 4)
console.log(4 < 2)
console.log(2 <= 2)

let a, b;
a = b = 20 - 10 - 5
console.log(a, b)

// -------- Strings and Template literals -----------

const fname = 'Karlis';
const job = 'programer';
const bYear = 1989;
const cYear = 2022;

const karlis = "I'm " + fname + ", a " + (cYear - bYear) +
    " years old " + job + "!";
console.log(karlis);

const karlisNew = `I'm ${fname}, a ${cYear - bYear} years old ${job}!`;
console.log(karlisNew);

console.log(`This
is
multiline
string`);

console.log("This \n\
is \n\
multiline \n\
string");

// -------- If/else statements -----------

age = 15;
const isOldEnough = age >= 18;

if(isOldEnough) {
  console.log('Sarah can start driving license 🐱‍💻');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is not old enough, still ${yearsLeft} years left`)
}

const bbYear = 1991;
let century;
if(bbYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century)

const longNumber = 2.623846872648736
console.log(`This number: ${longNumber} is ronded two 2 decimals ${longNumber.toFixed(2)}`)


// -------- Type conversion and coercion -----------

// type conversion
const inputYear = "1991";
console.log(Number(inputYear) - 19);
console.log(inputYear);

console.log(String(23));

// type coercion
console.log('');
console.log('23' - '10' - '23');
console.log(1 + 1 + '1');


// -------- Truthy and falsy values -----------
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(undefined));
console.log(Boolean('kaak'));
console.log(Boolean(null));
console.log(Boolean({}));

const money = 0;
if(money ) {
  console.log("Don't spend it all :)");
} else {
  console.log('You should get a job');
}

// the following is somewhat a bug..
let kheight = 0 ;
if (kheight) {
  console.log('yeey, height is defined');
} else {
  console.log('height, is not defined');
}

// -------- Equality operators -----------

const kage = 18;
if(kage === 18) {
  console.log('the person is 18');
}

// one liner
if(kage === 18) console.log('the person is 18');

// === strict equality operator (with type coercion)
// == lose equality operator (without type coercion)
console.log('18' == 18);
console.log('18' === 18);

/*
const favorite = Number(prompt('What is your favorite number'))
console.log(typeof favorite)

if(favorite === 12) {
  console.log('Cool! 12 is an amazing number')
} else if (favorite === 7) {
  console.log('7 is also a cool number')
} else {
  console.log('Should have guessed better')
}

// !== strict equality
// != lose inequality
if(favorite !== 23) {
  console.log('why not 23?')
}
*/

// -------- Boolean logic -----------
const hasDriversLicense = true;
const hasGoodVision = true;
console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const shouldDrive = hasDriversLicense && hasGoodVision
if(shouldDrive) {
  console.log('she is able to drive')
} else {
  console.log('not able to drive')
}

const isTired = true;
console.log(hasDriversLicense || hasGoodVision || isTired);
console.log(hasDriversLicense && hasGoodVision && isTired);
const lag1 = true;
const lag2 = true;
const lag3 = false;
const lag4 = false;
const opisiteBool = !lag1;
console.log(lag1 && lag2 || lag3 && lag4);
console.log(lag1 && lag2 || lag3);

// -------- Switch statements -----------
const day = 'tuesday';

switch(day) {
  case 'monday':
    console.log('Plan course structure');
    console.log('Go to coding meetup')
    break;
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend');
    break;
  default:
    console.log('not a valid day!')
}

// -------- Conditional (Ternary) Operator -----------
const lage = 15;
lage >= 18 ? console.log("I like to drink wine") :
    console.log("I like to drink water");

const drink = lage >= 18 ? 'wine' : 'water';
console.log(drink)

console.log(`I like to drink ${lage >= 18 ? 'wine' : 'water'}`)

// code challenge 4
const billValue = 400;
const tipValue = billValue >= 50 && billValue <=300 ? billValue * 0.15 : billValue * 0.2;
console.log(tipValue)