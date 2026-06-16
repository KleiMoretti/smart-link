import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import phoneImg from "../../assets/phone.png"

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);
    const hello = useRef(null);
    const facebook = useRef(null);
    const messenger = useRef(null);
    const phone = useRef(null);
    const github = useRef(null);
    const tiktok = useRef(null);

    const via1 = useRef(null);
    const viaSub1 = useRef(null);

    const via2 = useRef(null);
    const viaSub2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "triggerPoint viewportPoint",
                    end: "bottom bottom",
                    scrub: 4,
                    pin: true,
                    anticipatePin: 1
                },
            });


            tl.fromTo(phone.current,
                { opacity: 1, y: 500 },
                { y: 0, ease: "none" }
            )
                .fromTo(hello.current,
                    { opacity: 1, x: -90, y: -650 },
                    { opacity: 1, x: -90, y: -200, ease: "none" },
                    "<0.2"
                )
                .fromTo(facebook.current,
                    { opacity: 1, x: 100, y: -160 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(messenger.current,
                    { opacity: 1, x: 100, y: -300 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(github.current,
                    { opacity: 1, x: -150, y: -200 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(tiktok.current,
                    { opacity: 1, x: -200, y: -100 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )

                .fromTo(via1.current,
                    { opacity: 0, x: 0, y: -100 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(viaSub1.current,
                    { opacity: 0, x: 0, y: -100 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(via2.current,
                    { opacity: 0, x: 0, y: -100 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                )
                .fromTo(viaSub2.current,
                    { opacity: 0, x: 0, y: -100 },
                    { opacity: 1, x: 0, y: 0, ease: "none" },
                    "<0.2"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);



    return (
        <>
            <section id="contact"
                ref={sectionRef}
                className="h-[100vh] relative overflow-hidden flex items-center justify-center overflow-hidden"
            >
                <div className="relative flex items-center justify-center">

                    <div ref={via1} className="absolute left-full w-80 ml-120 -top-50 bg-white p-3 rounded-lg shadow-lg text-4xl font-bold"
                    >
                        Via Social Media

                    </div>
                    <div ref={viaSub1} className="absolute left-full ml-120 mt-10 w-90">
                        You can reach out and connect with me through my social media platforms for messages, updates, and collaborations. I’m active on Facebook for direct communication and community updates, GitHub for my projects and code repositories, TikTok for short content and creative posts, and Messenger for quick and easy conversations. Feel free to message me anytime on any of these platforms, whether it’s for questions, project discussions, or just to connect.
                    </div>

                    {/* BOX */}
                    <div ref={phone} className="absolute w-[700px] h-[700px] bg-white text-black flex items-center justify-center font-bold">
                        <img src={phoneImg} alt="" />
                    </div>

                    {/* HELLO */}
                    <div
                        ref={hello}
                        className="absolute left-full  bg-white p-3 rounded-lg shadow-lg text-4xl font-bold"
                    >
                        CONTACT
                    </div>




                    {/* Facebook */}
                    <div
                        ref={facebook}
                        className="absolute left-full ml-5 top-3 font-bold bg-white p-3 rounded-lg shadow-lg text-6xl cursor-pointer hover:scale-110 transition-transform duration-300"
                    >
                        <i className="bi bi-facebook text-blue-900"></i>
                    </div>

                    {/* Messenger */}
                    <div
                        ref={messenger}
                        className="absolute left-full -ml-25 top-3  bg-white p-3 rounded-lg shadow-lg text-6xl font-bold"
                    >
                        <i className="bi bi-messenger text-blue-900"></i>
                    </div>

                    <div
                        ref={github}
                        className="absolute left-full -ml-25 -top-30 bg-white p-3 rounded-lg shadow-lg text-6xl font-bold"
                    >
                        <i className="bi bi-github"></i>
                    </div>

                    <div
                        ref={tiktok}
                        className="absolute left-full ml-5 -top-30  bg-white p-3 rounded-lg shadow-lg text-6xl font-bold"
                    >
                        <i className="bi bi-tiktok"></i>
                    </div>





                    <div ref={via2} className="absolute rigth-full mr-320 w-80  -top-50 bg-white p-3 rounded-lg shadow-lg text-4xl font-bold"
                    >
                        Via Social Media

                    </div>
                    <div ref={viaSub2} className="absolute rigth-full mr-320 mt-10 w-90">
                        You can reach out and connect with me through my social media platforms for messages, updates, and collaborations. I’m active on Facebook for direct communication and community updates, GitHub for my projects and code repositories, TikTok for short content and creative posts, and Messenger for quick and easy conversations. Feel free to message me anytime on any of these platforms, whether it’s for questions, project discussions, or just to connect.
                    </div>



                </div>
            </section>
        </>
    );
}