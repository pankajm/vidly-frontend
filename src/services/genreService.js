import httpService from "./httpService";
import { apiUrl } from "../config";

const apiEndPoint = "/genres";

export function getGenres() {
  return httpService.get(apiEndPoint);
}
