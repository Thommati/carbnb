import React, {useEffect, useState } from 'react';
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
import PageviewIcon from '@material-ui/icons/Pageview';
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

const tempUser = 3;

export default function Favourites() {
  const classes = useStyles();
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = React.useState(0);
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const response = await axios.get(`/api/favourites/${tempUser}`);
        if (response.status === 200) {
          setFavourites (response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getFavourites();
  }, []);

  const deleteFavourites = async (userId, carId) => {
    try {
      const response = await axios.delete(`/api/favourites/${userId}/${carId}`);
      setFavourites(prev => prev.filter(favourite => favourite.userId !== userId));
    } catch (error) {
      console.error(error);
    }
  }



  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="favourites">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} >PRICE</TableCell>
            <TableCell className={classes.TableHeaderCell} >HOST DETAILS</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favourites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.car_id}>
              <TableCell>
                <Avatar alt={row.image} img src={row.image} className={classes.AvatarLarge} />
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                  <Typography color="primary" variant="subtitle2">{row.make} {row.model}</Typography>                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">${row.price} /day</Typography>
              </TableCell>
              <TableCell>
                <Grid Container>
                  <Grid item>
                    <Typography className={classes.name}>{row.host}</Typography>
                    <Typography color="textSecondary" variant="body2">{row.street_number} {row.street},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.city},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.province},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.postal_code}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
                <TableCell>
                <a href={`/cars/${row.car_id}`}><PageviewIcon className={classes.View} style={{cursor: 'pointer'}}/></a>
                </TableCell>
                <TableCell>
                  <DeleteForeverIcon className={classes.Delete} onClick={() => deleteFavourites(row.user_id, row.car_id)} style={{cursor: 'pointer'}} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={favourites.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
};
