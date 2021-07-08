
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
      const decodedToken = jwtDecode(response.data);

      // Set auth and user states
      setAuth(true);
      setUser({
        is: decodedToken.sub,
        email: decodedToken.email,
        image: decodedToken.image,
        name: decodedToken.name
      });

      return { loginResult: 'success', error: null };
    } catch (err) {
      return { loginResult: 'failed', error: err };
    }
  };

  const logout = () => {
    setUser({});
    setAuth(false);
    localStorage.removeItem('token');
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export const authContext = createContext();
