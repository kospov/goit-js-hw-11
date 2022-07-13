import{PixabayApi} from './js/pixabay-api'
import { showAlertNoImagesMatchingMessage, showInfoMessage, showSuccesMessage, showAlertNoImputQueryMessage } from './js/show-messages';
import createPhotoCard from './template/photo-card.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl:document.querySelector('.load-more'),
};

let queryEl = null;
let totalPages = 0;

const pixabayApi = new PixabayApi();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchFormEl.addEventListener('submit', onSubmitBtnClick);

refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onSubmitBtnClick (e) {
    e.preventDefault();

    const formEl = e.target.elements;
    queryEl = (formEl.searchQuery.value).trim();

    pixabayApi.page = 1;

    console.log(queryEl);

    if (queryEl === '') {
        refs.galleryListEl.innerHTML = '';

        refs.loadMoreBtnEl.classList.add("is-hidden");

        showAlertNoImputQueryMessage();
    } else {
        await pixabayApi.fetchPhotos(queryEl)
        .then(data => {
            if (data.totalHits === 0) {
                refs.galleryListEl.innerHTML = '';

                refs.loadMoreBtnEl.classList.add("is-hidden");

                showAlertNoImagesMatchingMessage();

                return;
            } else {
                const { page, per_page } = pixabayApi;
                
                // console.log('onSubmitBtnClick - page:', page);
                showSuccesMessage(data.totalHits);
                
                totalPages = Math.ceil(data.totalHits / per_page);
                
                if (page === totalPages) {
                    refs.loadMoreBtnEl.classList.add("is-hidden");
                    
                    refs.galleryListEl.innerHTML = createPhotoCard(data.hits);
                    
                    return;
                } else {
                    refs.galleryListEl.innerHTML = createPhotoCard(data.hits);

                    lightbox.refresh();
                    
                    refs.loadMoreBtnEl.classList.remove("is-hidden");
                };

            }
        });
    }
}

async function onLoadMoreBtnClick() {
    pixabayApi.increasePage();

    await pixabayApi.fetchPhotos(queryEl)
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

            lightbox.refresh();
    });
}
