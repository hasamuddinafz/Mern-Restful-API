const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        const newTodo = new Todo({ todo });
        await newTodo.save();
        res.json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
const deleteTodo = async(req, res)=>{

    try{
        const todoId = req.params.todoId;
        await Todo.findByIdAndDelete(todoId);
        res.json({message: 'Post deleted Successfully !'});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = { createTodo, getAllTodos, deleteTodo };
