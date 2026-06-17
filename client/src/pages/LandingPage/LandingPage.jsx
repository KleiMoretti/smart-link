
import "../../css/LandingPage.css"
import { Link } from "react-router-dom"
import Logo from "../../assets/company-logo.png"
import "../../css/LandingPage.css"
import About from "../LandingPage/About"
import Home from "../LandingPage/Home"
import Service from "../LandingPage/Service"
import Contact from "../LandingPage/Contact"
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function Test() {
    const navigate = useNavigate();
    const [ShowNav, setShowNav] = useState(true)

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    };


    return (
        <>
            <nav className="w-full flex justify-center border boder-b-10 py-2 min-w-[200px]">
                <div className="flex flex-nowrap lg:w-[60%] w-full justify-between items-center py-2 px-3">
                    <div className="flex items-center">
                        <img className="w-14" src={Logo} alt="" />
                        <p className="m-0 whitespace-nowrap font-ubuntu">Lyncks</p>
                    </div>
                    <div className="nav  flex gap-10 items-center">
                        <p className={`m-0 cursor-pointer transition-color duration-300 cursor-pointer`} onClick={() => scrollToSection("home")}>Home</p>
                        <p className="m-0 cursor-pointer" onClick={() => scrollToSection("about")}>About</p>
                        <p className="m-0 cursor-pointer" onClick={() => scrollToSection("service")}>Service</p>
                        <button className="m-0 cursor-pointer" onClick={() => scrollToSection("contact")}>Contact</button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="lg:flex hidden flex items-center justify-center bg-black text-white px-3 py-2 rounded-md cursor-pointer" onClick={() => navigate("/login")}>
                            <p className="m-0">Login</p>
                        </div>
                        <div className="relative">
                            <i className="bi bi-list lg:hidden text-2xl flex cursor-pointer" onClick={() => setShowNav(prev => !prev)}></i>
                            <div className={`absolute bg-white border border-gray-100 flex justify-center flex-col w-[100px] -ml-[80px] z-10 ${ShowNav ? "hidden" : "true"}`}>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300 cursor-pointer" onClick={() => scrollToSection("home")}>Home</p>
                                <p href="#about" className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300 cursor-pointer" onClick={() => scrollToSection("about")}>About</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300 cursor-pointer" onClick={() => scrollToSection("service")}>Service</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300 cursor-pointer" onClick={() => scrollToSection("contact")}>Contact</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300 cursor-pointer" onClick={() => navigate("/login")}>Login</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col gap-5">
                <Home />
                <About />
                <Service />
                <Contact />
            </div>

        </>


    )

}