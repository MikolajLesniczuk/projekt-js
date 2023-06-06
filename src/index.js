import './sass/main.scss';

async function fetchFilms () {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=6fc014c055bacb8460b83603c43b9093');
    const data = await response.json();
    console.log(data.results);
    renderGallery(data.results);
    return data;
}

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
    const markup = images
      .map(image => {
        const { poster_path ,id, title,release_date } = image;
        return `
          <a class="gallery__link" href="${poster_path}">
            <div class="gallery-item" id="${id}">
              <div class="info">
                <p class="info-item">${title}</p>
                <p class="info-item">${release_date}</p>
            
              </div>
            </div>
          </a>
        `;
      })
      .join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);
  }

fetchFilms();
