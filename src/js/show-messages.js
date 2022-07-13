import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function showAlertNoImagesMatchingMessage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
};

export function showInfoMessage() {
    Notify.info("We're sorry, but you've reached the end of search results.")
}

export function showSuccesMessage(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`)
}

export function showAlertNoImputQueryMessage() {
    Notify.failure(`You didn't input anything for searching. Please input some query.`)
}