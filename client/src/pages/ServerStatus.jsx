import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../config/api';

const ServerStatus = () => {
  const [status, setStatus] = useState('checking');
  
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // Mencoba melakukan ping ke server
        await axios.get(AUTH_ENDPOINTS.HEALTH, { 
          timeout: 5000,
          withCredentials: false
        });
        setStatus('online');
      } catch (error) {
        console.error('Error saat memeriksa server:', error);
        setStatus('offline');
      }
    };
    
    checkServerStatus();
    
    // Periksa status server setiap 30 detik
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (status === 'checking') {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 py-2 px-4 rounded-full shadow-md flex items-center">
        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
        <span className="text-sm text-gray-600">Memeriksa server...</span>
      </div>
    );
  }
  
  if (status === 'offline') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 py-2 px-4 rounded-full shadow-md flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <span className="text-sm text-red-700">
          Server offline! Pastikan server berjalan di http://localhost:3000
        </span>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-green-100 py-2 px-4 rounded-full shadow-md flex items-center">
      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
      <span className="text-sm text-green-700">Server online</span>
    </div>
  );
};

export default ServerStatus;