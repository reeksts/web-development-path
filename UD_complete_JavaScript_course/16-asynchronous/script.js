'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ==========================================================================================
// ==========================================================================================
// ==========================================================================================


const renderCountry = function(data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src=${data.flag} />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mil. people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}

/*
const getCountryAndNeighbour = function(country) {

  // AJAX call #1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country #1
    renderCountry(data);

    // Get neighbour country (#2)
    const neighbour = data.borders[0];

    if(!neighbour) return;

    // AJAX call #2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      // Render country #1
      renderCountry(data2, 'neighbour');
    });

  });
}

//getCountryAndNeighbour('portugal');
getCountryAndNeighbour('portugal');
 */


// ==========================================================================================
// ==========================================================================================
// ==========================================================================================

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {

    if(!response.ok)
      throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// CODE VERSION #1
/*
const getCountryData = function(country) {
  // Country #1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if(!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //const neighbour = data[0].borders[0];
      const neighbour = 'sdfsd'

      if(!neighbour) return;

      // Country #2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    })
    .then(response => {
      if(!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json()
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

// CODE VERSION #2
/*
const getCountryData = function(country) {
  // Country #1
  getJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found')
    .then(data => {
      renderCountry(data[0]);

      if(!('borders' in data[0]))
        throw new Error('No neighbour found!');
      const neighbour = data[0].borders[0];

      // Country #2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found')
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function() {
  getCountryData('australia');
});
*/



// ==========================================================================================
// --------------------------------- CODING CHALLENGE #1 ------------------------------------
// ==========================================================================================

//&auth=355950087175128365801x46020
const whereAmI = function(lat, lon) {
  fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
    .then(response => {
      console.log(response);
      if(!response.ok) {
        throw new Error(`Failed to fetch the information (${response.status}). Try again!`)
      }
      return response.json()
    })
    .then(data => {
      const country = data.country;
      const city = data.city;
      console.log(`You are in ${city}, ${country}`)

      return fetch(`https://restcountries.com/v2/name/${country.toLowerCase()}`)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(err);
      console.error(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//whereAmI('52.508', '13.381');
//whereAmI('19.037', '72.873');
//whereAmI('-33.933', '18.474');

// ==========================================================================================
// ==========================================================================================
// ==========================================================================================

const func = function() {
  console.log('Test start');
  setTimeout(() => console.log('0 sec timer'), 0);
  Promise.resolve('Resolved promise 1').then(res => console.log(res));
  Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 100000000; i++) {
    }
    console.log(res);
  });
  console.log('Test end');
};
//func();

// ==========================================================================================
// --------------------------------- Building a simple promise ------------------------------
// ==========================================================================================

const lotteryFunc = function() {
  const lotteryPromise = new Promise(function(resolve, reject) {
    console.log('Lottery draw is happening! 🔮')
    setTimeout(function() {
      if(Math.random() >= 0.5) {
      resolve('You WIN 😂');
      } else {
        reject(new Error('You lost your money! 💥'));
      }
    }, 2000);
  });

  lotteryPromise.then(res => console.log(res))
    .catch(err => console.error(err));
};
//lotteryFunc();


// Promisifying setTimeout - this avoids callback hell
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2).then(() => {
//   console.log('I waited for 2 seconds');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 1 seconds');
// });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.log(x));

// ==========================================================================================
// --------------------------------- Promisifying geolocation API ---------------------------
// ==========================================================================================



const getPosition = function() {
  return new Promise(function(resolve, reject) {
    //navigator.geolocation.getCurrentPosition(
    //  position => resolve(position),
    //  err => reject(err)
    //);
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//getPosition().then(pos => console.log(pos));

const whereAmI2 = function() {
  getPosition().then(pos => {
    const {latitude: lat, longitude: lon} = pos.coords;

    return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
  })
  .then(response => {
    console.log(response);
    if(!response.ok) {
      throw new Error(`Failed to fetch the information (${response.status}). Try again!`)
    }
    return response.json()
  })
  .then(data => {
    const country = data.country;
    const city = data.city;
    console.log(`You are in ${city}, ${country}`)

    return fetch(`https://restcountries.com/v2/name/${country.toLowerCase()}`)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    renderCountry(data[0]);
  })
  .catch(err => {
    console.log(err);
    console.error(`${err.message}`);
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;
  });
};

btn.addEventListener('click', whereAmI2);

// ==========================================================================================
// --------------------------------- CODING CHALLENGE #2 ------------------------------------
// ==========================================================================================

const imgContainer = document.querySelector('.images');

const createImage = function(imgPath) {
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function() {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function() {
      reject(new Error('Image not found'))
    });
  });
};

const imageLoader = function() {
  let currentImg;
  createImage('img/img-1.jpg')
    .then(img => {
      currentImg = img;
      console.log('Image 1 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 2 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
    })
    .catch(err => console.log(err));
};

//imageLoader();

// ==========================================================================================
// -------------------------- Consuming Promises with Async/Await ---------------------------
// ==========================================================================================

const whereAmI3 = async function() {

  // This is the same as below:
  //fetch(`https://restcountries.com/v2/name/${country}`)
  //  .then(res => console.log(res))

  try {
    // Geo location:
    const pos = await getPosition()
    const {latitude: lat, longitude: lon} = pos.coords;

    // Reverse geo coding:
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
    if(!resGeo.ok) {
      throw new Error('Problem getting location data');
    }
    const dataGeo = await resGeo.json()

    // Country data
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country.toLowerCase()}`);
    if(!res.ok)
      throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError('Something went wrong! 💥💥💥');

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
//whereAmI3()
//  .then(city => console.log(`2: ${city}`))
//  .catch(err => console.error(`2: ${err.message} 💥💥💥`))
//  .finally(() => console.log('3: Finished getting location!'));

(async function() {
  try {
    const city = await whereAmI3();
    console.log(`2: ${city}`);
  } catch(err) {
    console.error(`2: ${err.message} 💥💥💥`);
  }
  console.log('3: Finished getting location!');
})();

// ==========================================================================================
// ------------------------------ Running Promises in Parallel ------------------------------
// ==========================================================================================

const get3Countries = async function(c1, c2, c3) {
  try {
    //const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    //const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    //const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
    ])

    //console.log([data1.capital, data2.capital, data3.capital]);
    console.log(data.map(d => d[0].capital));

  } catch(err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');


// ==========================================================================================
// ------------------------ Combinators: race, allSettled and any ---------------------------
// ==========================================================================================

// Promise.race
(async function() {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`)
  ]);
  console.log(res[0]);
})();

const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error('request took too long!'))
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.1)
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err.message));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
])
  .then(res => console.log(res));

//Promise.any [ES2021]
// return first fulfilled promise
Promise.any([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
])
  .then(res => console.log(res));

// ==========================================================================================
// --------------------------------- CODING CHALLENGE #3 ------------------------------------
// ==========================================================================================


const loadNPause = async function() {
  try {
    // Load image 1
    const img1 = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img1.style.display = 'none';

    // Load image 2
    const img2 = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img2.style.display = 'none';


  } catch(err) {
    console.error(err);
  }
};
//loadNPause();

const loadAll = async function(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch(err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])