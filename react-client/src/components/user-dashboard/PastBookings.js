import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

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

import UserReview from "./UserReview";
import { authContext } from '../../providers/authProvider'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  TableContainer:{
      borderRadius: 15,
      marginLeft: '20%',
      marginTop: '15%',
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
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

export default function PastBookings() {
  const { user } = useContext(authContext);
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${user.id}`);
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (user.id) {
      getOrders();
    }

  }, [user.id]);

  useEffect(() => {
    const getExistingReviews = async () => {
      const response = await axios.get(`/api/reviews?renterId=${user.id}`);

      const reviewObj = {};
      for (const review of response.data) {
        reviewObj[review.car_id] = { ...review };
      }
      setReviews(reviewObj);
    };

    if (user.id) {
      getExistingReviews();
    }
  }, [user.id]);

  const handleReviewUpdated = review => {
    setReviews(prev => {
      return {
        ...prev,
        [review.car_id]: { ...review }
      };
    });
  };

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
            <TableCell className={classes.TableHeaderCell} >HOST DETAILS</TableCell>
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
                <Grid container>
                  <Grid item>
                    <Typography className={classes.name}>{row.owners_name}</Typography>
                    <Typography color="textSecondary" variant="body2">{row.street_number} {row.street},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.city},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.province},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.postal_code}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
                <TableCell>
                  {
                    reviews[row.car_id] !== undefined && <div>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={reviews[row.car_id].rating}
                        edit={false}
                      />
                      <small>{reviews[row.car_id].comments}</small>
                    </div>
                  }
                  { !reviews[row.car_id] && <UserReview carId={row.car_id} handleReviewUpdated={handleReviewUpdated} /> }
                </TableCell>
              </TableRow>
          )
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
};
