import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import ServerStatus from './components/ServerStatus'

function App() {
  // Simple auth check function
  const isAuthenticated = () => {
    return localStorage.getItem('twitter-clone-token') !== null;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route 
          path="/feed" 
          element={isAuthenticated() ? <div>Feed Page (Coming Soon)</div> : <Navigate to="/login" />} 
        />
        
        {/* Default route - redirect based on auth status */}
        <Route 
          path="/" 
          element={isAuthenticated() ? <Navigate to="/feed" /> : <Navigate to="/login" />} 
        />

        {/* 404 route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      
      {/* Server status indicator yang muncul di semua halaman */}
      <ServerStatus />
    </Router>
  )
}

export default App