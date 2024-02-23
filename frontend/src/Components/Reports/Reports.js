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
        {field: 'title', headerName: 'Title', width: "15%"},
        {field: 'amount', headerName: 'Amount', width: "15%"},
        {field: 'category', headerName: 'Category', width: "15%"},
        {field: 'date', headerName: 'Date',renderCell:(GridCellParams) => {
            return dateFormat(GridCellParams)
        }, width: "15%"},
        {field: 'description', headerName: 'Description', width: "15%"},
    ]
    const [rows,setRows] = useState([]);
    const [columns,setCloumns] = useState(initColums);
    const {goals, expenses, incomes, totalIncome, totalExpenses, totalBalance} = useGlobalContext();

    const getData = (type) => {

        let goalColums = [
            {field: 'title', headerName: 'Title', width: "20%"},
            {field: 'targetAmount', headerName: 'Target Amount', width: "20%"},
            {field: 'deadLine', headerName: 'Deadline',renderCell:(GridCellParams) => {
                return dateFormat(GridCellParams)
            }, width: "20%"},
            {field: 'purpose', headerName: 'Purpose', width: "20%"},
        ]
        
        let balanceColums = [
            {field: 'income', headerName: 'Income', width: "30%"},
            {field: 'expense', headerName: 'Expense', width: "30%"},
            {field: 'balance', headerName: 'Balance', width: "30%"},
        ]

        if (type === "income"){
            setCloumns(initColums)
            let incomeRows =[]
            console.log(incomes)
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
                    bPad={'.2rem .4rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Expenses'}
                    onClick={() => getData("expense")}
                    bPad={'.2rem .4rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Goals'}
                    onClick={() => getData("goals")}
                    bPad={'.2rem .4rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <Button 
                    type="button"
                    name={'Balance Sheet'}
                    onClick={() => getData("balance_sheet")}
                    bPad={'.2rem .4rem'}
                    bRad={'10px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                </h2>
                <div className="income-content" style={{ height: 400, width: '100%' }}>
                <DataGrid
                    density="compact"
                    width="90%"
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
    width : 100%;
    .total-income{
        display: flex;
        padding : 0.5rem;
        flex-wrap : wrap;
        justify-content: left;
        align-items: center;
        border: 1px solid #8566f5;
        box-sizing: border-box;
        width : 100%;
        font-size: 1rem;
        gap: .5rem;
        span{
            font-size: 1rem;
            color: var(--color-delete);
        }
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