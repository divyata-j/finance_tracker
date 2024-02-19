const ExpenseSchema = require("../models/ExpenseModel")


const addExpense = async (req, res) => {
    const {title, amount, category, description, date, id}  = req.body

    const income = ExpenseSchema({
        user: id,
        title,
        amount,
        date,
        category,
        description,
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }

}

const getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find({ user: req.body.id }).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }
}

const deleteExpense = async (req, res) =>{
    const {id} = req.params
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            console.log(error.message)
            throw new Error("Server Error")
        })
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
}