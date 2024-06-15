import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import { PencilSimple, Trash } from "@phosphor-icons/react";
function Home() {
    const [todo, setTodo] = useState(''); 
    const [todosList, setTodosList] = useState([]);
    const onsubmit = async (e) => {
        e.preventDefault();
        if (todo.trim() === '') {
            toast.error('Todo cannot be empty');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/todos/', { todo });  // Port numarasını ekledik
            console.log(response);
            toast.success(`${todo} added successfully!`);
            setTodo('');
        } catch (error) {
            console.error(error);
            toast.error('Error adding todo');
        }
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos/');
            setTodosList(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const deleteTodo = async (todoId)=>{
        try{
            await axios.delete(`http://localhost:5000/api/todos/${todoId}`);
            toast.success("Successfully deleted");
        }catch(error){
            console.log(error);
            toast.error("Error occured while deleting the todo !");
        }
    };

    useEffect(()=>{
        fetchTodos();
    }, [todosList])


    return (
        <>
            <div className="container">
                <div className="vh-100 d-flex align-items-center justify-content-center ">
                    <div className="input">
                        <form onSubmit={onsubmit}>
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
                                <button className="btn btn-outline-success" type="submit" id="button-addon">Add Todo</button>
                            </div>
                        </form>
                        <ul className="list-group">
                            {todosList && todosList.map(todo =>(
                                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{todo.todo}</span>
                                <div className="action">
                                <button className="btn btn-outline-success"><PencilSimple size={16} /></button>
                                <button className="btn btn-outline-danger" onClick={()=> deleteTodo(todo._id)}><Trash size={16} /></button>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
