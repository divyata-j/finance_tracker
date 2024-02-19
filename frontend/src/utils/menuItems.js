import {dashboard, expenses, transactions, trend, login,goal ,report} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
   
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Goals",
        icon: goal,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Reports",
        icon: report,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Sign out",
        icon: login,
        link: "/dashboard",
    },
]