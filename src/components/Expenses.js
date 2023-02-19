import ExpenseItem from "./ExpenseItem";
import React, { useState } from "react";
import "./Expenses.css";
import NewExpense from "./NewExpense/NewExpense";
import ExpensesFilter from "./ExpenseFilter";
import ExpensesChart from "./ExpensesChart";


const dummy_expenses = [
  {
    date: new Date("2019, 8, 29"),
    title: "Car Insurance",
    amount: 545.18,
    id: 33243,
    place: "Hyderabad",
  },
  {
    date: new Date("2022, 5, 9"),
    title: "Bike Insurance",
    amount: 145.07,
    id: 48103,
    place: "Banglore",
  },
  {
    date: new Date("2021,12,12"),
    title: "Tv Purchase",
    amount: 450.08,
    id: 28134,
    place: "Chennai",
  },
  {
    date: new Date("2022, 9, 29"),
    title: "Other Events",
    amount: 451.53,
    id: 74804,
    place: "Vizag",
  },
];

function Expenses(props) {
  const [expenses, setExpenses] = useState(dummy_expenses);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const [isSearching, setIsSearching] = useState(false);

  const onInputChange = (ev) => {
    const searchStr = ev.target.value.toLowerCase();
    if (ev.target.value.trim().length !== 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    if (searchStr !== undefined) {
      const expensesFiltered = expenses.filter((row) =>
        // row.title.toLowerCase().indexOf(searchStr) > -1 ||
        // row.place.toLowerCase().indexOf(searchStr) > -1 ||
        // row.amount.toString().indexOf(searchStr) > -1

        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchStr)
        )
      );
      setFilteredExpenses(expensesFiltered);
    } else {
      setFilteredExpenses(expenses);
    }
  };

  const [filteredYear, setFilteredYear] = useState("2022");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  let filterYearExpenses = filterExpenses.map((expenseRecord) => (
    <ExpenseItem
      key={expenseRecord.id}
      title={expenseRecord.title}
      amount={expenseRecord.amount}
      date={expenseRecord.date}
      place={expenseRecord.place}
    />
  ));

  let filterSearchExpenses = filteredExpenses.map((expenseRecord) => (
    <ExpenseItem
      key={expenseRecord.id}
      title={expenseRecord.title}
      amount={expenseRecord.amount}
      date={expenseRecord.date}
      place={expenseRecord.place}
    />
  ));

  return (
    <div>
      <div className="expense-card">
        <div className="header-search">
          <div className="heading">
            <h1>Expenses Tracker...</h1>
          </div>
          <div className="search-box">
            <input
              placeholder="Search expenses"
              style={{
                height: "30px",
              }}
              onChange={onInputChange}
            />
          </div>
        </div>
        <NewExpense onAddExpense={addExpenseHandler} />
      </div>
      <div className="expenses">
        
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filterExpenses}/>
        {filterExpenses.length === 0 && <p>No Expenses Found..</p>}
        {!isSearching && filterYearExpenses}
      </div>

      {isSearching && <div className="expenses">{filterSearchExpenses}</div>}
    </div>
  );
}

export default Expenses;
