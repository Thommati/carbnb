import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: "#ddd",
    padding: "0",
    // borderRadius: "8px",
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  h: {
    fontWeight: "bold",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.root.footer} maxWidth="sm">
      <Grid container spacing={3}>
        <div className={classes.root}></div>
        <Grid item xs={12}></Grid>
        <Grid item xs={4} align="center">
          <div className={classes.h}>Contact Us</div>
          <Grid item xs={4}>
            <LocationOnIcon></LocationOnIcon>
            <div>Vancouver</div>
          </Grid>
          <Grid item xs={4}>
            <EmailIcon></EmailIcon>
            <div>Contact@carbnb.ca</div>
          </Grid>
          <Grid item xs={4}>
            <PhoneIcon></PhoneIcon>
            <div>+1 604 000 car</div>
          </Grid>
        </Grid>
        <Grid item xs={4} align="center">
          <div className={classes.h}>About Us</div>
          <Grid item xs={4}>
            <div>How Carbnb works</div>
          </Grid>
          <Grid item xs={4}>
            <div>Careers</div>
          </Grid>
          <Grid item xs={4}>
            <div>Investors</div>
          </Grid>
        </Grid>
        <Grid item xs={4} align="center">
          <div className={classes.h}>Support</div>
          <Grid item xs={4}>
            <div>Our Covid-19 response</div>
          </Grid>
          <Grid item xs={4}>
            <div>FAQ's</div>
          </Grid>
          <Grid item xs={4}>
            <div>Cancellation Policy</div>
          </Grid>
        </Grid>
        <FacebookIcon></FacebookIcon>
        <InstagramIcon></InstagramIcon>
        <TwitterIcon></TwitterIcon>
      </Grid>
    </Container>
  );
}

export default Footer;
