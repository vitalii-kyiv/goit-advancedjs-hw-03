import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api-js';

const select = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');

function fillInSelect() {
  select.hidden = true;
  loaderText.hidden = false;
  return fetchBreeds().then(elements => {
    elements.forEach(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      select.add(option);
      loaderText.style.display = 'none';
      select.hidden = false;
    });
  });
}

fillInSelect()
  .then()
  .catch(error => {
    loaderText.style.display = 'none';
    iziToast.error({
      closeOnEscape: true,
      closeOnClick: true,
      backgroundColor: 'tomato',
      messageColor: 'white',
      position: 'topRight',
      messageSize: '20',
      message: `Oops! Something went wrong! Try reloading the page!`,
    });
  });

select.addEventListener('change', onSelectChange);

function onSelectChange() {
  catInfoDiv.hidden = true;
  loaderText.style.display = 'block';
  const breedId = select.value;

  fetchCatByBreed(breedId)
    .then(data => {
      renderCatInfo(data);
      loaderText.style.display = 'none';
    })
    .catch(error => {
      loaderText.style.display = 'none';
      iziToast.error({
        closeOnEscape: true,
        closeOnClick: true,
        backgroundColor: 'tomato',
        messageColor: 'white',
        position: 'topRight',
        messageSize: '20',
        message: `Oops! Something went wrong! Try reloading the page!`,
      });
    });
}

function renderCatInfo(data) {
  const { url, breeds } = data;
  const breedInfo = breeds[0];

  const markup = `
  <div class="cat-info-wrapper">
    <img class="breed-img" src="${url}" alt="cat" width=500/>
    <div class="cat-text-wrapper">
    <h2>${breedInfo.name}</h2>
    <p><strong>Description:</strong> ${breedInfo.description}</p>
    <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
    </div>
    </div>
  `;
  catInfoDiv.innerHTML = markup;
  catInfoDiv.hidden = false;
}
