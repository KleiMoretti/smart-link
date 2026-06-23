import Logo from "../../assets/logo1.png"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Footer from "./Footer"

import { useState, useRef } from "react"
import { useLayoutEffect } from "react"
import gsap from "gsap"

export default function Nav() {
    const [open, setOpen] = useState(false);
    const nav = useRef(null)


    const sectionScroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(nav.current, { y: "-10vh" })
            gsap.to(nav.current, { y: 0 })

        })
    })



    return (

        <>
            <header ref={nav} className="w-full fixed top-0 left-0 z-[100] border-b border-b-gray-200 backdrop-blur-[14px] bg-gray/50 ">
                <div className="bg-[rgb(var(--bg-white-72))]  py-[16px] px-[32px] max-w-[1120px] my-0 mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="w-[40px] overflow-hidden rounded-lg" >
                            <img src={Logo} alt="" />
                        </span>

                        <span>
                            <p className="m-0 font-['Space_Grotesk',sans-serif] font-bold tracking-tighter text-lg">Lyncks</p>
                        </span>
                    </div>
                    <nav className="lg:flex hidden gap-3 font-semibold text-[14px] font-['Space_Grotesk',sans-serif]">

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out" onClick={() => { sectionScroll("home") }}>
                            <button>Home</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out" onClick={() => { sectionScroll("about") }}>
                            <button>About</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out" onClick={() => { sectionScroll("contact") }}>
                            <button>Contact</button>
                        </div>

                    </nav>
                    <nav className="lg:hidden flex text-2xl" onClick={() => setOpen(prev => !prev)}>
                        <i className={`bi ${open ? "bi-x-lg rotate-90" : "bi-list rotate-0"} transition-transform duration-300 ease-out`}></i>
                    </nav>
                </div>


                <nav className={`${open ? "max-h-[320px]" : "max-h-[0px]"} absolute lg:hidden flex flex-col overflow-hidden  w-full transition-[max-height] duration-400 ease-in`}>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold" onClick={() => { sectionScroll("home") }}>Home</button>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold" onClick={() => { sectionScroll("about") }}>About</button>
                    <button className="m-0 text-left py-[16px] px-[32px] border-b border-gray-200 text-[#94a3b8] text-[14px] font-bold" onClick={() => { sectionScroll("contact") }}>Contact</button>
                </nav>
            </header >

            <main>
                <Home />
                <About />
                <Contact />
            </main>

            <footer>
                <Footer />
            </footer>


        </>
    )
}