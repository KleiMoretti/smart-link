import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Login from "./pages/auth/Login";
//import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Redirect from "./pages/Dashboard/Redirect";
import Test from "./pages/auth/Test";

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/r/:id" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
