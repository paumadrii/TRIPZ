import jwt from 'jwt-decode';

class User {
  email = '';
  name = '';
  token = '';
  isAuthenticated = false;
  constructor(user) {
    if (user.token) {
      const payload = jwt(user.token);
      this.token = user.token;
      this.email = payload.email;
      this.name = payload.name;
      this.isAuthenticated = true;
    }
  }
}

export default User;
