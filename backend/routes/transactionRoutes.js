const express = require('express')
const router = express.Router()

const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController')
const { addGoal, getGoals, deleteGoal } = require('../controllers/goalController')

router.route('/add-income').post(addIncome)
router.route('/get-incomes').get(getIncomes)
router.route('/delete-income/:id').delete(deleteIncome)

router.route('/add-expense').post(addExpense)
router.route('/get-expenses').get(getExpense)
router.route('/delete-expense/:id').delete(deleteExpense)

router.route('/add-goal').post(addGoal)
router.route('/get-goals').get(getGoals)
router.route('/delete-goal/:id').delete(deleteGoal)

module.exports = router