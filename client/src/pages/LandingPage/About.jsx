import CodeImg from "../../assets/codeImg.png";

export default function About() {
    return (
        <>
            <section className="min-h-screen  flex items-center p-3">
                <div className="about-main flex justify-center w-full">

                    <div className="about-width w-[60%]">
                        <div className="about-wrap flex gap-10 about-wrap">
                            <div className="w-full whitespace-nowrap">
                                <p className="about-about font-bold text-blue-700 ">About</p>
                                <p className="about-header font-ubuntu font-bold text-[3vw]">Beginnings</p>
                                <p className="about-sub m-0 font-medium text-[1.5vw]">We provide a wide range of services to meet</p>
                                <p className="about-sub m-0 font-medium text-[1.5vw]">even the most daring requirements.</p>
                            </div>

                            <div className="about-content text-[0.9vw] text-gray-600 flex w-full">
                                <p className="m-0">Our business is built on understanding and long-term relations with clients.
                                    To survive in today's competitive and ever-changing business world, every
                                    business has to operate efficiently, grow, and succeed. It is very important to
                                    properly use the information and technology to stay rival within your market.</p>
                            </div>
                        </div>

                        <div className="mt-10 h-110 w-full overflow-hidden">
                            <img className="w-full rounded-2xl" src={CodeImg} alt="" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}