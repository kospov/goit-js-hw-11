import{PixabayApi} from './js/pixabay-api'
import { showAlertMessage, showInfoMessage } from './js/show-messages';
import createPhotoCard from './template/photo-card.hbs'

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl:document.querySelector('.load-more'),
};

let queryEl = null;
let totalPages = 0;

const pixabayApi = new PixabayApi();

refs.searchFormEl.addEventListener('submit', onSubmitBtnClick);

refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

function onSubmitBtnClick (e) {
    e.preventDefault();

    const formEl = e.target.elements;
    queryEl = formEl.searchQuery.value;

    pixabayApi.page = 1;

    pixabayApi.fetchPhotos(queryEl)
        .then(data => {
            if (data.totalHits === 0) {
                refs.galleryListEl.innerHTML = '';

                refs.loadMoreBtnEl.classList.add("is-hidden");

                showAlertMessage();

                return;
            } else {
                const { page, per_page } = pixabayApi;

                // console.log('onSubmitBtnClick - page:', page);
                    
                totalPages = Math.ceil(data.totalHits / per_page);
        
                if (page === totalPages) {
                    refs.loadMoreBtnEl.classList.add("is-hidden");

                    refs.galleryListEl.innerHTML = createPhotoCard(data.hits);

                    return;
                } else {
                refs.galleryListEl.innerHTML = createPhotoCard(data.hits);

                refs.loadMoreBtnEl.classList.remove("is-hidden");
                };
            }
        });
}

function onLoadMoreBtnClick() {
    pixabayApi.increasePage();

    pixabayApi.fetchPhotos(queryEl)
        .then(data => {
            const { page, per_page } = pixabayApi;

            // console.log('onLoadMoreBtnClick - page:', page);
                    
            totalPages = Math.ceil(data.totalHits / per_page);
        
            if (page === totalPages) {
                refs.loadMoreBtnEl.classList.add("is-hidden");
                showInfoMessage();
                return;
            };
            
            refs.galleryListEl.insertAdjacentHTML('beforeend', createPhotoCard(data.hits));
    });
}
