
import "../../css/LandingPage.css"

export default function LandingPage() {

    return (

        <section className="relative h-screen overflow-hidden p-10 min-w-[300px] min-h-[300px]">
            {/* NAV */}
            <nav className="flex justify-between items-center">
                <div className="text-lg font-bold flex items-center leading-none w-fit whitespace-nowrap">
                    FLUX LINK
                </div>
                <div className="hidden lg:flex gap-6 text-sm items-center">
                    <div>
                        HOME
                    </div>
                    <div>
                        ABOUT
                    </div>
                    <div>
                        SERVICE
                    </div>
                    <div className=" hover:bg-pink-500">
                        CONTACT
                    </div>
                    <div className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors duration-300">
                        <button>LOGIN</button>
                    </div>
                </div>

                <div className="flex lg:hidden items-center text-xl leading-none">
                    <i className="bi bi-list"></i>
                </div>
            </nav>

            {/* MAIN */}
            <div className="main flex justify-center items-center gap-10 h-[80%] min-h-[90%] h-auto mt-[17px] lg:mt-0">
                {/* ICON */}
                <div className="flex justify-center items-center w-1/5">
                    <i className="bi bi-link-45deg text-[25vw] leading-none"></i>
                </div>

                {/* TEXT */}
                <div className="text-2 w-1/4 text-[1.1vw] leading-relaxed">
                    <p>
                        <span className="title-2 font-bold">FLUXLINK</span> is a dynamic interactive system that reacts to motion-based triggers in real time. It uses collision detection to activate visual elements in a controlled sequence. The goal is to create smooth, intelligent transitions that feel responsive and natural.
                    </p>
                </div>
            </div>
        </section>

    )

}