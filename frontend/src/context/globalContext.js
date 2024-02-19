import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:9000/api/v1/"


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])

    const [error, setError] = useState(null)

    const token = localStorage.getItem("token")

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(
            `${BASE_URL}add-income`,
            income,
            {
                headers: {
                    'token': token
                }
            }
        ).catch((err) => {
            setError(err.response.data.message)
        })
        getIncomes()
    }



    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`,
            {
                headers: {
                    'token': token
                }
            })
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`,
            {
                headers: {
                    'token': token
                }
            })
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome
    }

    // const signup = async (userData) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}signup`, userData)
    //         console.log(response.data) // Handle the response accordingly
    //         // You might want to redirect the user to the login page or perform some action upon successful signup
    //     } catch (error) {
    //         setError(error.response.data.message || 'An error occurred during signup')
    //     }
    // }
    // const login = async (credentials) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}login`, credentials)
    //         console.log(response.data) // Handle the response accordingly, e.g., set user session
    //     } catch (error) {
    //         setError(error.response.data.message || 'An error occurred during login')
    //     }
    // }

    //calculate incomes
    const addExpense = async (income) => {
        await axios.post(`${BASE_URL}add-expense`, income,
            {
                headers: {
                    'token': token
                }
            })
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`,
        {
            headers: {
                'token': token
            }
        })
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`,
        {
            headers: {
                'token': token
            }
        })
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome
    }
    
    const totalGoals = () => {
        let totalGoals = 0
        goals.forEach((goal) => {
            totalGoals = totalGoals + goal.targetAmount
        })

        return totalGoals
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 6)
    }

    const  addGoal = async (goal) => {
        await axios.post(
            `${BASE_URL}add-goal`,
            goal,
            {
                headers: {
                    'token': token
                }
            }
        ).catch((err) => {
            setError(err.response.data.message)
        })
        getGoals()
    }

    const getGoals = async () => {
        const response = await axios.get(`${BASE_URL}get-goals`,
            {
                headers: {
                    'token': token
                }
            })
        setGoals(response.data)
        console.log(response.data)
    }

    const deleteGoal = async (id) => {
        await axios.delete(`${BASE_URL}delete-goal/${id}`,
            {
                headers: {
                    'token': token
                }
            })
        getGoals()
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            goals,
            addGoal,
            getGoals,
            deleteGoal,
            totalGoals,
            transactionHistory,
            error,
            setError,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}