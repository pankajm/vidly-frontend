import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await httpService.post(apiEndPoint, {
    email: username,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
