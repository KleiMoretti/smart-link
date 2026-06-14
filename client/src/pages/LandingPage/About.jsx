import CodeImg from "../../assets/codeImg.png";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            imgRef.current,
            { scale: 2 },
            {
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);



    return (
        <>
            <section id="about" className="md:min-h-screen  min-h-auto flex items-center p-3 overflow-hidden mb-10">
                <div className="about-main flex justify-center w-full">

                    <div className="about-width w-[60%]">
                        <div className="about-wrap flex gap-10 about-wrap">
                            <div className="w-full whitespace-nowrap">
                                <p className="about-about font-bold text-gray-400 ">About</p>
                                <p className="about-header font-ubuntu font-bold text-[3vw]">Beginnings</p>
                                <p className="about-sub m-0 font-medium text-[1.3vw] text-gray-700">AI-powered time-based redirection and scheduling</p>
                                <p className="about-sub m-0 font-medium text-[1.3vw] text-gray-700">It automates link routing scheduling needs with ease.</p>
                            </div>

                            <div className="about-content  text-gray-600 flex w-full">
                                <p className="m-0">Smartklink is a smart, AI-powered redirection platform that delivers dynamic and context-aware content based on time, user behavior, and predefined logic rules. It enables businesses to automate link management, streamline user journeys, and optimize engagement by ensuring that every user is directed to the most relevant destination at the right moment. Through intelligent routing and adaptive decision-making, Smartklink enhances user experience, improves conversion efficiency, and provides a more personalized and data-driven digital interaction.</p>
                            </div>
                        </div>

                        <div
                            ref={containerRef}
                            className="mt-10 w-full"
                        >
                            <img
                                ref={imgRef}
                                className="w-full rounded-2xl"
                                src={CodeImg}
                                alt=""
                            />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}