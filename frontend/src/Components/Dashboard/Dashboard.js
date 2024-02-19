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
          <div className="history-con">
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
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 6fr);
    gap: 2rem;
    @media screen and (max-width: 302px) {
      grid-template-columns: 1fr; /* Set to one column for screens with a max width of 302px */
    }
    .chart-con {
      @media screen and (max-width: 302px) {
        grid-column: span 1; /* Span only 1 column for screens with a max width of 302px */
      }
      grid-column: 1 / 4;
      height: 400px;


      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
          @media screen and (max-width: 700px) {
            grid-column: span 1; /* Span only 1 column for screens with a max width of 302px */
          }
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #8566f5;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }
        span {
          color: black;
        }
        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
          @media screen and (max-width: 700px) {
            grid-column: span 1; /* Span only 1 column for screens with a max width of 302px */
          }
        }
      }
    }

    .history-con {
      grid-column: 4 /-1;
      width: 130%;
      h2 {
        
        margin: 0.1em 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #8566f5;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 2rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.8rem;
        }
      }
      @media screen and (max-width: 302px) {
        display:grid;
        order:4;
        margin-top:15rem;
        grid-column: span 1; /* Span all columns for screens with a max width of 302px */
        width: auto; /* Auto width for flexibility */
      }
      @media screen and (min-width:303px) and (max-width: 700px) {
        display:grid;
        order:4;
        width: auto; 
        margin-top:45rem;
        
        grid-column: span 1; /* Span all columns for screens with a max width of 302px */
        width: 100%; /* Auto width for flexibility */
      }
  
    }
    .history-con1 {
      grid-column: 1 / 4;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #8566f5;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
    @media screen and (max-width: 700px) {
      order:1;
      grid-column: span 1; /* Span all columns for screens with a max width of 302px */
      width: auto; /* Auto width for flexibility */
    }

  }




  // @media screen and(max-width:302px){
  //   .stats-con {
  //     display: flex;
  //     flex-direction:column;
  //     gap: 2rem;
  //     .chart-con {
  //       // grid-column: 1 / 4;
  //       height: 400px;
  //       .amount-con {
  //         display: flex;
          
  //         gap: 2rem;
  //         margin-top: 2rem;
  //         .income,
  //         .expense {
  //           width:100%;
  //         }
  //         .income,
  //         .expense,
  //         .balance {
  //           background: #fcf6f9;
  //           border: 2px solid #8566f5;
  //           box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  //           border-radius: 20px;
  //           padding: 1rem;
  //           p {
  //             font-size: 3.5rem;
  //             font-weight: 700;
  //           }
  //         }
  //         span {
  //           color: black;
  //         }
  //         .balance {
  //           // grid-column: 2 / 4;
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center;
  //           align-items: center;
  //           p {
  //             color: var(--color-green);
  //             opacity: 0.6;
  //             font-size: 4.5rem;
  //           }
  //         }
  //       }
  //     }
  
  //     .history-con {
       
  //       width: 180%;
  //       h2 {
          
  //         margin: 0.1em 0;
  //         display: flex;
  //         align-items: center;
         
  //       }
  //       .salary-title {
  //         font-size: 1.2rem;
  //         span {
  //           font-size: 1.8rem;
  //         }
  //       }
  //       .salary-item {
  //         background: #fcf6f9;
  //         border: 2px solid #8566f5;
  //         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  //         padding: 2rem;
  //         border-radius: 20px;
  //         display: flex;
  //         // justify-content: space-between;
  //         align-items: center;
  //         p {
  //           font-weight: 600;
  //           font-size: 1.8rem;
  //         }
  //       }
  //     }
  //     .history-con1 {
        
  //       h2 {
  //         margin: 1rem 0;
  //         display: flex;
  //         align-items: center;
        
  //       }
  //       .salary-title {
  //         font-size: 1.2rem;
  //         span {
  //           font-size: 1.8rem;
  //         }
  //       }
  //       .salary-item {
  //         background: #fcf6f9;
  //         border: 2px solid #8566f5;
  //         width:300%;
  //         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          
  //         border-radius: 20px;
  //         display: flex;
  //         align-items: center;
  //         p {
  //           font-weight: 600;
  //           font-size: 1.6rem;
  //         }
  //       }
  //     }
  //   }
  // }
`;

export default Dashboard;
