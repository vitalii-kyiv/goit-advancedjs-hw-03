const apiKey =
  'live_Er46koKybYqW28gLOCiI46EOwSbW1Of6rmEYmaOYjgdL748hwWdb57JpKIyVtfLR';

const select = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');
errorText.hidden = true;

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Помилка отримання списку порід');
      }
      return resp.json();
    })
    .catch(err => {
      console.error(err);
      throw new Error('Помилка отримання списку порід');
    });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Немає даних для вказаного ідентифікатора породи');
      }
      return resp.json();
    })
    .then(data => {
      const catData = data[0];
      console.log(catData);
      if (!catData) {
        throw new Error('Немає даних для вказаного ідентифікатора породи');
      }
      return catData;
    })
    .catch(err => {
      console.error(err);
      throw new Error('Помилка отримання інформації про кота за породою');
    });
}

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
  .then(data => {
    console.log('Опції додані до списку');
  })
  .catch(error => {
    console.error('Помилка заповнення опцій:', error);
    errorText.textContent = 'Помилка заповнення опцій: ' + error.message;
    errorText.hidden = false;
  });

select.addEventListener('change', onSelectChange);

function onSelectChange(evt) {
  evt.preventDefault();
  const breedId = select.value;

  fetchCatByBreed(breedId)
    .then(data => {
      displayCatInfo(data);
    })
    .catch(error => {
      console.error('Помилка отримання інформації про кота:', error);
      errorText.textContent =
        'Помилка отримання інформації про кота: ' + error.message;
      errorText.hidden = false;
    });
}

function displayCatInfo(data) {
  const { url, breeds } = data;
  const breedInfo = breeds[0];

  const markup = `
    <img class="breed-img" src="${url}" alt="cat" />
    <h2>${breedInfo.name}</h2>
    <p><strong>Опис:</strong> ${breedInfo.description}</p>
    <p><strong>Темперамент:</strong> ${breedInfo.temperament}</p>
  `;

  catInfoDiv.innerHTML = markup;
  catInfoDiv.hidden = false;
}
