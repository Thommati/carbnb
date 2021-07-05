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
    backgroundColor: "#ddd",
    padding: "30px",
    borderRadius: "8px",
  },
}));

function PopularLocations(props) {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.popularLocations} maxWidth="sm">
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
              <div class="place-name">Vancouver</div>
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
              <div class="place-name">Calgary</div>
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
              <div class="place-name">Toronto</div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default PopularLocations;
