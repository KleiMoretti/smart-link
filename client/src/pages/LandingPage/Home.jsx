import CodeImg from "../../assets/home-code.png";
import { MoveY, MoveX } from "../../animation/Moves"
import { useLayoutEffect, useRef } from "react";


export default function Home() {
    const MoveX1 = useRef();
    const MoveX2 = useRef();
    const MoveY1 = useRef();

    useLayoutEffect(() => {
        if (!MoveX1.current || !MoveX2.current || !MoveY1.current) return;

        MoveX(MoveX1.current, -100, 0, 2);
        MoveX(MoveX2.current, 100, 0, 2);
        MoveY(MoveY1.current, 100, 0, 2);
    }, []);

    return (
        <>
            <section id="home" className="min-h-auto md:min-h-screen">
                <div className="content-f1 flex w-full justify-center mt-20 min-w-[200px]">
                    <div className="text-wrapper flex justify-between w-[60%] p-3 gap-3">
                        <div className="w-full flex  items-center text-[1vw]" ref={MoveX1}>
                            <div>
                                <div>
                                    <p className="main-text m-0 font-ubuntu font-sm font-medium whitespace-nowrap text-[2.5vw]">Smart Hyperlink</p>
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

                <div className="img w-full flex justify-center mt-10 p-2 min-w-[200px] " ref={MoveY1}>
                    <div className="img-parent w-[60%] justify-center">
                        <img className="img-pic rounded-2xl" src={CodeImg} loading="eager" fetchPriority="high" alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}