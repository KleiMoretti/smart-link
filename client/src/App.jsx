import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Redirect from "./pages/Dashboard/Redirect";
import About from "./pages/LandingPage/About"
import Service from "./pages/LandingPage/Service"
import Contact from "./pages/LandingPage/Contact"
import Nav from "./pages/LandingPage/Nav"
import TestHome from "./pages/LandingPage/Test"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/r/:id" element={<Redirect />} />
        <Route path="Nav" element={<Nav />} />
        <Route path="TestHome" element={<TestHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
