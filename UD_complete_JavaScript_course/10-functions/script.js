'use strict';

const bookings = [];

const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
  //ES5 way
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price}
  console.log(booking);
  bookings.push(booking);

}

createBooking('LH123');
createBooking('LH123', 2);
// to skip a parameter:
createBooking('LH123', undefined, 1000);

console.log('---------------------------------------------------------------');
console.log('------------PASSING ARGUMENTS: VALUE VS REFERENCE--------------');
console.log('---------------------------------------------------------------');

const flight = 'LH234';
const karlis = {
  name: 'Karlis Rieksts',
  passport: 2735926943652395
}

const checkIn = function(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 2735926943652395) {
    //alert('Checked in!')
  } else {
    //alert('Wrong passport!')
  }
}

checkIn(flight, karlis);
// flight was not changed because it is a primitive and passing it into a funciton copies it fully
console.log(flight);
// karlis was changed beacuse it is an object, and passing it into a function copies only a referece to the object
console.log(karlis);

const newPassport = function(person) {
  person.passport = Math.trunc(Math.random() * 1000000000000)
}

newPassport(karlis);
checkIn(flight, karlis);


console.log('---------------------------------------------------------------');
console.log('------------FUNCTIONS ACCEPTING OTHER FUNCTIONS----------------');
console.log('---------------------------------------------------------------');

const oneWord = function(str) {
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}

const transformer = function(str, fn) {
  console.log(`Original string: ${str}`)
  console.log(`Transformed string: ${fn(str)}`)
  console.log(`Transformed by: ${fn.name}`)
}

transformer('Javascript is the best!', upperFirstWord)
transformer('Javascript is the best!', oneWord)


const high5 = function() {
  console.log('😂')
}

//document.body.addEventListener('click', high5);

//['Jonas', 'Martha', 'Adam'].forEach(high5);


console.log('---------------------------------------------------------------');
console.log('------------FUNCTIONS RETURNING FUNCTIONS----------------------');
console.log('---------------------------------------------------------------');

const greet = function(greeting) {
  return function(name) {
    console.log(`${greeting} ${name}`)
  }
}

const greeterHey = greet('Hey')
greeterHey('Jonas')


greet('Hello')('Jonas')

const greet1 = greeting => name => console.log(`${greeting} ${name}`)
greet('Hello')('Karlis')


console.log('---------------------------------------------------------------');
console.log('---------------THE CALL, APPLY and BIND METHODS----------------');
console.log('---------------------------------------------------------------');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.booking.push({flight: `${this.iataCode}${flightNum}`, name});
  }
}

lufthansa.book(239, 'Karlis Rieksts');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowing',
  iataCode: 'EW',
  booking: []
}

// this creates a stand alone function and breaks this keyword functionality
const book = lufthansa.book;

// to fix do this:

// CALL method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

delete lufthansa.book;
book.call(eurowings, 27, 'Sara Will');
console.log(eurowings);
console.log(lufthansa);

//APPLY method
book.apply(eurowings, [27, 'Sar Wil']);

const flightData = [30, 'Lil Yooo'];
book.call(lufthansa, ...flightData);
console.log(lufthansa);

//BIND method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(12, 'Steven Williams ');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Rieksts');
bookEW23('Loco Koko');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
  console.log(this)
  this.planes++;
  console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

//partial application
const addTax = (rate, value) => value + value*rate;
console.log(addTax(0.1, 200));

// null (nit strictly) in case 'this' keyword is not relevant
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const taxFunc = function(rate) {
  return function(value) {
    console.log(value + value*rate);
  }
}

const valueFunc = taxFunc(0.1);
valueFunc(300);

taxFunc(0.2)(200);


console.log('---------------------------------------------------------------');
console.log('---------------------CODING CHALLENGE #1-----------------------');
console.log('---------------------------------------------------------------');

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`)
    const answerIds = [0, 1, 2, 3];
    if (answerIds.includes(Number(answer)) && Number(answer) === 'number') {
      this.answers[Number(answer)]++;
    }
    this.displayResults('string');
  },
  displayResults(type='array') {
    if (type === 'array') {
      console.log(this.answers)
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`)
    }
  }
}

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))



poll.displayResults.call({answers: [1, 2, 3, 4, 5]}, 'string')


console.log('---------------------------------------------------------------');
console.log('-----------IMMEDIATELY INVOKED FUNCTION EXPRESSIONS------------');
console.log('---------------------------------------------------------------');

const runOnce = function() {
  console.log('This will never run again!');
};

// IIFE
(function() {
  console.log('This will never run again!')
})();

(() => console.log('This ALSO will never run again!'))();


console.log('---------------------------------------------------------------');
console.log('----------------------------CLOSURES---------------------------');
console.log('---------------------------------------------------------------');

const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`)
  }
}

const booker = secureBooking();
booker();
booker();
booker();
booker();
booker();

console.dir(booker)

console.log('---------------------------------------------------------------');
console.log('--------------------------CLOSURE EXAMPLES---------------------');
console.log('---------------------------------------------------------------');


// Example 1 for closure
let f;
const g = function() {
  const a = 23;
  f = function() {
    console.log(a*2);
  }
}

const h = function() {
  const b = 777;
  f = function() {
    console.log(b*2)
  }
}

g();
f();
h();
f();

console.dir(f)

// Example 2 for closure

const boardPassenger = function(n, wait) {
  const perGroup = n / 3;
  setTimeout(function(){
    console.log(`We are now boarding ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait}`);
}

boardPassenger(180, 3);


console.log('---------------------------------------------------------------');
console.log('---------------------CODING CHALLENGE #2-----------------------');
console.log('---------------------------------------------------------------');


(function() {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function() {
    header.style.color = 'blue';
  })
})();

