import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./PopularLocations.scss";

import vanc from "../pics/vancouver.jpg";
import cal from "../pics/calgary.jpg";
import torn from "../pics/toronto.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  popularLocations: {
    // backgroundColor: "#ddd",
    padding: "30px",
    // borderRadius: "8px",
  },
  h: {
    borderTop: "2px solid #ddd",
    maxWidth: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
}));

function PopularLocations(props) {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.popularLocations} maxWidth="sm">
        <div className={classes.h}>Popular Locations</div>
        <Grid container spacing={3}>
          <div className={classes.root}>
            <Grid
              item
              xs={6}
              align="center"
              onClick={() => {
                props.setLocation("Vancouver");
              }}
            >
              <Avatar alt="Vancouver" src={vanc} className={classes.large} />
              <div className="place-name">Vancouver</div>
            </Grid>
            <Grid
              item
              xs={6}
              align="center"
              onClick={() => {
                props.setLocation("Calgary");
              }}
            >
              <Avatar alt="Calgary" src={cal} className={classes.large} />
              <div className="place-name">Calgary</div>
            </Grid>
            <Grid
              item
              xs={6}
              align="center"
              onClick={() => {
                props.setLocation("Toronto");
              }}
            >
              <Avatar alt="Toronto" src={torn} className={classes.large} />
              <div className="place-name">Toronto</div>
            </Grid>
            <Grid item xs={6} align="center">
              <Avatar
                alt="Victoria"
                src="https://images.unsplash.com/photo-1589226198562-41f998adf60b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                className={classes.large}
              />
              <div className="place-name">Victoria</div>
            </Grid>
            <Grid item xs={6} align="center">
              <Avatar
                alt="Edmonton"
                src="https://images.unsplash.com/photo-1539152620375-ef3504215b05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZWRtb250b258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                className={classes.large}
              />
              <div className="place-name">Edmonton</div>
            </Grid>
            <Grid item xs={6} align="center">
              <Avatar
                alt="Saskatoon"
                src="https://images.unsplash.com/photo-1523592131502-9ae85180b9f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
                className={classes.large}
              />
              <div className="place-name">Saskatoon</div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default PopularLocations;
