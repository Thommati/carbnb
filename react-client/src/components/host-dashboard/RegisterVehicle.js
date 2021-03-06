import React, { useContext, useEffect, useState } from 'react';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddVehicle from './AddVehicle';
import { authContext } from '../../providers/authProvider';
import axios from 'axios';

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
  Mail: {
  color: '#1e88e5',
  fontSize: 30
  },
  Delete: {
    color: '#c62828',
    fontSize: 30
  },
  Add: {
    fontSize: 30
  },
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

export default function RegisterVehicle({ locations }) {
  const { auth, user } = useContext(authContext);
  const classes = useStyles();
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    const getUsersCars = async () => {
      try {
        const response = await axios.get(`/api/cars/users/${user.id}`);
        setCars(response.data);
      } catch (err) {
        console.error('Error loading cars for user from API', err);
      }
    }
    if (auth && user.id) {
      getUsersCars();
    }
  }, [user.id, auth]);

  const deleteCars= async (id) => {
    try {
      await axios.delete(`/api/cars/${id}`);
      setCars(prev => prev.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car from database', error);
    }
  }

  const handleClickOpen = () => {
    if (auth && locations.length > 0) {
      setOpen(true);
    } else {
      setSnackOpen(true);
    }
  };

  const handleAddVehicleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const handleVehiclesUpdated = vehicle => {
    setCars(prev => [...prev, vehicle]);
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="host-availability">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">CAR ID</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >
              <AddCircleOutlineIcon className={classes.Add} onClick={handleClickOpen} style={{cursor: 'pointer'}}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell>
                <Avatar alt={`${row.make} ${row.model}`} src={row.image} className={classes.AvatarLarge} />
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
              </TableCell>
              <TableCell>
              </TableCell>
                <TableCell>
                <DeleteForeverIcon className={classes.Delete} onClick={() => deleteCars(row.id)} style={{cursor: 'pointer'}}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    </TableContainer>
      <AddVehicle
        open={open}
        close={handleAddVehicleClose}
        locations={locations}
        vehiclesUpdated={handleVehiclesUpdated}
      />

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <MuiAlert onClose={handleCloseSnack} severity="warning" elevation={6} variant="filled">
          You need to have at least one location on file to register a car
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
