
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";


export default function Home() {
    const Navigate = useNavigate();

    const [active, setActive] = useState(0)

    const sectionScroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }

    const example = [
        { time: "08:00", subject: "Calculus 101", app: "→ Google Meet" },
        { time: "09:30", subject: "World History", app: "→ Zoom" },
        { time: "11:00", subject: "Chemistry Lab", app: "→ Google Meet" },
        { time: "13:00", subject: "Group Project", app: "→ Discord" },
        { time: "15:00", subject: "Study Hall", app: "→ Notion Page" },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % example.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);




    return (
        <>

            {/* HERO GLOW CIRLCE */}
            <div id="home" className="relative overflow-hidden pt-[140px]  pb-[80px] pl-0 pr-0 flex  align-items-center lg:h-screen">
                <div className="absolute  -right-[10%] w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(91,95,239,0.22),_transparent_70%)] pointer-events-none">
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1fr] z-[10] item-center relative gap-[50px] max-w-[1120px] my-0 mx-auto py-0 px-[32px]">
                    {/* HERO TITLE */}
                    <div>
                        <p className="font-['JetBrains_Mono',monospace] text-[12px] font-bold tracking-[0.12em] text-[#5b5fef]">ONE LINK · ANY TIME · RIGHT DESTINATION</p>
                        <p className="font-['Space_Grotesk',sans-serif] leading-[1.08] font-bold text-[55px]  tracking-[-0.02em] flex flex-col ">
                            <span >Stop sharing</span>
                            <span>10+ different links.</span>
                            <span className="text-[#5b5fef]">Share one.</span>
                        </p>
                        <p className="mt-[22px] text-[18px] leading-[1.65] text-[#94a3b8] max-w-[480px]">
                            Lyncks turns your whole class schedule into a single smart link.
                            Students tap it and land exactly where they're supposed to be — Calc at 8, Chem at 11 — Lyncks redirects by time,
                            automatically.
                        </p>
                        <div className="flex gap-[14px]  mt-[32px] flex-wrap ">
                            <div className="bg-[#5b5fef] hover:shadow-xl shadow-indigo-500/50 py-[14px] px-[26px] rounded-lg text-[14px] font-medium cursor-pointer"
                                onClick={() => Navigate("/login")}>
                                <a className="text-white !no-underline" href="login">
                                    Get your Lyncks link
                                </a>
                            </div>

                            <div className=" hover:bg-gray-100 py-[14px] px-[26px] rounded-lg text-[14px] font-medium border border-gray-100 cursor-pointer"
                                onClick={() => { sectionScroll("about") }}>
                                <a className="text-black !no-underline" href="#about">
                                    See how it works
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* HERO TIMELINE */}
                    <div className="bg-[#141d35] border-1 border-gray-900 shadow-lg rounded-2xl p-[24px]">
                        <div className="flex items-center gap-2 mt-[7px]">
                            <span className="w-[10px] h-[10px] bg-green-400 rounded-full shadow-2xl"></span>
                            <span className=" text-[#94a3b8]  text-[13px] text-[#94a3b8 font-['JetBrains_Mono',monospace] ">lyncks.io/juan-delacruz</span>
                        </div>

                        <div className="relative flex flex-col gap-2 mt-3">
                            {example.map((item, index) => (
                                <div key={index} className={`${active === index ? "border-1 border-indigo-500" : "border-1 border-[#22304f]"} grid lg:grid-cols-[56px_1fr_auto] items-center gap-[12px] py-[18px] px-[20px] rounded-lg border-1 border-[#22304f] bg-[#111a2e] `}>
                                    <span className="text-[#5b6783] text-[12px] font-['JetBrains_Mono',monospace]">{item.time}</span>
                                    <span className="text-white text-[14px] font-medium">{item.subject}</span>
                                    <span className="text-[#5b6783] text-[12px] font-['JetBrains_Mono',monospace]  font-medium">{item.app}</span>
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
