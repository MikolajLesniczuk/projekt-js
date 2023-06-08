const gallery = document.querySelector('.gallery');
 
  
  function renderGallery(films) {
    gallery.innerHTML = '';
  
    const filmsPerPage = 9;
    const markup = films
      .map(film => {
        const { poster_path, id, title, release_date } = film;
        if (!release_date) {
          return ''; // Pomijanie filmu bez daty produkcji
        }
        const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        const productionYear = new Date(release_date).getFullYear();
  
        return `
          <a class="gallery__link">
            <div class="gallery-item" id="${id}">
              <img class="gallery-item__img" src="${posterUrl}" loading="lazy" />
              <p class="info-item">${title}</p>
              <p class="info-item">${productionYear}</p>
            </div>
          </a>
        `;
      })
      .join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);
  }
  
  export {renderGallery}