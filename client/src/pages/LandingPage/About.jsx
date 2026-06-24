import gsap from "gsap";
import { useLayoutEffect, useState } from "react";
import "../../css/About.css"

export default function About() {

    const [active, setActive] = useState(0);

    const about_box_step = [
        {
            step: "STEP 1", title: "Set your schedule",
            description: "Add each link once — Gmeet, Zoom, Discord, whatever you use — and tell Lyncks what time block it belongs to.",
            color: "about__amber"
        },
        {
            step: "STEP 2", title: "Share one link",
            description: "Put your single lyncks.io link in your bio, group chat, or syllabus. That's the only link anyone ever needs from you.",
            color: "about__indigo"
        },
        {
            step: "STEP 3",
            title: "Lyncks reads the clock",
            description: "When someone taps your link, Lyncks checks the current time and instantly redirects them to the right class, every time.",
            color: "about__blue"
        },
    ]

    const about_strip = [
        {
            number: "1",
            description: "link to remember",

        },
        {
            number: "10+",
            description: "destinations handled",

        },
        {
            number: "0",
            description: "missed classes from wrong links",

        },
    ]

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: ".about",
                start: "top 80%"
            }
        })


        tl.fromTo(".about_text",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0 }
        )
            .fromTo(".about_header",
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0 },
            )
            .fromTo(".about_line",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    transformOrigin: 'left center',
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: '.about__line',
                        start: 'top 90%',
                    }
                }, 0.2
            )
        const cards = gsap.utils.toArray('.about__card')

        cards.forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        })


    }, [])




    return (
        <>
            <section id="about" className="about relative py-[120px] px-0">
                <div className="max-w-[1120px] my-0 mx-auto py-0 px-[32px]">
                    <p className="about_text font-['JetBrains_Mono',monospace] text-[12px] tracking-[0.12em] text-[#5b5fef] mb-[18px]">ABOUT LYNCKS</p>
                    <p className="about_header text-[clamp(26px,3.6vw,38px)] font-bold font-['Space_Grotesk',sans-serif] leading-[1.3] tracking-[-0.01em] max-w-[720px]">
                        Ready to <br />
                        carry one link instead of ten?
                    </p>
                    <div className="about_line h-[1px] bg-[#22304f] mt-[40px] mb-[56px] mx-0" />

                    <div className="lg:grid-cols-3 grid gap-[20px]">
                        {about_box_step.map((item, index) => (
                            <div key={index} className={`about__card cursor-pointer bg-[#141d35] border-[2px] border-[#22304f] py-[28px] 
                            ${item.color} px-[24px] transition-colors duration-300 ease-in-out rounded-lg`}>
                                <span className="inline-block mb-[16px] text-[#94a3b8] text-[11px] tracking-[0.08em]">{item.step}</span>
                                <p className="text-white font-['JetBrains_Mono',monospace]  text-[19px] font-bold mb-[10px]">{item.title}</p>
                                <p className="text-[14px] text-[#94a3b8] font-['Space_Grotesk',sans-serif]">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-[64px] flex justify-between flex-wrap gap-[32px] rounded-[16px] bg-[#111a2e] border-1 border-[#22304f] p-[32px]">
                        {about_strip.map((item, index) => (
                            <div className="flex flex-col items-center gap-[6px] flex-1 min-w-[140px]">
                                <span className="font-['Space_Grotesk',sans-serif] text-[#4ade9b] font-bold text-[32px]">{item.number}</span>
                                <span className="text-[#94a3b8] text-center text-[12px]">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}