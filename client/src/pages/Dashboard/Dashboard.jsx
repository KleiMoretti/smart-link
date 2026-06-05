
import { useState, useEffect } from "react"
import "../../css/Dashboard.css"
import Table from "./Table"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Create from "../Dashboard/Create"
import Settings from "../Dashboard/Settings"
import Feedback from "../Dashboard/Feedback"
import Subscriptions from "../Dashboard/Subscriptions"


export default function Dashboard() {
    const [showLines, setShowLine] = useState(false)
    const [tab, setTab] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [profileSettings, setprofileSettings] = useState(false);

    useEffect(() => {
        setTab("Table");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
                setLoading(true)

            } else {
                setUserDetails(user);
                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    const handleSignOUt = async () => {
        await signOut(auth)
        navigate("/login")
    }

    const handleTable = () => setTab("Table")
    const handleSubscription = () => setTab("Subscriptions")
    const handleFeedback = () => setTab("Feedback")
    const handleSettings = () => setTab("Settings")
    const handleCreate = () => setTab("Create")
    const ProfileSettings = () => setprofileSettings(prev => !prev)

    if (loading) return <p>Loading...</p>


    return (
        <>
            <nav className="border boder-gray-500">
                <div className="flex justify-center h-20 items-center gap-10">
                    <div className="flex lg:w-[50%] justify-between gap-20">
                        <div className="flex items-center">
                            <h2 className="tracking-tight font-ubuntu font-bold whitespace-nowrap md:text-[2vw]">FluxLink</h2>
                        </div>
                        <div className="flex gap-10 items-center font-medium cursor-pointer">
                            <div onClick={handleTable}>
                                Schedules
                            </div>
                            <div onClick={handleSubscription}>
                                Subscription
                            </div>
                            <div onClick={handleFeedback}>
                                Feedback
                            </div>
                            <div onClick={handleSettings}>
                                Settings
                            </div>
                        </div>
                        <div className="whitespace-nowrap flex bg-blue-500 hover:bg-blue-600 items-center px-3 py-2 text-white rounded-md font-bold cursor-pointer transition-colors duration-200"
                            onClick={handleCreate}>
                            Create Link
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center m-0 cursor-pointer" onClick={ProfileSettings}>
                            <img className="m-0 w-10 h-10 rounded-full" src={userDetails.photoURL} alt="" />
                        </div>
                        <div className={`absolute max-w-[300px] bg-white mt-1 border border-gray-100 p-2 shadow-sm rounded-lg ${profileSettings ? "" : "hidden"}`}>
                            <div className="border-gray-200 border-b p-2 text-gray-500">
                                <p className="m-0 text-sm font-medium">{userDetails.displayName}</p>
                                <p className="m-0 text-[10px]">{userDetails.email}</p>
                            </div>
                            <div className="w-full flex justify-center text-[15px] items-center bg-red-500 rounded-md text-white p-1 mt-4 cursor-pointer hover:bg-red-600" onClick={handleSignOUt}>
                                Log out
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="w-full flex justify-center mt-20 h-auto mb-10">
                {tab === "Table" && <Table />}
                {tab === "Subscriptions" && <Subscriptions />}
                {tab === "Feedback" && <Feedback />}
                {tab === "Settings" && <Settings />}
                {tab === "Create" && <Create />}

            </div>






        </>
    )
}