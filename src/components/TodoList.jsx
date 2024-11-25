import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Función para obtener tareas del backend
    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/todos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);
    // Función para agregar una nueva tarea
    const addTodo = async () => {
        if (newTodo.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ text: newTodo }),
                });
                const data = await response.json();
                setTodos([...todos, data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const toggleTodoCompletion = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));  // Actualiza la tarea en la lista
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodos(todos.filter(todo => todo.id !== id));  // Actualiza la lista de tareas eliminando la tarea especificada
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                placeholder="Add a new task"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Task</button>
            <ul>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        deleteTodo={() => deleteTodo(todo.id)}
                        toggleTodoCompletion={() => toggleTodoCompletion(todo.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
