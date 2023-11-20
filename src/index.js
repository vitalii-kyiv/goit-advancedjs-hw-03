import { fetchBreeds, fetchCatByBreed } from './cat-api-js';
import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');
errorText.hidden = true;

new SlimSelect({
  select: '.cat-select',
});

function fillInSelect() {
  loaderText.hidden = false;
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
  .then()
  .catch(error => {
    loaderText.hidden = true;
    errorText.hidden = false;
  });

select.addEventListener('change', onSelectChange);

function onSelectChange() {
  loaderText.hidden = false;
  const breedId = select.value;

  fetchCatByBreed(breedId)
    .then(data => {
      displayCatInfo(data);
      loaderText.hidden = true;
    })
    .catch(error => {
      errorText.hidden = false;
      loaderText.hidden = true;
    });
}

function displayCatInfo(data) {
  const { url, breeds } = data;
  const breedInfo = breeds[0];

  const markup = `
    <img class="breed-img" src="${url}" alt="cat" width=300/>
    <h2>${breedInfo.name}</h2>
    <p><strong>Description:</strong> ${breedInfo.description}</p>
    <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
  `;

  catInfoDiv.innerHTML = markup;
  catInfoDiv.hidden = false;
}
