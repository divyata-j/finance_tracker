import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import GoalT from '../GoalItem/GoalT';
import GoalForm from './GoalForm';
import { rupee } from '../../utils/Icons';

function Goals() {
    const {addIncome,goals, getGoals, deleteGoal, totalGoals} = useGlobalContext()

    useEffect(() =>{
        getGoals()
    }, [])
    return (
        <GoalStyled>
            <InnerLayout>
                <h1>Goals</h1>
                <h2 className="total-income">Total Goal: <span>{rupee}{totalGoals()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <GoalForm />
                    </div>
                    <div className="incomes">
                        {goals.map((goal) => {
                            const {_id, title, targetAmount, purpose} = goal;
                            console.log(goal)
                            return <GoalT
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={purpose} 
                                amount={targetAmount} 
                                indicatorColor="var(--color-accent)"
                                deleteItem={deleteGoal}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </GoalStyled>
    )
}

const GoalStyled = styled.div`
    width=200%;
    display: flex;
    // overflow: auto;
    .total-income{
        width:150%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #8566f5;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-delete);
        }
    }
    @media screen and (max-width:305px) {
        overflow:scroll;
        width:180%;
        display:grid;
        grid-template-columns: repeat(2, 6fr);
        .income{
            margin-left:100%
            width:30%;
            border: 2px solid #8566f5;
        }
        .income-content{
            display: flex;
            gap: 2rem;
            display:grid;
                justify-content:space-between;
            .incomes{
                
                margin-left:19%;
                width:90%;
                flex: 1;
            }
        }
      
    }
    .income{
        width:60%;
        border: 2px solid #8566f5;
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            margin-left:19%;
            width:90%;
            flex: 1;
        }
    }
`;

export default Goals