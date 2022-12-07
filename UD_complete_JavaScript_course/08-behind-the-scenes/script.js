'use strict';

function calcAge(birthYear) {
    const age = 2037 - birthYear;

    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}`;
        console.log(output)

        if (birthYear >= 1981 && birthYear <= 1996) {
            // this var will work outside this block!
            var str = `Oh, and you are a millenial, ${firstName}!`;
            console.log(str);

            // javascript allows to resign values in inner scopes without explicitly returning those values..
            output = 'NEW OUTPUT'

            // in strict mode functions are block scoped
            function add(a, b) {
                return a+b;
            }
        }
        console.log(output)
        console.log(str);
        //add(2, 3);
    }
    printAge();

    return age;
}

const firstName = 'Jonas';
calcAge(1991)

console.log(yoyo);
var yoyo = 10;

//console.log(tatata);
const tatata = 20;

// *********************************************************************************************************************
// ************************* THIS keyword ******************************************************************************
// *********************************************************************************************************************

console.log(this);

// this keyword will be undefined here if using strict mode
const calcAges = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
}

calcAges(1991);

// arrow functions do not have their own this keyword!
// instead they will use this keyword belonging to the object calling it.
// hence in this case this will point to the global window object
const calcAges2 = birthYear => {
    console.log(2037 - birthYear);
    console.log(this);
}

calcAges2(1991);


// here this will point to jonas
const jonas = {
    year: 2037,
    calcA: function() {
        console.log(this.year);
    }
}

jonas.calcA()

const matilde = {
    year: 2022
}

// now this will point to matilde
matilde.calcA = jonas.calcA;
matilde.calcA();

// here this won't work, because this is undefined, hence no 'year' property
const f = matilde.calcA;
//f();

// *********************************************************************************************************************
// ************************* Regular function vs Arrow functions *******************************************************
// *********************************************************************************************************************

var fName = 'Karlis'

const loco = {
    fName: 'karlis',
    year: 1991,
    calcA: function() {
        console.log(this);
        console.log(2037 -  this.year);

        const self = this;
        const isMillenial = function() {
            console.log(self.year >= 1981 && self.year <= 1996);
        }
        isMillenial();

        const issMillenial = () => {
            console.log(this.year >= 1981 && this.year <= 1996);
        }
        issMillenial();
    },

    greet: () => {
        console.log(`Hey ${this.fName}`)
        console.log(this)
    }
}

// in this case the arrow function uses 'this' form global scope
// because .firstName does not exist in window object, this will return undefined, not an error!
loco.greet();
loco.calcA();

// *********************************************************************************************************************
// ************************* Arguments keyword *************************************************************************
// *********************************************************************************************************************

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
}

addExpr(2, 5);
addExpr(2, 5, 8, 10);

// arrow function does not have arguments keyword
var addArrow = (a, b) => {
    console.log(arguments);
    return a + b;
}


// *********************************************************************************************************************
// ************************* Primitives vs Objects *********************************************************************
// *********************************************************************************************************************

const me = {
    name: 'jonas',
    age: 30
}

const friend = me;
friend.age = 27;
console.log('Friend:', friend)
console.log('Me:', me)

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName)

const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
}

const marriedJessica = jessica;

const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob']
}

// The following will create a shallow copy.
// This means that the copy is only one level deep.
// If there are objects within other objects, then those are not copied!
const jessicaCopy = Object.assign({}, jessica2)
jessicaCopy.lastName = 'Davis'

console.log('before: ', jessica2.lastName)
console.log('after: ', jessicaCopy.lastName)

jessicaCopy.family.push('Mary')
jessicaCopy.family.push('John')

console.log('before: ', jessica2.family)
console.log('after: ', jessicaCopy.family)