import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../providers/authProvider';

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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './TopNav.scss';

const TopNav = props => {
  const { login, register, logout, auth, user } = useContext(authContext);
  const history = useHistory();

  //
  // Loing Form state and methods
  //
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // Close login dialog and clear form
  const handleLoginClose = () => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginErrorMessage('');
    setLoginOpen(false);
  };

  // Submit the login form
  const loginSubmit = async () => {
    const { result, error } = await login(loginEmail, loginPassword);
    if (result === 'success') {
      handleLoginClose();
      setSnackOpen(true);
    } else {
      setLoginErrorMessage(error.response.data.error);
    }
  };


  //
  // Registration state and methods
  //

  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerImage, setRegisterImage] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const handleRegisterClose = () => {
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterPasswordConfirmation('');
    setRegisterName('');
    setRegisterPhone('');
    setRegisterImage('');
    setRegisterErrorMessage('');
    setRegisterOpen(false);
  };

  const registerSubmit = async () => {
    // Make sure password and confirmation match.
    if (registerPassword !== registerPasswordConfirmation) {
      return setRegisterErrorMessage('Passwords must match');
    }

    const formData = {
      name: registerName,
      email: registerEmail,
      image: registerImage,
      password: registerPassword,
      phone: registerPhone
    };
    const { result, error } = await register(formData);

    if (result === 'success') {
      // TODO: add a toast notification to show success.
      handleRegisterClose()
    } else {
      console.log(error.response);
      setRegisterErrorMessage('There was an error creating your account');
    }
  };

  // Snackbars: state and methods
  const [snackOpen, setSnackOpen] = useState(false);
  const [loggedOutOpen, setLoggedOutOpen] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackOpen && setSnackOpen(false);
    loggedOutOpen && setLoggedOutOpen(false);
  };

  const handleLogout = () => {
    logout();
    setLoggedOutOpen(true);
  };

  return (
    <nav>
      <AppBar position="static">
        <ToolBar className="topnav__toolbar">
          <div className="topnav__toolbar--left">
            <Typography variant="h5" onClick={() => history.push('/')} className="topnav__logo">
              Carbnb
            </Typography>
          </div>
          <div>
            {!auth && (
              <>
                <Button color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>
                <Button color="inherit" onClick={() => setRegisterOpen(true)}>Register</Button>
              </>
            )}
            {auth && (
              <>
                <Button color="inherit" onClick={() => history.push('/user-dashboard')}>{user.name}'s Dashboard</Button>
                <Button color="inherit" onClick={handleLogout}>Log Out</Button>
              </>
            )}
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
            onChange={event => setLoginEmail(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="login-password"
            type="password"
            label="Password"
            fullWidth
            value={loginPassword}
            onChange={event => setLoginPassword(event.target.value)}
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
        <DialogContent className="topnav__login--error">
          {registerErrorMessage && <DialogContentText>{registerErrorMessage}</DialogContentText>}
          <TextField
            margin="dense"
            id="register-email"
            type="email"
            label="Email Address"
            fullWidth
            value={registerEmail}
            onChange={event => setRegisterEmail(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="register-name"
            type="input"
            label="Full Name"
            fullWidth
            value={registerName}
            onChange={(event) => setRegisterName(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="register-phone"
            type="input"
            label="Phone Number"
            fullWidth
            value={registerPhone}
            onChange={(event) => setRegisterPhone(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="register-image"
            type="input"
            label="Avatar Image"
            fullWidth
            value={registerImage}
            onChange={(event) => setRegisterImage(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="register-password"
            type="password"
            label="Password"
            value={registerPassword}
            onChange={event => setRegisterPassword(event.target.value)}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="register-password-confirm"
            type="password"
            label="Confirm Password"
            value={registerPasswordConfirmation}
            onChange={event => setRegisterPasswordConfirmation(event.target.value)}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleRegisterClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={registerSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <MuiAlert onClose={handleCloseSnack} severity="success" elevation={6} variant="filled">
          Successfully logged in as {user.name}
        </MuiAlert>
      </Snackbar>

      <Snackbar open={loggedOutOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <MuiAlert onClose={handleCloseSnack} severity="info" elevation={6} variant="filled">
          Logged out
        </MuiAlert>
      </Snackbar>
    </nav>
  );
};

export default TopNav;
