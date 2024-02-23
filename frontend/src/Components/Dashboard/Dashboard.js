import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { rupee } from "../../utils/Icons";


function calculateMin(values) {
  const numericValues = values.filter(
    (item) => typeof item === "number" && isFinite(item)
  );
  return numericValues.length > 0 ? Math.min(...numericValues) : 0;
}

// Helper function to calculate the maximum value, handling non-numeric values
function calculateMax(values) {
  const numericValues = values.filter(
    (item) => typeof item === "number" && isFinite(item)
  );
  return numericValues.length > 0 ? Math.max(...numericValues) : 0;
}

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Finance Tracker</h1>
        <div className="stats-con">
          <div className="chart-con">
         
            {/*<Chart />*/}
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {rupee} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {rupee} {totalExpenses()}
                </p>
              </div>
              <div className="history-con1">
                <h2 className="salary-title">
                  Min <span>Income</span>Max
                </h2>
                <div className="salary-item">
                  <p>
                    {rupee}{" "}
                    {calculateMin(incomes.map((item) => item.amount || 0))}
                  </p>
                  <p>
                    {rupee}{" "}
                    {calculateMax(incomes.map((item) => item.amount || 0))}
                  </p>
                </div>
                <br/><br/>
                <h2 className="salary-title">
                  Min <span>Expense</span>Max
                </h2>
                <div className="salary-item">
                  <p>
                    {rupee}{" "}
                    {calculateMin(expenses.map((item) => item.amount || 0))}
                  </p>
                    <p>
                    {rupee}{" "}
                    {calculateMax(expenses.map((item) => item.amount || 0))}
                  </p>
                </div>
              </div>
              {/* <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {rupee} {totalBalance()}
                                </p>
                            </div> */}
            </div>
          
          </div>
        </div>
      </InnerLayout>
      <div className="history-con" style={{padding: "1rem"}}>
            <History />
            {/* <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {rupee}{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                {rupee}{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div> */}
            {/* <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {rupee}{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                {rupee}{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div> */}
          </div>
    </DashboardStyled>
  );
}
const DashboardStyled = styled.div`
  /* Main Dashboard container */
display: flex; 
flex-direction: column;
align-items: flex-start;
width: 100%;
  /* Inner Layout container */
  ${InnerLayout} {
    display: flex;
    flex-direction: column;
    
  }

  /* Title */
  h1 {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #333;
  }

  /* Statistics container */
  .stats-con {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* Wrap children when necessary */

    /* Chart container */
    .chart-con {
      width: calc(60% - 1rem); /* 60% of the container minus some margin */
      margin-right: 1rem; /* Add some margin between chart and history */
      display : flex;
      /* Amount container */
      .amount-con {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 2rem;

        /* Individual sections */
        .income,
        .expense,
        .history-con1 {
          flex-basis: calc(50% - 0.5rem); /* Half of the container minus some margin */
          background-color: #fff;
          border-radius: 10px;
          padding: 1.5rem;
          box-sizing: border-box;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;

          h2 {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 1rem;
          }

          p {
            font-size: 1rem;
            color: #555;
          }

          .salary-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-weight: bold;
              color: #8566f5;
            }
          }

          .salary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }

    /* History container */
    
  }
`;




export default Dashboard;
