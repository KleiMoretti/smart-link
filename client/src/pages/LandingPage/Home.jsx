
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../css/Home.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
    const Navigate = useNavigate();

    const [active, setActive] = useState(0)

    const sectionScroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }

    const example = [
        { time: "08:00", subject: "Calculus 101", app: "→ Google Meet", color: "border__teal" },
        { time: "09:30", subject: "World History", app: "→ Zoom", color: "border__orange" },
        { time: "11:00", subject: "Chemistry Lab", app: "→ Google Meet", color: "border__indigo" },
        { time: "13:00", subject: "Group Project", app: "→ Discord", color: "border__fuchsia" },
        { time: "15:00", subject: "Study Hall", app: "→ Notion Page", color: "border__emerald" },
    ]

    useEffect(() => {

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % example.length);
        }, 2000);




        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo(
            '.hero__eyebrow',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 }, 0.1
        )
            .fromTo(
                '.hero__title-line',
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
                0.25
            )

            .fromTo('.hero_subtitle',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7 }, 0.6
            )

            .fromTo(
                '.hero__btn',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                0.75
            )

            .fromTo(
                '.hero__timeline-card',
                { opacity: 0, y: 40, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9 },
                0.5
            )

            .fromTo(
                '.hero__block',
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.10 },
                0.9
            )


        return () => {
            tl.kill();
            clearInterval(interval);
        }
    }, []);




    return (
        <>

            {/* HERO GLOW CIRLCE */}
            <div id="home" className="relative overflow-hidden pt-[140px]  pb-[80px] pl-0 pr-0 flex  items-center lg:h-screen">
                <div className="absolute -right-[10%] w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(91,95,239,0.22),_transparent_70%)] pointer-events-none">
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1fr] z-[10] item-center relative gap-[50px] max-w-[1120px] my-0 mx-auto py-0 px-[32px]">
                    {/* HERO TITLE */}
                    <div>
                        <p className="hero__eyebrow font-['JetBrains_Mono',monospace] text-[12px] font-bold tracking-[0.12em] text-[#5b5fef]">ONE LINK · ANY TIME · RIGHT DESTINATION</p>
                        <p className="font-['Space_Grotesk',sans-serif] leading-[1.08] font-bold text-[clamp(36px,6vw,56px)]  tracking-[-0.02em] flex flex-col">
                            <span className="hero__title-line">Stop sharing</span>
                            <span className="hero__title-line">10+ different links.</span>
                            <span className="hero__title-line text-[#5b5fef]">Share one.</span>
                        </p>
                        <p className="hero_subtitle mt-[22px] text-[18px] leading-[1.65] text-[#94a3b8] max-w-[480px]">
                            Lyncks turns your whole class schedule into a single smart link.
                            Students tap it and land exactly where they're supposed to be — Calc at 8, Chem at 11 — Lyncks redirects by time,
                            automatically.
                        </p>
                        <div className="flex gap-[14px]  mt-[32px] flex-wrap ">
                            <div className="hero__btn bg-[#5b5fef] hover:shadow-xl shadow-indigo-500/50 py-[14px] px-[26px] rounded-lg text-[14px] font-medium cursor-pointer"
                                onClick={() => Navigate("/login")}>
                                <a className=" text-white !no-underline" href="login">
                                    Get your Lyncks link
                                </a>
                            </div>

                            <div className="hero__btn hover:bg-gray-100 py-[14px] px-[26px] rounded-lg text-[14px] font-medium border border-gray-100 cursor-pointer"
                                onClick={() => { sectionScroll("about") }}>
                                <a className="text-black !no-underline" href="#about">
                                    See how it works
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* HERO TIMELINE */}
                    <div className="hero__timeline-card bg-[#141d35] border-1 border-gray-900 shadow-lg rounded-2xl p-[24px]">
                        <div className="flex items-center gap-2 mt-[7px]">
                            <span className="w-[10px] h-[10px] bg-green-400 rounded-full shadow-2xl"></span>
                            <span className=" text-[#94a3b8]  text-[13px] text-[#94a3b8 font-['JetBrains_Mono',monospace] ">lyncks.io/juan-delacruz</span>
                        </div>

                        <div className="relative flex flex-col gap-2 mt-3">
                            {example.map((item, index) => (
                                <div key={index} className={`hero__block grid lg:grid-cols-[56px_1fr_auto] items-center gap-[12px] py-[18px] px-[20px] rounded-lg bg-[#111a2e]
                                    ${active === index
                                        ? `border-1 ${item.color}`
                                        : "border-1 border-[#22304f]"
                                    }`}>
                                    <span className="text-[#5b6783] text-[12px] font-['JetBrains_Mono',monospace]">{item.time}</span>
                                    <span className="text-white text-[14px] font-medium">{item.subject}</span>
                                    <span className="text-[#5b6783] text-[12px] font-['JetBrains_Mono',monospace] font-medium">{item.app}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[#94a3b8] mt-3 text-[12px] text-center">Redirect target updates live based on current time.</p>
                    </div>
                </div>

            </div>

        </>
    )
}
