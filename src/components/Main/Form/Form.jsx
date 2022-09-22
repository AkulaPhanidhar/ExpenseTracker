import React, { useState, useContext, useEffect } from "react";
import { ExpenseTrackerContext } from "../../../context/context";
import { useSpeechContext } from "@speechly/react-client";
import { v4 as uuidv4 } from "uuid";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";
import {
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import CustomizedSnackbar from "../../Snackbar/Snackbar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const { segment } = useSpeechContext();

  const { addTransaction } = useContext(ExpenseTrackerContext);
  const CreateTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    setOpen(true);
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return CreateTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        setFormData(initialState);
      }

      segment.entities.forEach((entity) => {
        const category = `${entity.value.charAt(0)}${entity.value
          .slice(1)
          .toLocaleLowerCase()}`;
        switch (entity.type) {
          case "amount":
            setFormData({ ...formData, amount: entity.value });
            break;
          case "category":
            if (
              incomeCategories
                .map((category) => category.type)
                .includes(category)
            ) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories
                .map((category) => category.type)
                .includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: entity.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.type &&
        formData.category &&
        formData.amount &&
        formData.date
      ) {
        CreateTransaction();
      }
    }
  }, [segment]);

  const selecedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && <>{segment.words.map((word) => word.value).join(" ")}</>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selecedCategories.map((category) => {
              const { type } = category;
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        fullWidth
        onClick={CreateTransaction}
        style={{
          color: "rgba(245,67,119)",
          border: "2px Solid rgba(245,67,119)",
          borderRadius: "30px",
          fontWeight: "bold",
          padding: "10",
          alignItems: "center",
        }}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
