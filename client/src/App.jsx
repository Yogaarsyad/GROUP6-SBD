import React from 'react'
import { Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ServerStatus from './pages/ServerStatus'
import Landing from './pages/Landing'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'

function App() {
  // Simple auth check function
  const isAuthenticated = () => {
    return localStorage.getItem('studenthub-token') !== null;
  };

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Public routes */}
          <Route
            path="/Register"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Register />}
          />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Landing />}
          />
          {/* Protected routes - redirect to login if not authenticated */}
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />

          {/* 404 route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        {/* Server status indicator yang muncul di semua halaman */}
        <ServerStatus />

      </AnimatePresence>

    </>
  )
}

export default App