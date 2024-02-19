const GoalSchema = require("../models/GoalModel")


const addGoal = async (req, res) => {
    const {title, targetAmount, deadLine, purpose, id}  = req.body

    const goal = GoalSchema({
        user: id,
        title,
        targetAmount,
        deadLine,
        purpose,
    })

    try {
        //validations
        if(!title || !targetAmount || !purpose || !deadLine){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(targetAmount <= 0 || !targetAmount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await goal.save()
        res.status(200).json({message: 'Goal Added'})
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }

}

const getGoals = async (req, res) =>{
    try {
        const goals = await GoalSchema.find({ user: req.body.id }).sort({createdAt: -1})
        res.status(200).json(goals)
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }
}

const deleteGoal = async (req, res) =>{
    const {id} = req.params
    GoalSchema.findByIdAndDelete(id)
        .then((goal) =>{
            res.status(200).json({message: 'Goal Deleted'})
        })
        .catch((err) =>{
            console.log(error.message)
            throw new Error("Server Error")
        })
}

module.exports = {
    addGoal,
    getGoals,
    deleteGoal,
}