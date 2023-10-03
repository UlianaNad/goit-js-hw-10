import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'


const refs = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    error: document.querySelector('.error')
}



function renderSelect(){
    showLoader();
    fetchBreeds()
    .then(data => {

        const selectEl = data.map(el => {
            return `<option value="${el.id}">${el.name}</option>`;
        });

        refs.breedSelect.innerHTML = selectEl;
        // new SlimSelect({
        //     select: '#selectElement',
        //   })
    })
    .catch(showError)
    .finally(hideLoader);   
}
window.addEventListener("DOMContentLoaded", renderSelect);

function renderCatTemplate (cat){
    return `
        <div class='cat-el'>
            <h4>Breed name: ${cat.breeds[0].name}</h4>
            <p>Description: ${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>
            <figure>
                <img src="${cat.url}" alt="" srcset="">
            </figure>
        </div>`;
} 

refs.breedSelect.addEventListener('change', (e) => {
    const optionValue = e.target.value;
    showLoader();
    fetchCatByBreed(optionValue).then(data => {
        refs.catInfo.innerHTML = renderCatTemplate(...data);
    })
    .catch(showError)
    .finally(hideLoader);
});


// loaders

function showLoader(){
    document.body.classList.add('show-loader');
    refs.breedSelect.classList.add('is-hidden');
    refs.catInfo.classList.add('is-hidden');
}
function hideLoader(){
    document.body.classList.remove('show-loader');
    refs.breedSelect.classList.remove('is-hidden');
    refs.catInfo.classList.remove('is-hidden');
}

// Errors
function showError(){
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

