import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { authContext } from "../../providers/authProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      background: "#FFFFF0",
    },
  },
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
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  name: {
    fontWeight: "bold",
    color: "#ec407a",
  },
  status: {
    fontweight: "bold",
    fontsize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  TableFooter: {
    justifyContent: "right",
  },
  Mail: {
    color: "#1e88e5",
    fontSize: 30,
  },
  Delete: {
    color: "#c62828",
    fontSize: 30,
  },
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function MainContainer() {
  const { user } = useContext(authContext);
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

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
    };
    if (user.id) {
      getOrders();
    }
  }, [user.id]);

  const deleteOrders = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  let today = new Date().toLocaleDateString("en-ca");
  today = new Date(today);

  return (
  <div className={classes.Main}>
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="user-dashboard">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">
              BOOKING ID
            </TableCell>
            <TableCell className={classes.TableHeaderCell}></TableCell>
            <TableCell className={classes.TableHeaderCell}>
              VEHICLE INFO
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              PICKUP DATE
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              RETURN DATE
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>PRICE</TableCell>
            <TableCell className={classes.TableHeaderCell}>
              HOST DETAILS
            </TableCell>
            <TableCell className={classes.TableHeaderCell}></TableCell>
            <TableCell className={classes.TableHeaderCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) =>
                new Date(new Date(row.end_date).toLocaleDateString("en-ca")) >
                  today && (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        alt={row.image}
                        src={row.image}
                        className={classes.AvatarLarge}
                      />
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item>
                          <Typography color="primary" variant="subtitle2">
                            {row.make} {row.model}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {new Date(row.start_date).toLocaleDateString("en-ca")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {new Date(row.end_date).toLocaleDateString("en-ca")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {row.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item>
                          <Typography className={classes.name}>
                            {row.owners_name}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.street_number} {row.street},
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.city},
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.province},
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.postal_code}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <a href={`mailto:${row.email}`}>
                        <MailOutlineIcon className={classes.Mail} />
                      </a>
                    </TableCell>
                    <TableCell>
                      <DeleteForeverIcon
                        className={classes.Delete}
                        onClick={() => deleteOrders(row.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
