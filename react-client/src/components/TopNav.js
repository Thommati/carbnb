import axios from 'axios';
// import jwtDecode from 'jwt-decode';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './TopNav.scss';
import { useState } from 'react';

const TopNav = props => {
  //
  // Login state and methods
  //

  // State for login dialog
  const [loginOpen, setLoginOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Error messages for failed login
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // Open login dialog
  const handleClickLoginOpen = () => {
    setLoginOpen(true);
  };

  // Close login dialog and clear form
  const handleLoginClose = () => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginErrorMessage('');
    setLoginOpen(false);
  };

  // Login dialog - handle email input
  const handleLoginEmailChange = event => {
    setLoginEmail(event.target.value);
  };

  // Login dialog - handle password input
  const handleLoginPasswordChange = event => {
    setLoginPassword(event.target.value);
  };

  // Submit the login form
  const loginSubmit = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: loginEmail,
        password: loginPassword
      });

      // Handle successful login
      if (response.status === 200) {
        localStorage.setItem('token', response.data);
        // TODO: Call method that decodes token and sets global user object.
        handleLoginClose();
      } else {
        console.log(response.status);
      }
    } catch (err) {
      // Handle failed login.
      if (err.response.status === 401) {
        setLoginErrorMessage(err.response.data.error);
      } else {
        setLoginErrorMessage('Login server error.');
      }
    }
  };

  //
  // Registration state and methods
  //

  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerEmail, setRegisterEmail] =useState('');

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleRegisterEmailChange = event => {
    setRegisterEmail(event.target.value);
  };

  const registerSubmit = async () => {
    console.log('Submit registration clicked');
  };

  return (
    <nav>
      <AppBar position="static">
        <ToolBar className="topnav__toolbar">
          <Typography variant="h5">
            Carbnb
          </Typography>
          <div>
            <Button color="inherit" onClick={handleClickLoginOpen}>Login</Button>
            <Button color="inherit">Register</Button>
          </div>
        </ToolBar>
      </AppBar>

      <Dialog open={loginOpen} onClose={handleLoginClose} aria-labelledby="login-dialog">
        <DialogTitle id="login-dialog">Login</DialogTitle>
        <DialogContent  className="topnav__login--error">
          {loginErrorMessage && <DialogContentText>{loginErrorMessage}</DialogContentText>}
          <TextField
            margin="dense"
            id="login-email"
            type="email"
            label="Email Address"
            fullWidth
            value={loginEmail}
            onChange={handleLoginEmailChange}
            required
          />
          <TextField
            margin="dense"
            id="login-password"
            type="password"
            label="Password"
            fullWidth
            value={loginPassword}
            onChange={handleLoginPasswordChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={loginSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={registerOpen} onClose={handleRegisterClose} aria-labelledby="register-dialog">
        <DialogTitle id="register-dialog">Register</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            id="register-email"
            type="email"
            label="Email Address"
            fullWidth
            value={registerEmail}
            onChange={handleRegisterEmailChange}
            required
          />
          <TextField
            margin="dense"

          />
          <TextField
            margin="dense"
          />
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default TopNav;
