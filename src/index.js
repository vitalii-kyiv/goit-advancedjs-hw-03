import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Er46koKybYqW28gLOCiI46EOwSbW1Of6rmEYmaOYjgdL748hwWdb57JpKIyVtfLR';

const select = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
errorText.hidden = true;

console.log(select);

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}
fetchBreeds();

function fillInSelect() {
  return fetchBreeds().then(elements => {
    elements.forEach(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      select.add(option);
      loaderText.hidden = true;
    });
  });
}
fillInSelect()
  .then(() => {
    console.log('Options added to select');
  })
  .catch(error => {
    console.error('Error filling in options:', error);
  });

function fetchCatByBreed(breedId) {
  const id = breedId;
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

fetchCatByBreed('acur')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error filling in options:', error);
  });

function createMarkup(arr) {
  return arr
    .map(
      ({ name, description, temperament }) => `
      <img class="breed-img" src="unnown" alt="cat" />
<h2 class="breed-title">${name}</h2>
<p class="breed-text">${description}</p>
<h3 class="breed-temperament-title">Temperament</h3>
<p class="breed-temperament-text">${temperament}</p>
  `
    )
    .join('');
}
