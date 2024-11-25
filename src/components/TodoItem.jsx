import React from 'react';

function TodoItem({ todo, toggleTodoCompletion, deleteTodo }) {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={toggleTodoCompletion}>
                {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={deleteTodo}>Delete</button>
        </li>
    );
}
export default TodoItem;
