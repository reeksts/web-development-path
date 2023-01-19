'use strict';

console.log('---------------------------------------------------------------');
console.log('--------- Constructor functions and the new operator ----------');
console.log('---------------------------------------------------------------');

const Person = function(firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this! because this will create new
  // function for every object created
  //this.calcAge = function() {
  //  console.log(2037 - this.birthYear);
  //};
};

const jonas = new Person('Jonas', '1991');
console.log(jonas);

// 1. new {} is created.
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
console.log(matilda);
const jack = new Person('jack', 2000);
console.log(jack);

console.log(jonas instanceof Person);

console.log('---------------------------------------------------------------');
console.log('----------------------- Prototypes ----------------------------');
console.log('---------------------------------------------------------------');

console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
  };

jonas.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));
console.log(Person);

console.log('---------------------------------------------------------------');
console.log('---------- Prototypal inheritance on built-in objects  --------');
console.log('---------------------------------------------------------------');

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 5, 6, 7, 8, 8, 8];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function() {
  console.log(this);
  return [...new Set(this)];
}

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

console.dir(x => x + 1);

console.log('---------------------------------------------------------------');
console.log('---------------------- Coding challenge #1 --------------------');
console.log('---------------------------------------------------------------');

const Car = function(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function() {
  console.log(`${this.make} old speed = ${this.speed} km/h`);
  this.speed += 10;
  console.log(`${this.make} new speed = ${this.speed} km/h`);
};

Car.prototype.break = function() {
  console.log(`${this.make} old speed = ${this.speed} km/h`);
  this.speed -= 5;
  console.log(`${this.make} new speed = ${this.speed} km/h`);
};

const car1 = new Car('BMW', 120);
car1.accelerate();
car1.break();
car1.break();
car1.break();
car1.break();

console.log('---------------------------------------------------------------');
console.log('-------------------------- ES6 Classes ------------------------');
console.log('---------------------------------------------------------------');

// class expression
//const PersonCl = class {}

// class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set property that already exists
  set fullName(name) {
    console.log(name);
    if(name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`)
    }
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there!');
    console.dir(this.prototype);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.__proto__);
console.log(jessica.age);

PersonCl.prototype.greet = function() {
  console.log(`Hey ${this.firstName}`);
}
jessica.greet();

// 1. Classes are NOT hoisted!
// 2. Classes are first-class citizens.
// 3. Classes are executed in strict mode.

console.log('---------------------------------------------------------------');
console.log('-------------------------- Setters and Getters ----------------');
console.log('---------------------------------------------------------------');

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov)
  }
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

console.log('---------------------------------------------------------------');
console.log('-------------------------- Static methods ---------------------');
console.log('---------------------------------------------------------------');

// Array.from()
// .from() methods is attached to the constructor itself

Person.hey = function() {
  console.log('Hey there!');
  console.dir(this.prototype);
};
Person.hey();
PersonCl.hey();

console.log('---------------------------------------------------------------');
console.log('-------------------------- Object.create ----------------------');
console.log('---------------------------------------------------------------');

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  yoo() {
    console.log('yooo')
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

console.log('---------------------------------------------------------------');
console.log('---------------------- Coding challenge #2 --------------------');
console.log('---------------------------------------------------------------');

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log(`${this.make} old speed = ${this.speed} km/h`);
    this.speed += 10;
    console.log(`${this.make} new speed = ${this.speed} km/h`);
    console.log('Is this printed here?');
  };

  break() {
    console.log(`${this.make} old speed = ${this.speed} km/h`);
    this.speed -= 5;
    console.log(`${this.make} new speed = ${this.speed} km/h`);
    return this;
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford.speed);

console.log('---------------------------------------------------------------');
console.log('-------- Inheritance between classes: Constructor function ----');
console.log('---------------------------------------------------------------');

const Human = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Human.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
  Human.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototype
Student.prototype = Object.create(Human.prototype);

Student.prototype.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Human);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log('---------------------------------------------------------------');
console.log('---------------------- Coding challenge #3 --------------------');
console.log('---------------------------------------------------------------');

const BaseCar = function(make, speed) {
  this.make = make;
  this.speed = speed;
}
BaseCar.prototype.accelerate = function() {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
}

const EVCar = function(make, speed, charge) {
  BaseCar.call(this, make, speed);
  this.charge = charge;
}

EVCar.prototype = Object.create(BaseCar.prototype);

EVCar.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
}

EVCar.prototype.accelerate = function() {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} going ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EVCar('Tesla', 120, 50);
console.log(tesla);
tesla.chargeBattery(90);
tesla.accelerate();

console.log('---------------------------------------------------------------');
console.log('-------- Inheritance between classes: ES6 classes -------------');
console.log('---------------------------------------------------------------');

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old, but as a\
 student I feel more like 35`)
  }

}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();

console.log('---------------------------------------------------------------');
console.log('-------- Inheritance between classes: Object.create -----------');
console.log('---------------------------------------------------------------');

const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
}

const steven2 = Object.create(PersonProto2);

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function(firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
}
StudentProto.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science')
jay.introduce();

console.log('---------------------------------------------------------------');
console.log('---------------------- Another class example ------------------');
console.log('---------------------------------------------------------------');

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// there are also static versions:
// 5) Static public field
// 6) Static private fields
// 7) Static public method
// 8) Static Private method

class Account {
  // 1) Public fields
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin;


  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);

    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    console.log(`Deposited: ${val}`);

    return this;
  }

  requestLoan(val) {
    if(this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());

console.log('---------------------------------------------------------------');
console.log('-------- Encapsulation: Protected properties and methods ------');
console.log('---------------------------------------------------------------');

//console.log(acc.#movements);
//console.log(acc1.#pin);
//acc1.#approveLoan(100);

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

console.log('---------------------------------------------------------------');
console.log('---------------------- Coding challenge #4 --------------------');
console.log('---------------------------------------------------------------');

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().break().chargeBattery().accelerate();
