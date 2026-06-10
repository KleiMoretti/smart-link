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
            <section className="md:min-h-screen  min-h-auto flex items-center p-3 overflow-hidden mb-10">
                <div className="about-main flex justify-center w-full">

                    <div className="about-width w-[60%]">
                        <div className="about-wrap flex gap-10 about-wrap">
                            <div className="w-full whitespace-nowrap">
                                <p className="about-about font-bold text-gray-400 ">About</p>
                                <p className="about-header font-ubuntu font-bold text-[3vw]">Beginnings</p>
                                <p className="about-sub m-0 font-medium text-[1.5vw] text-gray-700">We provide a wide range of services to meet</p>
                                <p className="about-sub m-0 font-medium text-[1.5vw] text-gray-700">even the most daring requirements.</p>
                            </div>

                            <div className="about-content  text-gray-600 flex w-full">
                                <p className="m-0">Our business is built on understanding and long-term relations with clients.
                                    To survive in today's competitive and ever-changing business world, every
                                    business has to operate efficiently, grow, and succeed. It is very important to
                                    properly use the information and technology to stay rival within your market.</p>
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