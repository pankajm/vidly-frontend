import httpService from "./httpService";
import { apiUrl } from "../config";

export function getGenres() {
  return httpService.get(apiUrl + "/genres");
}
