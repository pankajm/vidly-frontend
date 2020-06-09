import httpService from "./httpService";
import { apiUrl } from "../config";

function movieUrl(id) {
  return `${apiUrl}/movies/${id}`;
}

export function getMovies() {
  return httpService.get(apiUrl + "/movies");
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId));
}

export function createMovie(movie) {
  return httpService.post(apiUrl + "/movies", movie);
}

export function updateMovie(movieId, movie) {
  return httpService.put(movieUrl(movieId), movie);
}
