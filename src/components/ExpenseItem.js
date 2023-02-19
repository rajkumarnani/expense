// import React, { useState} from 'react';

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {

  // const [title, setTitle] = useState(props.title);
  // // const [place, setPlace] = useState(props.place);
  // // const [amount, setAmount] = useState(props.amount);


  // const clickHandler = () => {
  //   setTitle('Updated....!!');
  //   console.log(title);
  // }

  return (
    <div className="expense-item">
        <ExpenseDate date={props.date}/>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <h6>Place : {props.place}</h6>
      </div>
      <div className="expense-item__price">${props.amount}</div>
      {/* <button onClick={clickHandler}>Update</button> */}
    </div>
  );
}

export default ExpenseItem;
