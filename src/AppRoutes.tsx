// src/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';

function AppRoutes() {
    function isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/todos" element={isAuthenticated() ? <TodoList /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
