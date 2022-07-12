import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function showAlertMessage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}