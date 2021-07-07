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
  item: {
    maxWidth: "100%",
  },
  icon: {
    marginRight: "20px",
  },
}));

const divStyle = {
  borderTop: "2px solid #ddd",
  maxWidth: "100%",
};

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.root.footer} maxWidth="sm">
      <div style={divStyle}>
        <Grid container spacing={3}>
          <div className={classes.root}></div>
          <Grid item xs={12}></Grid>
          <Grid item xs={4} align="center">
            <div className={classes.h}>Contact Us</div>
            <br />
            <Grid item xs={4} className={classes.item}>
              <LocationOnIcon></LocationOnIcon>
              <div>Vancouver</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <EmailIcon></EmailIcon>
              <div>Contact@carbnb.ca</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <PhoneIcon></PhoneIcon>
              <div>+1 604 000 car</div>
              <br />
            </Grid>
          </Grid>
          <Grid item xs={4} align="center">
            <div className={classes.h}>About Us</div>
            <br />
            <Grid item xs={4} className={classes.item}>
              <div>How Carbnb works</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <div>Careers</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <div>Investors</div>
              <br />
            </Grid>
          </Grid>
          <Grid item xs={4} align="center">
            <div className={classes.h}>Support</div>
            <br />
            <Grid item xs={4} className={classes.item}>
              <div>Our Covid-19 response</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <div>FAQ's</div>
              <br />
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <div>Cancellation Policy</div>
              <br />
            </Grid>
          </Grid>
          <FacebookIcon className={classes.icon}></FacebookIcon>
          <InstagramIcon className={classes.icon}></InstagramIcon>
          <TwitterIcon className={classes.icon}></TwitterIcon>
        </Grid>
      </div>
    </Container>
  );
}

export default Footer;
