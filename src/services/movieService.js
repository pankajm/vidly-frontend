import httpService from "./httpService";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return httpService.get(apiEndPoint);
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId));
}

export function createMovie(movie) {
  return httpService.post(apiEndPoint, movie);
}

export function updateMovie(movieId, movie) {
  return httpService.put(movieUrl(movieId), movie);
}
