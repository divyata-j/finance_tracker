import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { InnerLayout } from '../../styles/Layouts';
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateFormat';

function CustomToolbar() {
    return (
        <div className='noprint'>
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                
                <GridToolbarFilterButton />

                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        </div>
    )
}

function Reports() {
    const initColums = [
        // {field: 'id', headerName: '#', width: 200},
        {field: 'title', headerName: 'Title', width: 200},
        {field: 'amount', headerName: 'Amount', width: 200},
        {field: 'category', headerName: 'Category', width: 200},
        {field: 'date', headerName: 'Date',renderCell:(GridCellParams) => {
            return dateFormat(GridCellParams)
        }, width: 200},
        {field: 'description', headerName: 'Description', width: 200},
    ]
    const [rows,setRows] = useState([]);
    const [columns,setCloumns] = useState(initColums);
    const {goals, expenses, incomes, totalIncome, totalExpenses, totalBalance} = useGlobalContext();

    const getData = (type) => {

        let goalColums = [
            {field: 'title', headerName: 'Title', width: 250},
            {field: 'targetAmount', headerName: 'Target Amount', width: 250},
            {field: 'deadLine', headerName: 'Deadline',renderCell:(GridCellParams) => {
                return dateFormat(GridCellParams)
            }, width: 250},
            {field: 'purpose', headerName: 'Purpose', width: 250},
        ]
        
        let balanceColums = [
            {field: 'income', headerName: 'Income', width: 350},
            {field: 'expense', headerName: 'Expense', width: 350},
            {field: 'balance', headerName: 'Balance', width: 350},
        ]

        if (type === "income"){
            setCloumns(initColums)
            let incomeRows =[]
            incomes.map(({_id, title, amount, date, category, description}) => {
                incomeRows.push({
                    id: _id,
                    title,
                    amount,
                    date,
                    description,
                    category
                })
            })
            setRows(incomeRows)
        }
        else if(type === "expense"){
            setCloumns(initColums)
            let expenseRows =[]
            expenses.map(({_id, title, amount, date, category, description}) => {
                expenseRows.push({
                    id: _id,
                    title,
                    amount,
                    date,
                    description,
                    category
                })
            })
            setRows(expenseRows)
        }
        else if(type === "goals"){
            setCloumns(goalColums)
            let goalRows =[]
            goals.map(({_id, title, targetAmount, deadLine, purpose}) => {
                goalRows.push({
                    id: _id,
                    title,
                    targetAmount,
                    deadLine,
                    purpose
                })
            })
            setRows(goalRows)
        }
        else if(type === "balance_sheet"){
            setCloumns(balanceColums)
            setRows([
                {
                    id:1,
                    income: totalIncome(),
                    expense: totalExpenses(), 
                    balance: totalBalance()
                }
            ])
        }
    }

    return (
        <ReportsStyled>
            <InnerLayout>
                <h1>Reports</h1>
                <h2 className="total-income">
                <Button 
                    type="button"
                    name={'Income'}
                    onClick={() => getData("income")}
                    bPad={'.8rem 1.6rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Expenses'}
                    onClick={() => getData("expense")}
                    bPad={'.8rem 1.6rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Goals'}
                    onClick={() => getData("goals")}
                    bPad={'.8rem 1.6rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Balance Sheet'}
                    onClick={() => getData("balance_sheet")}
                    bPad={'.8rem 1.6rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                </h2>
                <div className="income-content" style={{ height: 400, width: '100%' }}>
                <DataGrid
                    density="compact"
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    components={{
                        Toolbar: CustomToolbar,
                }} />
                </div>
            </InnerLayout>
        </ReportsStyled>
    )
}

const ReportsStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #8566f5;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 1rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-delete);
        }
    }
    .income{
        border: 2px solid #8566f5;
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Reports