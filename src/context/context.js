import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [
  {
    amount: 5000,
    category: 'Shopping',
    type: 'Expense',
    date: '2020-12-24',
    id: '8ab56839-b1de-4457-8b98-b66d5d6ca5e8',
  },
  {
    amount: 10000,
    category: 'House',
    type: 'Expense',
    date: '2020-12-24',
    id: '9d8a6124-448a-4311-8728-62d9a60ca48c',
  },
  {
    amount: 10000,
    category: 'Savings',
    type: 'Income',
    date: '2020-12-24',
    id: '17589fbc-03e6-4895-8ee0-098b0f79a12b',
  },
  {
    amount: 50000,
    category: 'Salary',
    type: 'Income',
    date: '2020-12-24',
    id: 'b7eb5227-87cc-4802-90da-2caf217555d6',
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Action Creators
  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };
  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };
  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === 'Expense'
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
