import httpService from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  return httpService.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
