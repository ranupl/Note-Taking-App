import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'flowbite/dist/flowbite.min.css'; // Ensure flowbite is installed
import './App.css'; // Custom styles
import Navbar from './component/Navbar.jsx'; 
import Home from './pages/Home.jsx'; 
import LoginPage from './pages/Login.jsx';
import SignUpPage from './pages/SignUp.jsx';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

