import LogoTest from "../../assets/logoTest.png"

import { useState } from "react"

export default function NavTest() {
    const [open, setOpen] = useState(false);


    return (

        <>
            <header className="w-full fixed top-0 left-0 z-50 border-b border-b-gray-200 backdrop-blur-[14px] bg-gray/50 ">
                <div className="bg-[rgb(var(--bg-white-72))]  py-[16px] px-[32px] max-w-[1120px] my-0 mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="w-[40px] overflow-hidden rounded-lg" >
                            <img src={LogoTest} alt="" />
                        </span>

                        <span>
                            <p className="m-0 font-['Space_Grotesk',sans-serif] font-bold tracking-tighter text-lg">Lyncks</p>
                        </span>
                    </div>
                    <nav className="lg:flex hidden gap-3 font-semibold text-[14px] font-['Space_Grotesk',sans-serif]">

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>Home</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>About</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>Contact</button>
                        </div>

                    </nav>
                    <nav
                        className="lg:hidden flex text-2xl"
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <i
                            className={`bi ${open ? "bi-x-lg rotate-90" : "bi-list rotate-0"} transition-transform duration-300 ease-out`}
                        ></i>
                    </nav>
                </div>


                <nav className={`${open ? "max-h-[320px]" : "max-h-[0px]"} absolute lg:hidden flex flex-col overflow-hidden  w-full transition-[max-height] duration-400 ease-in`}>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold">Home</button>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold">About</button>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold">Contact</button>
                </nav>
            </header >

        </>
    )
}