import logoTest from "../assets/logoTest.png"
import "../TEST/General.css"

export default function Navigation() {
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 border-b border-b-gray-200 py-[12px] px-[16px]">
                <div className="bg-[rgb(var(--bg-white-72))]  max-w-[1120px] m-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="w-[40px] overflow-hidden rounded-lg" >
                            <img src={logoTest} alt="" />
                        </span>

                        <span>
                            <p className="m-0 font-['Space_Grotesk',sans-serif] font-bold tracking-tighter text-lg">Lyncks</p>
                        </span>
                    </div>
                    <nav className="flex gap-3 font-semibold text-[14px] font-['Space_Grotesk',sans-serif]">

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>Home</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>About</button>
                        </div>

                        <div className="py-2 px-3 rounded-full hover:bg-[rgb(0_7_255_/_16%)] transition-colors duration-300 ease-in-out">
                            <button>Contact</button>
                        </div>

                    </nav>
                </div>
            </header >
        </>
    )
}