// import axios from "axios";
import{PixabayApi} from './js/pixabay-api'
import { showAlertMessage } from './js/show-messages';
import createPhotoCard from './template/photo-card.hbs'

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl:document.querySelector('.load-more'),
};

const pixabayApi = new PixabayApi();

// refs.loadMoreBtnEl.classList.add('is-hidden')

refs.searchFormEl.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick (e) {
    e.preventDefault();

    const formEl = e.target.elements;
    const queryEl = formEl.searchQuery.value;

    refs.loadMoreBtnEl.classList.toggle('is-hidden');

    pixabayApi.fetchPhotos(queryEl)
        .then(data => {
            if (data.totalHits === 0) {
                refs.galleryListEl.innerHTML = '';
                refs.loadMoreBtnEl.classList.add("is-hidden");

                showAlertMessage();
                console.log(typeof data.totalHits);
                return;
            } else {
                refs.galleryListEl.innerHTML = createPhotoCard(data.hits);
                console.log(data.totalHits);

                refs.loadMoreBtnEl.classList.remove("is-hidden");
            }

            
        });
}