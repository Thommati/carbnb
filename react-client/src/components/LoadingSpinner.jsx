import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5rem auto'
  }
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <CircularProgress size="8rem" thickness={4} />
    </Container>
  );
};

export default LoadingSpinner;
