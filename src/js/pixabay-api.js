import axios from "axios";

export class PixabayApi {
  #URL_BASE = 'https://pixabay.com/';
  #API_KEY = '28568095-bde867e5bbf77d76bd3de06b6';

  constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 40;
  }

  async fetchPhotos(query) {
    const search = new URLSearchParams({
        q: query,
        page: this.page,
        per_page: this.per_page,
        key: this.#API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    return await axios
      .get(`${this.#URL_BASE}/api/?${search}`)
      .then(response => {
        if (response.data.length === 0) {
          throw new Error('Not found');
        }
        return response.data;
      })
      .catch(err => console.log(err));
    
    // fetch(`${this.#URL_BASE}/api/?${search}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(response.status);
    //     }

    //     return response.json();
    //   })
    //   .catch(err => console.log(err));
    }
    
  increasePage() {
    this.page += 1;
  }

  setQuery(query) {
    this.query = query;
  }

}