
import { createContext, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({ email: "", name: "", id: "" });

  // Perform login process for the user & save authID, etc
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password
      });

      // Handle successful login
      // Set token on local storage - this will be used once the server is set up to require tokens
      localStorage.setItem('token', response.data);

      // Set auth and user states
      authenticateFromToken(response.data);

      return { result: 'success', error: null };
    } catch (err) {
      return { result: 'failed', error: err };
    }
  };

  const register = async formData => {
    try {
      const response = await axios.post('/api/users', {
        name: formData.name,
        email: formData.email,
        image: formData.image,
        password: formData.password,
        phone: formData.phone
      });

      // Handle successful retigstration (and simultaneous login)
      // Set token on local storage - this will be used once the server is set up to require tokens
      localStorage.setItem('token', response.data);

      // set auth and user state from token
      authenticateFromToken(response.data);

      return { result: 'success', error: null };
    } catch (err) {
      return { result: 'failed', error: err }
    }
  };

  const logout = () => {
    setUser({});
    setAuth(false);
    localStorage.removeItem('token');
  };

  const checkForAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      authenticateFromToken(token);
    }
  };

  // Helper function to set auth and user state on login / register
  const authenticateFromToken = jwtToken => {
    const token = jwtDecode(jwtToken);
    setAuth(true);
    setUser({
      is: token.sub,
      email: token.email,
      image: token.image,
      name: token.name
    });
  };

  // authContext will expose these items
  const userData = { auth, user, login, register, logout, checkForAuthToken };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export const authContext = createContext();
