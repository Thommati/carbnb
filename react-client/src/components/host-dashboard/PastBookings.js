import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import HostReview from "./HostReview";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  TableContainer:{
      borderRadius: 15,
      marginLeft: '20%',
      marginTop: '10%',
      maxWidth: "72%",
    },
  TableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.action.active,
    fontSize: '1.1rem',
  },
  name: {
    fontWeight: 'bold',
    color: '#ec407a'
  },
  status: {
    fontweight: 'bold',
    fontsize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  },
  TableFooter: {
    justifyContent: 'right'
  },
  Delete: {
    color: '#c62828',
    fontSize: 30
  },
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

export default function MainContainer({orders}) {
  const classes = useStyles();

  let today = new Date().toLocaleDateString("en-ca");
  today = new Date(today);

  return (
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="user-dashboard">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">BOOKING ID</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} >PICKUP DATE</TableCell>
            <TableCell className={classes.TableHeaderCell} >RETURN DATE</TableCell>
            <TableCell className={classes.TableHeaderCell} >PRICE</TableCell>
            <TableCell className={classes.TableHeaderCell} >RENTER NAME</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
          new Date(new Date(row.end_date).toLocaleDateString("en-ca")) < today && (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell>
                <Avatar alt={row.image} src={row.image} className={classes.AvatarLarge} />
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                    <Typography color="textSecondary" variant="subtitle2">{row.make} {row.model}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">{new Date(row.start_date).toLocaleDateString("en-ca")}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">{new Date(row.end_date).toLocaleDateString("en-ca")}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">{row.price}</Typography>
              </TableCell>
              <TableCell>
                <Grid>
                  <Grid item>
                    <Typography className={classes.name}>{row.name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
                <TableCell>
                  <HostReview />
                </TableCell>
              </TableRow>
            )
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
};
