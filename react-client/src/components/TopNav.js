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
  // State for log-in dialog
  const [open, setOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginConfirmPassword, setLoginConfirmPassword] = useState('');

  // Open login dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close login dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Login dialog - handle email input
  const handleLoginEmailChange = event => {
    setLoginEmail(event.target.value);
  };

  // Login dialog - handle password input
  const handleLoginPasswordChange = event => {
    setLoginPassword(event.target.value);
  };

  const handleLoginConfirmPasswordChange = event => {
    setLoginConfirmPassword(event.target.value);
  };

  // Submit the login form
  const loginSubmit = () => {
    console.log('Submit clicked');
  };

  return (
    <nav>
      <AppBar position="static">
        <ToolBar className="topnav__toolbar">
          <Typography variant="h5">
            Carbnb
          </Typography>
          <div>
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            <Button color="inherit">Register</Button>
          </div>
        </ToolBar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} aria-labelledby="login-dialog">
        <DialogTitle id="login-dialog">Login</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="login-email"
            type="email"
            label="Email Address"
            fullWidth
            value={loginEmail}
            onChange={handleLoginEmailChange}
          />
          <TextField
            margin="dense"
            id="login-password"
            type="password"
            label="Password"
            fullWidth
            value={loginPassword}
            onChange={handleLoginPasswordChange}
          />
          <TextField
            margin="dense"
            id="login-confirm-password"
            label="Confirm Password"
            fullWidth
            value={loginConfirmPassword}
            onChange={handleLoginConfirmPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={loginSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default TopNav;
