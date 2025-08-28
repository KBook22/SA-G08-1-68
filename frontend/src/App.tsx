// src/App.tsx
import React from 'react';
import AllRoutes from './routes';
import { AuthProvider } from './context/AuthContext'; // 👈 1. import AuthProvider
import './App.css';

const App: React.FC = () => {
  return (
    // 2. ครอบ AllRoutes ด้วย AuthProvider
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  );
};

export default App;