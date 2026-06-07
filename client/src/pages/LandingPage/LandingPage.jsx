
import "../../css/LandingPage.css"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.png"
import "../../css/LandingPage.css"
import LandingImage from "../../assets/ImageHome.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MoveY, MoveX } from "../../animation/Moves"

export default function Test() {
    const navigate = useNavigate();
    const [ShowNav, setShowNav] = useState(true)
    const MoveX1 = useRef();
    const MoveX2 = useRef();
    const MoveY1 = useRef();

    useEffect(() => {
        MoveX(MoveX1.current, -100, 0, 2);
        MoveX(MoveX2.current, 100, 0, 2);
        MoveY(MoveY1.current, 100, 0, 2);
    }, []);



    return (

        <>
            <nav className="w-full flex justify-center border boder-b-10 py-2 min-w-[200px]">
                <div className="flex flex-nowrap lg:w-[60%] w-full justify-between items-center py-2 px-3">
                    <div className="flex items-center">
                        <img className="w-14" src={Logo} alt="" />
                        <p className="m-0 whitespace-nowrap font-ubuntu">Flux Link</p>
                    </div>
                    <div className="nav  flex gap-10 items-center">
                        <p className="m-0 cursor-pointer">Home</p>
                        <p className="m-0 cursor-pointer">About</p>
                        <p className="m-0 cursor-pointer">Service</p>
                        <p className="m-0 cursor-pointer">Contact</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="lg:flex hidden flex items-center justify-center bg-black text-white px-3 py-2 rounded-md cursor-pointer" onClick={() => navigate("/login")}>
                            <p className="m-0">Login</p>
                        </div>
                        <div className="relative">
                            <i className="bi bi-list lg:hidden text-2xl flex cursor-pointer" onClick={() => setShowNav(prev => !prev)}></i>
                            <div className={`absolute bg-white border border-gray-100 flex justify-center flex-col w-[100px] -ml-[80px] ${ShowNav ? "hidden" : "true"}`}>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300">Home</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300">About</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300">Service</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300">Contact</p>
                                <p className="m-0 p-2 hover:bg-gray-300 cursor-pointer transition-color duration-300">Login</p>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            <div className="content-f1 flex w-full justify-center mt-15 min-w-[200px]">
                <div className="text-wrapper flex justify-between w-[60%] p-3 gap-3">
                    <div className="w-full flex  items-center text-[1vw]" ref={MoveX1}>
                        <div>
                            <div>
                                <p className="main-text m-0 font-ubuntu font-medium whitespace-nowrap text-[2.5vw]">Smart Hyperlink</p>
                            </div>
                            <div>
                                <p className=" main-text m-0 font-ubuntu font-medium whitespace-nowrap text-[2.5vw]">Time-based Redirection</p>
                            </div>
                        </div>
                    </div>
                    <div className="subscript w-full flex flex-col gap-[1vw] text-[1vw]" ref={MoveX2}>
                        <div className="subs1">
                            <p className="m-0 font-medium  lg:whitespace-nowrap">One link, multiple destinations. Control where your</p>
                            <p className="m-0 font-medium  lg:whitespace-nowrap">audience goes based on time and schedule.</p>
                        </div>

                        <div className="subs2">
                            <p className="m-0 whitespace-nowrap">Manage multiple destinations through a single hyperlink.</p>
                            <p className="m-0 whitespace-nowrap"> Configure custom redirects for different days and  time periods, </p>
                            <p className="m-0 whitespace-nowrap">allowing your links to adapt automatically to </p>
                            <p className="m-0 whitespace-nowrap">changing schedules and content requirements.</p>
                        </div>
                    </div>
                </div>
            </div >

            <div className="img w-full flex justify-center mt-15 p-2 min-w-[200px]" ref={MoveY1}>
                <div className="img-parent w-[60%] justify-center">
                    <img className="img-pic rounded-2xl" src={LandingImage} alt="" />
                </div>
            </div>

        </>


    )

}