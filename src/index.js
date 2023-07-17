import {fetchBreeds, fetchCatByBreed} from './cat-api.js';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectors = {
    breedList: document.querySelector('.breed-select'),
    breedInfo: document.querySelector('.cat-info'),
    loaderInfo: document.querySelector('.loader'),
    errorInfo: document.querySelector('.error')
};

showLoader()
fetchBreeds()
.then(data => { 
createMarkupBreeds(data)
new SlimSelect({
    select: '.breed-select'
  })
})
.catch(error => {
    console.error(error);
    showError()
})
.finally(hideLoader)


function createMarkupBreeds(data) {
    const breeds = data.map(({id, name}) => {
        return `<option value="${id}" class ="select-option">${name}</option>`;
    })
    .join('');   

    selectors.breedList.insertAdjacentHTML('beforeend', breeds);
};

selectors.breedList.addEventListener('change', handlerChangeSelect);

function handlerChangeSelect() {
   const breedCatInfo = selectors.breedList.value;

   showLoader();
   fetchCatByBreed(breedCatInfo)
   .then(data => {
    selectors.breedInfo.innerHTML = createMarkupCatInfo(data)
    console.log(data);
   })
   .catch(error => {
    console.error(error);
    selectors.catInfoDiv.innerHTML = '';
    showError()
  })
  .finally(hideLoader)
};

function createMarkupCatInfo(data) {
    return data
    .map(({url, breeds}) => { 
        return `<img src="${url}" alt="${breeds[0].name}" width="300px" />
                <h2 class="cat-name">${breeds[0].name}</h2>
                <p class="cat-description">${breeds[0].description}</p>
                <p class="cat-temperament">
                <span class="cat-temperament-title">Temperament:</span>${breeds[0].temperament}</p>`
    }).join('')          
};

function showLoader() {
    selectors.loaderInfo.style.display = 'block';
};

function hideLoader() {
        selectors.loaderInfo.style.display = 'none';
};

  function showError() {
    Notiflix.Notify.failure(selectors.errorInfo.textContent);
};












