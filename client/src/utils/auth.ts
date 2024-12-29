import { JwtPayload, jwtDecode } from 'jwt-decode';

// the functions below were taken from Module 14 Activity 26 "auth.ts"
class AuthService {
  getProfile() {
    // ✅ TODO: return the decoded token
    // Decode the JSON Web Token (JWT) using the jwtDecode function, specifying the expected payload type as UserData.
    // The getToken() method is called to retrieve the JWT, which is then passed to jwtDecode to extract and return its payload.
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // ✅ TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // ✅ TODO: return a value that indicates if the token is expired
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
    } catch (err) {
      // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
      return false;
    }
  }

  getToken(): string {
    // ✅ TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }
  
  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    // ✅ TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // ✅ TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // ✅ TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // ✅ TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
