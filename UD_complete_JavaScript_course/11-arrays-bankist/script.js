'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// Display all in the incoming/outgoing transactions
const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
};

// Calculate and display the current account balance
const calcDisplayBalance = function(account) {
  account.balance =  account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${account.balance}€`;
};

// Displaying teh summary of deposits/withdrawals/interest at the bottom of transactions
const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(deposit => deposit > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(interest => interest > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};


// Generate usernames for each of teh account
const createUsernames = function(accs) {
  accounts.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('');
  })
};
createUsernames(accounts);

const updateUI = function(account) {
    // Display movements
    displayMovements(account.movements);

    // Display balance
    calcDisplayBalance(account);

    // Display summary
    calcDisplaySummary(account);
}


// Set up the login functionality
// !if button is in form element, then by default it makes the page to reload!
// hitting enter for in put in from element with generate click event!
let currentAccount;
btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // Updating UI
    updateUI(currentAccount);
  }
});

// Implement the transfer functionality
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount
    && receiverAcc.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Updating UI
    updateUI(currentAccount);
  }
})

// Implementing the loan functionality
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    inputLoanAmount.value = '';
    inputLoanAmount.blur();


    // Add the deposit
    currentAccount.movements.push(amount);

    // Updating UI
    updateUI(currentAccount);
  }
})

// Implementing the close account functionality
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value
    && currentAccount.pin === Number(inputClosePin.value)) {
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete account
    // This mutates the underlying array, so no need to reassign
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }
})
let sortState = false;
// Implement sort button value change
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortState);
  sortState = !sortState;
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE method
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
// slice without any arguments creates a shallow copy teh same as [...arr]
console.log(arr.slice());
console.log([...arr]);

// SPLICE method - this changes original array
console.log(arr.splice(2));
console.log(arr);

arr.splice(-1);
console.log(arr);
arr = ['a', 'b', 'c', 'd', 'e'];

// REVERSE - this mutates the original array
console.log(arr.reverse());
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT - the same as [...arr, ...arr2]
const letters = arr.concat(arr2);
console.log(letters)
console.log([...arr, ...arr2])

// JOIN
console.log(letters.join(' - '))


// new AT method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

console.log('---------------------------------------------------------------');
console.log('---------------------LOOPING ARRAYS: forEach-------------------');
console.log('---------------------------------------------------------------');

for (const movement of movements) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You witgraw ${Math.abs(movement)}`);
  }
}

