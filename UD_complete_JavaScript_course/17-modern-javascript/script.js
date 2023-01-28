// Importing module
console.log('Importing module');

import { addToCart, totalPrice, tq } from './shoppingCart.js';
addToCart('bread', 5);

import * as ShoppingCart from './shoppingCart.js';
console.log(totalPrice, tq);
console.log(ShoppingCart.tq)
console.log(ShoppingCart);

// default import
import add from './shoppingCart.js';
add('banana', 5);

// importing all (tho not recommended)
// import add, { addToCart, totalPrice as price, tq } './shoppingCart.js';

import { cart } from './shoppingCart.js';
console.log('This is the cart:');
console.log(cart);
console.log(ShoppingCart.cart)

// top-level await - this blocks the execution!!
//const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//const data = await res.json();
//console.log(data);
console.log('Something');

// const getLastPost = async function() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
//
//   return {
//     title: data.at(-1).title,
//     text: data.at(-1).body
//   }
// };

//const lastPost = getLastPost();
//console.log(lastPost);

// using top-level await
//lastPost.then(last => console.log(last));
//const lastPost2 = await getLastPost();
//console.log(lastPost2);

const shoppingCart2 = (function() {
  const cart = [];
  const shipingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
  };

  const oredreStock = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} ordered form supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity
  };
}) ();

shoppingCart2.addToCart('apple', 4);
console.log(shoppingCart2.cart);

// CommonJS - works only in node.js

// Export:
// export.addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart`);
//   };

// Import:
// const { addTocart } = require('./shoppingCart.js')

//import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {product: 'bread', quantity: 5},
    {product: 'pizza', quantity: 5}
  ],
  user: {loggedIn: true}
};

const stateClone = Object.assign({}, state)
console.log(stateClone);

// deep clone with external module
const  state2DeepClone = cloneDeep(state);

if(module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey'
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// polyfilling
import 'core-js/stable';

// polyfilling async funcitons
import 'regenerator-runtime/runtime'