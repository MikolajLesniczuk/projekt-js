import './sass/main.scss';


async function fetchFilms(page = 1) {
    try{
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=6fc014c055bacb8460b83603c43b9093&page=${page}&per_page=9`);
    const data = await response.json();
    console.log(data.results);
    renderGallery(data.results);
    renderPagination(data.total_pages);
    return data;
    }
    catch(error) {
        console.log(error.toString())
    }
  }
  
  const gallery = document.querySelector('.gallery');
  const pageList = document.querySelector('.page-list');
  let currentPage = 1;
  
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
  
  
  function renderPagination(totalPages) {
    const maxVisibleButtons = 11;
    let pageButtons = '';
    let startPage = 1;
    let endPage = totalPages;
  
    if (totalPages > maxVisibleButtons) {
      const middleButtonCount = maxVisibleButtons - 4;
      const sideButtonCount = Math.floor(middleButtonCount / 2);
      const isEven = middleButtonCount % 2 === 0;
  
      if (currentPage <= sideButtonCount + 1) {
        endPage = maxVisibleButtons - 2;
      } else if (currentPage >= totalPages - sideButtonCount) {
        startPage = totalPages - maxVisibleButtons + 3;
      } else {
        startPage = currentPage - sideButtonCount + (isEven ? 1 : 0);
        endPage = currentPage + sideButtonCount;
      }
  
      pageButtons += `<li><button class="page-button prev-button">&laquo;</button></li>`;
  
      if (startPage > 1) {
        pageButtons += `<li><button class="page-button">1</button></li>`;
        if (startPage > 2) {
          pageButtons += `<li><span class="ellipsis">...</span></li>`;
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageButtons += `<li><button class="page-button">${i}</button></li>`;
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons += `<li><span class="ellipsis">...</span></li>`;
        }
        pageButtons += `<li><button class="page-button">${totalPages}</button></li>`;
      }
  
      pageButtons += `<li><button class="page-button next-button">&raquo;</button></li>`;
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons += `<li><button class="page-button">${i}</button></li>`;
      }
    }
  
    pageList.innerHTML = pageButtons;
  
    const pageButtonsArray = Array.from(pageList.querySelectorAll('.page-button'));
  
    pageButtonsArray.forEach(button => {
      button.addEventListener('click', () => {
        const pageNumber = parseInt(button.textContent);
        if (!isNaN(pageNumber)) {
          currentPage = pageNumber;
          fetchFilms(currentPage);
          scrollToTop();
        } else if (button.classList.contains('prev-button')) {
          if (currentPage > 1) {
            currentPage--;
            fetchFilms(currentPage);
            scrollToTop();
          }
        } else if (button.classList.contains('next-button')) {
          if (currentPage < totalPages) {
            currentPage++;
            fetchFilms(currentPage);
            scrollToTop();
          }
        }
      });
    });
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  fetchFilms();
  