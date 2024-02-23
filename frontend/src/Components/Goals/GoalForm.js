import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function GoalForm() {
    const {addGoal, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        targetAmount: '',
        purpose: '',
        deadLine:''
    })

    const { title, targetAmount, purpose, deadLine } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addGoal(inputState)
        setInputState({
            title: '',
            targetAmount: '',
            purpose: '',
        })
    }

    return (
        <GoalFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Goal Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={targetAmount}  
                    type="text" 
                    name={'targetAmount'} 
                    placeholder={'Target Amount'}
                    onChange={handleInput('targetAmount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='deadLine'
                    placeholderText='Select A Deadline'
                    selected={deadLine}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, deadLine: date})
                    }}
                />
            </div>
            <div className="input-control">
                <textarea name="purpose" value={purpose} placeholder='Add A Purpose' id="purpose" cols="30" rows="3" onChange={handleInput('purpose')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Goal'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </GoalFormStyled>
    )
}


const GoalFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width:110%;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #8566f5;
        background: transparent;
        // resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }


    @media screen and (max-width: 302px) {
        width: 100%; /* Adjust width for smaller screens */
    }

    

    // @media screen and (max-width:305px) {
    //     overflow:inherit;
    //     margin-top:110%;
    //     box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    //     color: rgb(0,0,1);
    //     display: grid;
    //     grid-template-columns: repeat(2, 6fr);
    //     flex-direction: column;

    //     margin-left:80%;
        

    //     .input-control{
    //         width:120%;
    //         input{
                
    //             width: 100%;
    //         }
    //     }

    
      
    // }
`;
export default GoalForm