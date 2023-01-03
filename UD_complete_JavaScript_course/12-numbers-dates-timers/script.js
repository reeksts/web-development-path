'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-12-13T14:11:59.604Z',
    '2022-12-16T17:01:17.194Z',
    '2022-12-17T23:36:17.929Z',
    '2022-12-18T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //else {
  //  const day = `${date.getDate()}`.padStart(2, '0');
  //  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  //  const year = date.getFullYear();
  //  return `${day}/${month}/${year}`;
  //}
  return new Intl.DateTimeFormat(locale).format(date);
}

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBal = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedBal}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  //`${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  //`${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  //`${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function() {
  // Set time to 5 minutes
  let time = 30;

  const tick  = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//FAKE ALWAYS LOGGED IN
//currentAccount = account1;
//updateUI(currentAccount);
//containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    //const day = `${now.getDate()}`.padStart(2, '0');
    //const month = `${now.getMonth() + 1}`.padStart(2, '0');
    //const year = now.getFullYear();
    //const hour = `${now.getHours()}`.padStart(2, '0');
    //const min = `${now.getMinutes()}`.padStart(2, '0');
    //labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long'
    };
    //const locale = navigator.language;
    const locale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Start log out timer
    if(timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function(){
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500)
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log('---------------------------------------------------------------');
console.log('--------------converting and checking numbers------------------');
console.log('---------------------------------------------------------------');

console.log(23 === 23.0);

// all numbers in javascript are store in binary
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // this is FALSE!

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10)); // this works if string starts with a number
console.log(Number.parseInt('a30px', 10));
console.log(Number.parseInt('30px'));

console.log(Number.parseFloat('  2.5rem'));
console.log(Number.parseInt('  2.5rem'));

// check if NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X'));  // true
console.log(Number.isNaN(23 / 0)); // false

// check if real number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(+'20X');
console.log(Number.isFinite(23 / 0));

console.log('---------------------------------------------------------------');
console.log('------------------------math and rounding----------------------');
console.log('---------------------------------------------------------------');

console.log(Math.sqrt(25));
console.log(25 ** (1/2));
console.log(8 ** (1/3));

// this also does type coercion but not parsing
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.min(5, 18, '23', 11, '2'));

// constants
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// random
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

const counts = {};
for ( let i = 0; i < 100; i++) {
  const num = randomInt(10, 20);
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}
console.log(counts);

// rounding integers
console.log(Math.round(23.3));
console.log(Math.round(23.499999999));
console.log(Math.ceil(23.3));
console.log(Math.ceil('23.3'));
console.log(Math.floor(23.3));

// floor and trunc the same for positive numbers, but  not for negative
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// rounding decimals
// toFixed returns a string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(100)); // this is weird one!
console.log(+(2.7).toFixed(100));

console.log('---------------------------------------------------------------');
console.log('-----------------------remainder operator----------------------');
console.log('---------------------------------------------------------------');

console.log(5 % 2)

// check even or odd:
const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function() {
  [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
    console.log(row);
    console.log(i);
  if (i % 2 === 0) {
    row.style.backgroundColor = 'orangered';
  }
  if (i % 3 === 0) {
  row.style.backgroundColor = 'blue';
  }
  });
});

console.log('---------------------------------------------------------------');
console.log('-----------------------numeric separators----------------------');
console.log('---------------------------------------------------------------');

const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee = 15_00;
console.log(transferFee);

// only between numbers!
const PI = 3.14_15;
console.log(PI);

// underscore won't work here:
console.log(Number('230_000'));
console.log(parseInt('230_000'));

console.log('---------------------------------------------------------------');
console.log('-----------------------working with bigint---------------------');
console.log('---------------------------------------------------------------');

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// this one is not stored accurately:
console.log(2 ** 53 + 1);

console.log(typeof 798239487924739287529723985729857239857n);
console.log(798239487924739287529723985729857239857n);
console.log(BigInt(798239487924739287529723985729857239857));

// operations
console.log(10000n + 10000n);
console.log(798239487924739287529723985729857239857n * 983472987492837498n )

// NB! cannot mix bigint with other types!
const huge = 928349823749823749273498n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions:
// come comparison works
console.log(20n > 15);
console.log(20n === 20); // this won't work! because of no type coercion!
console.log(typeof 20n);
console.log(20n == '20') // this works because of type coercion

console.log(huge + ' is RELLY big!!!');

// Math operations won't work
// console.log(Math.sqrt(16n));

console.log('---------------------------------------------------------------');
console.log('-----------------------creating dates--------------------------');
console.log('---------------------------------------------------------------');

// create a date
const now2 = new Date();
console.log(now2);

console.log(new Date('Dec 17 2022 17:47:50'));

console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 31)); // this will autocorrect to Dec-1

console.log(new Date(3 * 24*60*60*1000));

// working with dates:
const future = new Date(2037, 10, 31, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2143290180000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

console.log('---------------------------------------------------------------');
console.log('-----------------------operations with dates-------------------');
console.log('---------------------------------------------------------------');

const future2 = new Date(2037, 10, 31, 15, 23);
console.log(Number(future2));
console.log(+future2);

// operations witg dates are automatically converted to numbers- miliseconds
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

console.log('---------------------------------------------------------------');
console.log('------------------Internationalizing dates (Intl)--------------');
console.log('---------------------------------------------------------------');

console.log('---------------------------------------------------------------');
console.log('----------------Internationalizing numbers (Intl)--------------');
console.log('---------------------------------------------------------------');

const num2 = 388498234.23;
const options = {
  style: "currency", // unit, percent, currency
  unit: 'celsius',
  currency: 'EUR',
  //useGrouping: false,
}

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num2));
console.log('LV: ', new Intl.NumberFormat('lv-LV', options).format(num2));
console.log('DE: ', new Intl.NumberFormat('de-DE', options).format(num2));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options).format(num2));

console.log('---------------------------------------------------------------');
console.log('----------------Timers: setTimeout and setInterval-------------');
console.log('---------------------------------------------------------------');

// setTimeout
const ingredients = ['olives'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, ...ingredients);
console.log('waiting');

if(ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//setInterval
//setInterval(function() {
//  const now = new Date();
//  console.log(now);
//}, 1000)