import React, {useEffect} from 'react';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
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

function createData(image, make, model, price, host, street_number, apartment_number, street, city, province, country, postal_code) {
  return { image, make, model, price, host, street_number, apartment_number, street, city, province, country, postal_code };
}

const rows = [
  createData('https://press.porsche.com/download/prod/presse_pag/PressBasicData.nsf/Download?OpenAgent&attachmentid=1495263&show=1', 'Porsche', '911s', 500, 'Dominic Crisp', 999, 'Apt', 'Canada Place', 'Vancouver', 'British Columbia', 'Canada', 'V6C 3B5'),
  createData('https://s1.1zoom.me/big0/719/Ferrari_488_Spider_Red_Cabriolet_528366_1280x853.jpg', 'Ferrari', 'Spyder', 1000, 'Hervinder Bhandal', 1125, 401, '12th Avenue', 'Vancouver', 'British Columbia', 'Canada', 'V6H 3Z3'),
  createData('https://dealerimages.dealereprocess.com/image/upload/1746586.jpg', 'Ford', 'F150', 200, 'Avivit Weissman', 999, 'Apt', 'Canada Place', 'Vancouver', 'British Columbia', 'Canada', 'V6C 3B5'),
  createData('https://i.ytimg.com/vi/X0wOU0F22yE/maxresdefault.jpg', 'Dodge', 'RAM 1500', 250, 'Matthew Thompson', 110, 'Apt', '9th Avenue SE', 'Calgary', 'Alberta', 'Canada', 'T2G 5A6'),
];

export default function Favourites() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  useEffect(() => {

  });
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Avatar alt={row.image} img src={row.image} className={classes.AvatarLarge} />
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                  <Typography color="primary" variant="subtitle2">{row.make} {row.model}</Typography>
                    {/* <Typography>{row.description}</Typography> */}
                  </Grid>
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
                  <VisibilityIcon className={classes.View}/>
                </TableCell>
                <TableCell>
                  <DeleteForeverIcon className={classes.Delete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
};
