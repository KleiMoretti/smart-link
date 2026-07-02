
import { useEffect, useState } from "react"
import Logo from "../../assets/logo1.png"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Table from "../Dashboard/Table"
import AI from "../Dashboard/AI"

export default function Navigation() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null)
    const [show, setShow] = useState("schedule")

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            setUserDetails(user);
        })
        return () => unsubscribe()
    }, [])


    return (
        <>
            <header className="fixed top-0 left-0  w-full flex justify-center items-center border border-gray-100 backdrop-blur-[14px] bg-gray/50 z-[10]">
                <div className="max-w-[1120px] flex justify-between w-full py-3 px-4">
                    <div className="flex items-center gap-2">
                        <span className="w-[40px] overflow-hidden rounded-lg" >
                            <img src={Logo} alt="" />
                        </span>

                        <span>
                            <p className="m-0 font-['Space_Grotesk',sans-serif] font-bold tracking-tighter text-lg">Lyncks</p>
                        </span>
                    </div>
                    <nav className="flex text-sm items-center gap-4">
                        <span className={`border border-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${show === "create_link" ? "hidden" : ""}`} onClick={() => setShow("create_link")}>Create link</span>
                        <span className={`border border-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${show === "schedule" ? "hidden" : ""} `} onClick={() => setShow("schedule")}>Schedule</span>
                        <span>
                            <img className="w-10 rounded-full" src={userDetails?.photoURL} alt="" />
                        </span>
                    </nav>

                </div>
            </header>

            <div className={` ${show === "create_link" ? "hidden" : ""}`}>
                <Table />
            </div>
            <div className={` ${show === "schedule" ? "hidden" : ""}`}>
                <AI />
            </div>

        </>
    )
}