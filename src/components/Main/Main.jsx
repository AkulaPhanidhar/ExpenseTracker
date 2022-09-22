import React, { useContext } from "react";
import InfoCard from "../InfoCard";
import { ExpenseTrackerContext } from "../../context/context";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import "../Main/List/lol.css";

const Main = () => {
  const { balance } = useContext(ExpenseTrackerContext);
  const classes = useStyles();
  return (
    <Card id="lol" className={classes.root}>
      <CardHeader
        className="lol"
        title="Expense Tracker"
        style={{ textAlign: "center" }}
      />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ₹{balance}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5rem", marginTop: "20px" }}
        >
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
