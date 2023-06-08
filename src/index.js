import './sass/main.scss';
import { renderPagination } from './renderPagination';
import { renderGallery } from './renderGallery';
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
  
  
  
 
 
  
  fetchFilms();
  
  export {fetchFilms}