// continue and break statements do nto work here
console.log('-------------------------------------------')
movements.forEach(function(mov, i, arr) {
  if(mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(mov)}`);
  }
})

const yoyo = function(mov) {
  console.log(mov);
}

movements.forEach(yoyo)

// forEach on maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
})

// forEach on maps
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
currenciesUnique.forEach(function(value, _, set) {
  console.log(`${value}: ${value}`);
})

console.log('---------------------------------------------------------------');
console.log('---------------------Coding challenge #1-----------------------');
console.log('---------------------------------------------------------------');


const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorr = dogsJulia.slice();
  dogsJuliaCorr.splice(0, 1);
  dogsJuliaCorr.splice(-2);

  const dogs = dogsJuliaCorr.concat(dogsKate)

  const printDogs = function(value, index) {
    if (value >= 3) {
      console.log(`Dog number ${index + 1} is an adult, and is ${value} years old.`)
    } else {
      console.log(`Dog number ${index + 1} is still a puppy`);
    }
  }
  console.log("All dogs:");
  dogs.forEach(printDogs);
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('-------------------------------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]


console.log('---------------------------------------------------------------');
console.log('-----------------------------MAP method------------------------');
console.log('---------------------------------------------------------------');

const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov) {
  return mov * eurToUsd;
})
console.log(movements2);
console.log(movementsUSD);

const movementsUSD2 = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD2);

const movementDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
)

console.log(movementDescriptions);

console.log('---------------------------------------------------------------');
console.log('--------------------------FILTER method------------------------');
console.log('---------------------------------------------------------------');

const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


console.log('---------------------------------------------------------------');
console.log('--------------------------REDUCE method------------------------');
console.log('---------------------------------------------------------------');

//first argument is the accumulator
//second argument sis the initial value of accumulator
const balance = movements.reduce(function(accum, mov, index, arr) {
  return accum + mov;
}, 0)
console.log(balance);

// maximum value
const maxVal = movements.reduce((acc, mov) => mov > acc ? mov : acc, movements[0]);
console.log(maxVal);

console.log('---------------------------------------------------------------');
console.log('---------------------Coding challenge #2-----------------------');
console.log('---------------------------------------------------------------');

const calcAverageHumanAge = function(dogAge) {
  const humanAge = dogAge.map(dog => dog <= 2 ? dog * 2 : 16 + dog * 4);
  console.log(`Human age: ${humanAge}`);
  const humanAgeFiltered = humanAge.filter(dog => dog > 18);
  console.log(`HumanFiltered age: ${humanAgeFiltered}`);
  const average = humanAgeFiltered.reduce((acc, dog, i, arr) => acc + dog/arr.length, 0)
  console.log(`Average age: ${average}`);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


console.log('---------------------------------------------------------------');
console.log('--------------------------Chaining methods---------------------');
console.log('---------------------------------------------------------------');


const totalDepositsUSD = movements
  .filter(mov => mov < 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov);
console.log(totalDepositsUSD);

console.log('---------------------------------------------------------------');
console.log('---------------------Coding challenge #3-----------------------');
console.log('---------------------------------------------------------------');

const calcAverageHumanAge2 = function(dogAge) {
  const average = dogAge
    .map(dog => dog <= 2 ? dog * 2 : 16 + dog * 4)
    .filter(dog => dog > 18)
    .reduce((acc, dog, i, arr) => acc + dog/arr.length, 0);
  console.log(`Average age: ${average}`);
};

calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

console.log('---------------------------------------------------------------');
console.log('---------------------------FIND method-------------------------');
console.log('---------------------------------------------------------------');

// find method callback function needs a boolean in return
const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account)

console.log('---------------------------------------------------------------');
console.log('---------------------------FINDINDEX method--------------------');
console.log('---------------------------------------------------------------');

// somewhat similar tp indexOf, but indexOf is way more limited.
// indexOf can only accept a value as an argument,
// whereas findIndex can accept a complex expression
// Also the findINdex has access to the current element, index and the whole array!

console.log('---------------------------------------------------------------');
console.log('-----------------------SOME and EVERY methods------------------');
console.log('---------------------------------------------------------------');

// SOME
console.log(movements);
console.log(movements.includes(-130)); // this check only for equality

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

console.log(movements.some(mov => mov === 1300));

// EVERY - every element has to satisfy the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// separate callback in it own named function:
const deposit = mov => mov > 1000;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));


console.log('---------------------------------------------------------------');
console.log('------------------------FLAT and FLATMAP methods---------------');
console.log('---------------------------------------------------------------');


const arr4 = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr4.flat())

// teh flat method only goes one level deep - hence this is not completely flattened:
const arr5 = [[[1, 2], 3], [[4, 5], 6], 7, 8, 9];
console.log(arr5.flat())

//fix - give argument to flat specifying the levels to go into
console.log(arr5.flat(2));

const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(deposit)
  .reduce((acc, mov) => acc + mov, 0)
console.log(accountMovements);

// with flatMap:
// flatMap only goes one level deep!
const accountMovements2 = accounts
  .flatMap(acc => acc.movements)
  .filter(deposit)
  .reduce((acc, mov) => acc + mov, 0)
console.log(accountMovements2);


console.log('---------------------------------------------------------------');
console.log('------------------------sorting arrays-------------------------');
console.log('---------------------------------------------------------------');

// sort() changes the original array
const owner = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owner.sort());
console.log(owner);

// this does not work properly:
console.log(movements);
//console.log(movements.sort());
//console.log(movements);

// return < 0 then A, B -> keep order
// return > 0 then B, A -> switch order

// Ascending order:
movements.sort((a, b) => {
  if (a > b)
    return 1
  if (b > a)
    return -1
})
console.log(movements);

// Descending order:
movements.sort((a, b) => {
  if (a > b)
    return -1
  if (b > a)
    return 1
})
console.log(movements);

// Ascending order:
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order:
movements.sort((a, b) => b - a);
console.log(movements);


console.log('---------------------------------------------------------------');
console.log('-----------------creating and filling arrays-------------------');
console.log('---------------------------------------------------------------');

const x = new Array(7);
console.log(x);
console.log(x.map(() => 5));   // this is not working!
console.log(x.fill(3, 3, 4)); // this mutates the underlying array
console.log(x.map(() => 5));  // this now works, but it fills only where value exists, not empty spaces

const arr6 = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr6.fill(3, 3, 4));

//Array.from
const arr8 = Array.from({length: 7}, () => 1);
console.log(arr8);

const arr9 = Array.from({length: 7}, (_, ind) => ind + 1);
console.log(arr9);

labelBalance.addEventListener('click', function() {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
      el => Number(el.textContent.replace('€', '')))
  console.log(movementsUI);

  console.log([...document.querySelectorAll('.movements__value')]);
})

console.log('---------------------------------------------------------------');
console.log('---------------------array methods practice--------------------');
console.log('---------------------------------------------------------------');

// practice #1
const bankDepositsSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, mov) => sum + mov);
console.log(bankDepositsSum);

const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;
console.log(numDeposits1000);

// practice #2
const num2Deposits1000 = accounts.flatMap(acc => acc.movements).reduce((sum, mov) => mov >= 1000 ? ++sum : sum, 0)
console.log(num2Deposits1000);

let a = 10;
console.log(a++);

// practice #3
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    sums[cur >= 0 ? 'deposits' : 'withdrawals'] += cur;
    return sums;
  }, {deposits: 0, withdrawals: 0});

console.log(sums);

// practice 4
const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : capitalize(word))
    .join(' ');
  return capitalize(titleCase);
}
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));


console.log('---------------------------------------------------------------');
console.log('---------------------coding challenge #4-----------------------');
console.log('---------------------------------------------------------------');



const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// #1
console.log('==> #1 --------------------------------------');
dogs.forEach(dog => dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28));
console.log(dogs);

// #2
console.log('==> #2 --------------------------------------');
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`Sarah's dog is eating too ${sarahDog.curFood > sarahDog.recomendedFood ? 'much' : 'little'}`);

const checkFoodAmount = function(dog) {
  const owner = dog.owners.length > 1 ? dog.owners.join(' and ') : dog.owners[0];
  if (dog.curFood >= dog.recomendedFood * 0.9 && dog.curFood <= dog.recomendedFood * 1.1) {
    console.log(`${owner} dog is eating proper amount of food`);
  } else if (dog.curFood < dog.recomendedFood * 0.9) {
    console.log(`${owner} dog is eating too little`);
  } else if (dog.curFood > dog.recomendedFood * 1.1) {
    console.log(`${owner} dog is eating too much`);
  }
 };

dogs.forEach(checkFoodAmount);

// #3
console.log('==> #3 --------------------------------------');
const ownerEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownerEatTooMuch);
const ownerEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownerEatTooLittle);

// #4
console.log('==> #4 --------------------------------------');
console.log(`${ownerEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownerEatTooLittle.join(' and ')}'s dogs eat too little!`);

// #5
console.log('==> #5 --------------------------------------');
console.log(dogs.some(dog => dog.curFood === dog.recomendedFood))

// #6
console.log('==> #6 --------------------------------------');
const filterOkay = dog => dog.curFood >= dog.recomendedFood * 0.9 && dog.curFood <= dog.recomendedFood * 1.1;
console.log(dogs.some(filterOkay));

// #7
console.log('==> #7 --------------------------------------');
const dogsEatingOkay = dogs.filter(filterOkay);
console.log(dogsEatingOkay);

// #
console.log('==> #8 --------------------------------------');
const dogsSorted = dogs.slice().sort((a, b) => a.recomendedFood - b.recomendedFood)
console.log(dogsSorted)