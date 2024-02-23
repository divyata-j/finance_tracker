import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";
import { dateFormat } from "./../utils/dateFormat";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {history.map((item) => {
        const { _id, title, amount, type, date } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {dateFormat(date)}
            </p>

            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense"
                ? `-${amount <= 0 ? 0 : amount}`
                : `+${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}
const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Increase gap between history items */
  align-items: center; /* Align items to the center horizontally */
  
  .history-item {
    background: #ffffff; /* Background color */
    border: 1px solid #ddd; /* Light border */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle box shadow */
    padding: 1.5rem; /* Padding */
    width: 100%; /* Full width */
    max-width: 400px; /* Limit maximum width */
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Styling for text */
    .history-info {
      font-size: 1.1rem;
      color: #333; /* Dark text color */
    }

    /* Styling for amount */
    .history-amount {
      font-size: 1.2rem;
      font-weight: bold;
      color: #6c5ce7; /* Purple color */
    }
  }
`;

export default History;
