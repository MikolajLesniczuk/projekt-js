import { fetchFilms } from ".";

const pageList = document.querySelector('.page-list');
let currentPage = 1;

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

  export {renderPagination};
  export {scrollToTop};