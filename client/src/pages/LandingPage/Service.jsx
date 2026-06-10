export default function Service() {

    return (
        <>
            <section className="service-section flex items-center bg-gray-100 py-10">
                <div className="w-full flex justify-center">

                    {/* container */}
                    <div className="service-w w-[95%] md:w-[60%]">

                        {/* header */}
                        <div className="flex flex-col items-center text-center">
                            <p className="service-header font-ubuntu font-medium text-2xl md:text-[2vw]">
                                Services for You
                            </p>

                            <p className="service-sub mt-2 text-sm md:text-[1vw]">
                                We provide a range of services designed to help you achieve your goals.
                            </p>
                        </div>

                        {/* card */}
                        <div className="flex mt-10 lg:shadow-sm">
                            <div className="service-bg w-full bg-white flex flex-col md:flex-row p-5 gap-3 rounded-lg">


                                <div className="bg-blue-100 p-2 flex justify-center h-fit rounded-full w-fit">
                                    <i className="service-icon text-blue-500 bi bi-link-45deg text-xl md:text-[2vw]"></i>
                                </div>


                                <div>
                                    <p className="service-title font-bold text-lg">
                                        Smart-link Schedule
                                    </p>

                                    <p className="service-content text-sm md:text-[1vw] leading-relaxed">
                                        Smart-Link simplifies link sharing by turning multiple URLs into one organized destination. Whether for classes, teams, projects, or personal use, Smart-Link lets you manage schedules, categorize links, and provide quick access to the resources people need—anytime, anywhere.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}