// import axios from "axios";
import{PixabayApi} from './js/pixabay-api'
import { showAlertMessage } from './js/show-messages';
import createPhotoCard from './template/photo-card.hbs'

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
};

const pixabayApi = new PixabayApi();

refs.searchFormEl.addEventListener('submit', onSubmitBtnClick);


function onSubmitBtnClick (e) {
    e.preventDefault();

    const formEl = e.target.elements;
    const queryEl = formEl.searchQuery.value;

    pixabayApi.fetchPhotos(queryEl)
        .then(data => {

            if (data.total === 0) {
                return showAlertMessage();
            }

            refs.galleryListEl.innerHTML = createPhotoCard(data.hits);
        });
}
// 