import React, {useEffect, useState, useContext } from 'react';
import  { Link } from 'react-router-dom';
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import axios from 'axios';
import { authContext } from '../../providers/authProvider';


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
  Delete: {
    color: '#c62828',
    fontSize: 30
  },
  View: {
    color: '#9ccc65',
    fontSize: 30
  },
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

export default function Favourites() {
  const { user } = useContext(authContext);
  const classes = useStyles();
  const [favourites, setFavourites] = useState([]);

  // Load all of a users' favourites into state, favourites
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const response = await axios.get(`/api/favourites/${user.id}`);
        if (response.status === 200) {
          setFavourites (response.data);
          // console.log('response data favourites', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getFavourites();
  }, [user.id]);

  // Delete a favourite from the database and update favourite state
  const deleteFavourites = async (userId, carId) => {
    try {
      await axios.delete(`/api/favourites/${userId}/${carId}`);
      setFavourites(prev => prev.filter(favourite => favourite.car_id !== carId));
    } catch (error) {
      console.error('Error deleting favourite from the favourites tab', error);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="favourites">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >HOST DETAILS</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favourites.map((row) => (
            <TableRow key={row.car_id}>
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
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                    <Typography color="textSecondary" variant="body2">{row.city}, {row.province}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
                <TableCell>
                  <Link to={`/cars/${row.car_id}`}><PageviewIcon className={classes.View} style={{cursor: 'pointer'}}/></Link>
                </TableCell>
                <TableCell>
                  <DeleteForeverIcon className={classes.Delete} onClick={() => deleteFavourites(row.user_id, row.car_id)} style={{cursor: 'pointer'}} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
};
