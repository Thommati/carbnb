import React, { useEffect, useContext, useState } from "react";
import { authContext } from "../../providers/authProvider";
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
  Grid,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import AddAvailability from "./AddAvailability";

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

export default function VehicleAvailability({ locations }) {
  const { user } = useContext(authContext);
  const classes = useStyles();
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const response = await axios.get(`/api/availability/users/${user.id}`);
        setAvailability(response.data);
      } catch (err) {
        console.error("Error retrieving availabilities", err);
      }
    };
    getAvailability();
  }, [user]);

  const deleteAvailability = async (id) => {
    try {
      await axios.delete(`/api/availability/${id}`);
      setAvailability((prev) =>
        prev.filter((availability) => availability.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };



  const updateAvailability = (newAvailability) => {
    setAvailability((prev) => [...prev, newAvailability]);
  };

  return (
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="host-availability">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">
              CAR ID
            </TableCell>
            <TableCell className={classes.TableHeaderCell}></TableCell>
            <TableCell className={classes.TableHeaderCell}>
              VEHICLE INFO
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              AVAILABILITY START DATE
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              AVAILABILITY END DATE
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              PRICE PER DAY
            </TableCell>
            <TableCell className={classes.TableHeaderCell}>
              <AddAvailability
                locations={locations}
                updateAvailability={updateAvailability}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availability
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="center">
                  {row.car_id}
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
                  <DeleteForeverIcon
                    className={classes.Delete}
                    onClick={() => deleteAvailability(row.id)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
