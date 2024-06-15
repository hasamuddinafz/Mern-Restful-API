import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { PencilSimple, Trash } from "@phosphor-icons/react";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [todo, setTodo] = useState('');
    const [todosList, setTodosList] = useState([]);
    const [editTodo, setEditTodo] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos/');
            setTodosList(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching todos');
        }
    };

    const addTodo = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/todos/', { todo });
            console.log(response);
            toast.success(`${todo} added successfully!`);
            setTodo('');
            fetchTodos();
        } catch (error) {
            console.error(error);
            toast.error('Error adding todo');
        }
    };

    const updateTodo = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${editTodo._id}`, { todo });
            console.log(response);
            toast.success(`${todo} updated successfully!`);
            setTodo('');
            setEditTodo(null);
            fetchTodos();
        } catch (error) {
            console.error(error);
            toast.error('Error updating todo');
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${todoId}`);
            toast.success("Successfully deleted");
            fetchTodos();
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while deleting the todo!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.trim()) {
            toast.error('Todo cannot be empty');
            return;
        }
        if (editTodo) {
            updateTodo();
        } else {
            addTodo();
        }
    };

    const handleEditClick = (todo) => {
        setEditTodo(todo);
        setTodo(todo.todo);
    };

    return (
        <>
            <div className="container">
                <div className="vh-100 d-flex align-items-center justify-content-center ">
                    <div className="input">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Todo" 
                                    aria-label="Todo" 
                                    aria-describedby="button-addon" 
                                    value={todo} 
                                    onChange={(e) => setTodo(e.target.value)} 
                                />
                                <button className="btn btn-outline-success" type="submit" id="button-addon">{editTodo ? 'Update Todo' : 'Add Todo'}</button>
                            </div>
                        </form>
                        <ul className="list-group">
                            {todosList && todosList.map(todo => (
                                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{todo.todo}</span>
                                    <div className="action">
                                        <button className="btn btn-outline-success" onClick={() => handleEditClick(todo)}>
                                            <PencilSimple size={16} />
                                        </button>
                                        <button className="btn btn-outline-danger" onClick={() => deleteTodo(todo._id)}>
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Home;
