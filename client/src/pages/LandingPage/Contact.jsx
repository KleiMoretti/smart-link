import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Phone from "../../assets/phone.png"

gsap.registerPlugin(ScrollTrigger);

// 🔥 global config
ScrollTrigger.config({
    limitCallbacks: true,
});

export default function Contact() {
    const fb = useRef(null);
    const mess = useRef(null);

    const phone = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            fb.current,
            {
                x: -600,
                y: 500,
                duration: 2
            },
            {
                x: "-49vw",  // move to center horizontally
                y: "120vh",   // move to center vertically
                ease: "none",
                scrollTrigger: {
                    trigger: fb.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                duration: 2
            }
        );
        gsap.fromTo(
            mess.current,
            {
                x: 600,
                y: 400,
                duration: 2
            },
            {
                x: "49vw",  // move to center horizontally
                y: "120vh",   // move to center vertically
                ease: "none",
                scrollTrigger: {
                    trigger: mess.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                duration: 2
            }
        );
        gsap.fromTo(
            phone.current,
            {

                y: 900,
                duration: 2
            },
            {
                y: "100vh",   // move to center vertically
                ease: "none",
                scrollTrigger: {
                    trigger: mess.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                duration: 2
            }
        );


    }, []);

    return (
        <div className="min-h-[300vh] relative flex justify-center">

            {/*
            */}

            <div>

                <i
                    ref={fb}
                    className="bi bi-facebook absolute top-4 right-2 text-5xl text-blue-500"
                ></i>

                <i
                    ref={mess}
                    className="bi bi-messenger absolute top-4 left-5 text-5xl text-blue-500"
                ></i>

                <div className="abolute">
                    <img ref={phone} className=" h-fit w-fit" src={Phone} alt="" />
                </div>

            </div>


        </div >
    );
}