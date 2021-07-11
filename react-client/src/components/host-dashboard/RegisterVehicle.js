import React, {useEffect, useState} from 'react';
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
  TablePagination,
  TableFooter
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  TableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 1400
  },
  TableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
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

const tempHost = 2;

export default function RegisterVehicle() {
  const classes = useStyles();
  const [availability, setAvailability] = useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const response = await axios.get(`/api/availability?ownerId=${tempHost}`);
        if (response.status === 200) {
          setAvailability(response.data);
          // console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAvailability();
  }, []);

  const deleteAvailability = async (id) => {
    try {
      const response = await axios.delete(`/api/availability/${id}`);
      setAvailability(prev => prev.filter(availability => availability.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let today = new Date().toLocaleDateString("en-ca");
  today = new Date(today);

  return (
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
            <TableCell className={classes.TableHeaderCell} ><AddCircleOutlineIcon className={classes.Add} onClick={handleClickOpen} style={{cursor: 'pointer'}}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availability.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.car_id}
              </TableCell>
              <TableCell>
                <Avatar alt={row.image} img src={row.image} className={classes.AvatarLarge} />
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                  <Typography color="primary" variant="subtitle2">{row.make} {row.model}</Typography>
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
                <DeleteForeverIcon className={classes.Delete} onClick={() => deleteAvailability(row.id)} style={{cursor: 'pointer'}}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={availability.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
};
