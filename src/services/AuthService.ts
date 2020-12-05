import axios from 'axios';

console.log('process.env.VUE_APP_BACKEND_URL' , process.env.VUE_APP_BACKEND_URL)

let API_URL = process.env.VUE_APP_BACKEND_URL || 'http://localhost:8080/api/' 
API_URL += 'auth/';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password
    });
  }
}

export default new AuthService();
