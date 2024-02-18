import { Injectable } from "@angular/core";

const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: "root"
})
export class TokenStorageService {
  constructor() { }

  setJwtToken(token: string) {
    if (!token) {
      return;
    }
    this.removeToken(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getJwtToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  setRefreshToken(token: string) {
    this.removeToken(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  removeToken(tokenKey: string) {
    localStorage.removeItem(tokenKey);
  }

  removeLocalStorage() {
    localStorage.clear();
  }

}
