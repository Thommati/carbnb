import React from 'react';
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
import CancelIcon from '@material-ui/icons/Cancel';

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
    color: theme.palette.secondary.dark
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
  }
}));

function createData(id, image, from, to, make, model, description, price, host, street_number, apartment_number, street, city, province, country, postal_code, status) {
  return { id, image, from, to, make, model, description, price, host, street_number, apartment_number, street, city, province, country, postal_code, status };
}

const rows = [
  createData(1, 'https://www.thetruthaboutcars.com/wp-content/uploads/2019/11/DSC0778-610x405-1.jpg', '2021-07-06', '2021-07-10', 'Honda', 'Civic', '4 Door', 480, 'Steven Gerrard', 1655, 'Apt', 'Powick Rd', 'Kelowna', 'British Columbia', 'Canada', 'V1X 4L1', 'in progress'),
  createData(2, 'https://press.porsche.com/download/prod/presse_pag/PressBasicData.nsf/Download?OpenAgent&attachmentid=1495263&show=1', '2021-07-17', '2021-07-18', 'Porsche', '911s', '2 Door', 500, 'Dominic Crisp', 999, 'Apt', 'Canada Place', 'Vancouver', 'British Columbia', 'Canada', 'V6C 3B5', 'upcoming'),
  createData(3, 'https://s1.1zoom.me/big0/719/Ferrari_488_Spider_Red_Cabriolet_528366_1280x853.jpg', '2021-08-01', '2021-08-03', 'Ferrari', 'Spyder', '2 Door', 2000, 'Hervinder Bhandal', 1125, 401, '12th Avenue', 'Vancouver', 'British Columbia', 'Canada', 'V6H 3Z3', 'upcoming'),
  createData(4, 'https://dealerimages.dealereprocess.com/image/upload/1746586.jpg', '2021-09-12', '2021-09-15', 'Ford', 'F150', '4 Door', 900, 'Avivit Weissman', 999, 'Apt', 'Canada Place', 'Vancouver', 'British Columbia', 'Canada', 'V6C 3B5', 'upcoming'),
  createData(5, 'https://i.ytimg.com/vi/X0wOU0F22yE/maxresdefault.jpg', '2021-10-21', '2021-07-22', 'Dodge', 'RAM 1500', '4 Door', 500, 'Matthew Thompson', 110, 'Apt', '9th Avenue SE', 'Calgary', 'Alberta', 'Canada', 'T2G 5A6', 'upcoming'),
  createData(6, 'https://images.caricos.com/m/mercedes-benz/2021_mercedes-benz_s-class/images/1024x768/2021_mercedes-benz_s-class_162_1024x768.jpg', '2021-07-10', '2021-07-14', 'Mercedes', 'S Class', '4 Door', 3000, 'Trent Alexander-Arnold', 1655, 'Apt', 'Powick Rd', 'Kelowna', 'British Columbia', 'Canada', 'V1X 4L1', 'cancelled'),
];

export default function MainContainer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
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
      <Table className={classes.table} aria-label="user-dashboard">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">BOOKING ID</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} >DATE FROM</TableCell>
            <TableCell className={classes.TableHeaderCell} >DATE TO</TableCell>
            <TableCell className={classes.TableHeaderCell} >HOST DETAILS</TableCell>
            <TableCell className={classes.TableHeaderCell} >STATUS</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell>
                <Avatar alt={row.image} img src={row.image}/>
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
              <Typography color="textSecondary" variant="body2">{row.from}</Typography>
              </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="body2">{row.to}</Typography>
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
                  <Typography
                    className={classes.status}
                    style={{
                      backgroundColor:
                      ((row.status === 'upcoming' && 'blue') ||
                      (row.status === 'in progress' && 'green') ||
                      (row.status === 'cancelled' && 'red'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
                <TableCell>
                    <CancelIcon />
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
