
import { useState, useEffect } from "react"
import Logo from "../../assets/company-logo.png"
import "../../css/LandingPage.css"
import Table from "./Table"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Create from "../Dashboard/Create"
import Settings from "../Dashboard/Settings"
import Feedback from "../Dashboard/Feedback"
import EditTable from "./EditTable"
import { CutLength } from "../../utils/CutLength"
import "../../css/LandingPage.css"


export default function Dashboard() {
    const [showLines, setShowLine] = useState(false)
    const [tab, setTab] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [profileSettings, setprofileSettings] = useState(false);
    const [ShowNav, setShowNav] = useState(true)

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
        setLoading(false)

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOUt = async () => {
        await signOut(auth)
        navigate("/login")
    }

    const handleTable = () => setTab("Table")
    const handleSubscription = () => setTab("EditTable")
    const handleFeedback = () => setTab("Feedback")
    const handleSettings = () => setTab("Settings")
    const handleCreate = () => setTab("Create")
    const ProfileSettings = () => setprofileSettings(prev => !prev)

    if (loading) return <p>Loading...</p>


    return (
        <>
            <div className="min-w-[200px]">
                <nav className="w-full flex justify-center border boder-b-10 py-2 min-w-[200px]">
                    <div className="flex flex-nowrap lg:w-[60%] w-full justify-between items-center py-2 px-3">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                            <img className="w-10" src={Logo} alt="" />
                            <p className="m-0 whitespace-nowrap font-ubuntu">Lyncks</p>
                        </div>
                        <div className="nav  flex flex-nowrap gap-10 items-center">
                            <p className={`m-0 cursor-pointer whitespace-nowrap transition-transform delay-300 ease-in-out ${tab === "Table" ? "font-bold text-gray-900" : ""}`} onClick={handleTable}>Schedules</p>
                            <p className={`m-0 cursor-pointer whitespace-nowrap transition-transform delay-300 ease-in-out ${tab === "EditTable" ? "font-bold text-gray-900" : ""}`} onClick={handleSubscription}>Edit Schedule</p>
                            <p className={`m-0 cursor-pointer whitespace-nowrap transition-transform delay-300 ease-in-out ${tab === "Feedback" ? "font-bold text-gray-900" : ""}`} onClick={handleFeedback}>Feedback</p>
                            <p className={`m-0 cursor-pointer whitespace-nowrap transition-transform delay-300 ease-in-out ${tab === "Settings" ? "font-bold text-gray-900" : ""}`} onClick={handleSettings}>Settings</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="lg:flex hidden flex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-md cursor-pointer" onClick={handleCreate}>
                                <p className="m-0 whitespace-nowrap">Create Link</p>
                            </div>
                            <div className="relative">
                                <i className="burger bi bi-list hidden text-2xl cursor-pointer" onClick={() => setShowNav(prev => !prev)}></i>

                                <div className={` absolute bg-white  border border-gray-100 flex justify-center flex-col w-fit -ml-[200px]  whitespace-nowrap rounded-sm   ${ShowNav ? "hidden" : ""}`}>

                                    <div className="p-2 w-full relative border border-gray-100">
                                        {/* Trigger */}
                                        <div
                                            className="flex items-center cursor-pointer gap-2"
                                            onClick={ProfileSettings}
                                        >
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={userDetails?.photoURL}
                                                alt=""
                                            />

                                            <div className="text-sm">
                                                <p className="m-0 text-sm font-medium">
                                                    {CutLength(userDetails?.displayName, 10)}
                                                </p>
                                                <p className="m-0 text-[10px]">{userDetails?.email}</p>
                                            </div>
                                        </div>

                                        {/* Dropdown */}
                                        <div
                                            className={`absolute right-0 mt-3 w-[260px] bg-white border border-gray-100 p-2 shadow-sm rounded-lg ${profileSettings ? "block" : "hidden"
                                                }`}
                                        >
                                            <div className="border-b border-gray-200 p-2 text-gray-500">
                                                <p className="text-sm font-medium">
                                                    {userDetails?.displayName}
                                                </p>
                                                <p className="text-[10px]">{userDetails?.email}</p>
                                            </div>

                                            <div
                                                className="w-full flex justify-center items-center bg-red-500 rounded-md text-white p-1 mt-4 cursor-pointer hover:bg-red-600"
                                                onClick={handleSignOUt}
                                            >
                                                Log out
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`m-0 p-2 hover:bg-gray-900 hover:text-blue-800 cursor-pointer transition-color duration-300 transition-transform delay-300 ease-in-out ${tab === "Table" ? "font-bold text-gray-900 " : ""}`} onClick={() => { handleTable(); setShowNav(prev => !prev); }}>Schedules</p>
                                    <p className={`m-0 p-2 hover:bg-gray-900 hover:text-blue-800 cursor-pointer transition-color duration-300 transition-transform delay-300 ease-in-out ${tab === "EditTable" ? "font-bold text-gray-900" : ""}`} onClick={() => { handleSubscription(); setShowNav(prev => !prev); }}>Edit Schedule</p>
                                    <p className={`m-0 p-2 hover:bg-gray-900 hover:text-blue-800 cursor-pointer transition-color duration-300 transition-transform delay-300 ease-in-out ${tab === "Feedback" ? "font-bold text-gray-900" : ""}`} onClick={() => { handleFeedback(); setShowNav(prev => !prev); }}>Feedback</p>
                                    <p className={`m-0 p-2 hover:bg-gray-900 hover:text-blue-800 cursor-pointer transition-color duration-300 transition-transform delay-300 ease-in-out ${tab === "Settings" ? "font-bold text-gray-900" : ""}`} onClick={() => { handleSettings(); setShowNav(prev => !prev); }}>Settings</p>
                                    <p className={`m-0 p-2 hover:bg-gray-900 hover:text-blue-800 cursor-pointer transition-color duration-300 transition-transform delay-300 ease-in-out ${tab === "Create" ? "font-bold text-gray-900" : ""}`} onClick={() => { handleCreate(); setShowNav(prev => !prev); }}>Create Link</p>
                                </div>
                            </div>
                            <div className="nav ml-10">
                                <div className={`flex items-center m-0 cursor-pointer`} onClick={ProfileSettings}>
                                    <img className="m-0 w-10 h-10 rounded-full" src={userDetails?.photoURL} alt="" />
                                </div>
                                <div className={`absolute max-w-[300px] bg-white mt-5 -ml-50 border border-gray-100 p-2 shadow-sm rounded-lg ${profileSettings ? "" : "hidden"}`}>
                                    <div className="border-gray-200 border-b p-2 text-gray-500">
                                        <p className="m-0 text-sm font-medium">{userDetails?.displayName}</p>
                                        <p className="m-0 text-[10px]">{userDetails?.email}</p>
                                    </div>
                                    <div className="w-full flex justify-center text-[15px] items-center bg-red-500 rounded-md text-white p-1 mt-4 cursor-pointer hover:bg-red-600 transition-transform delay-300 ease-in-out" onClick={handleSignOUt}>
                                        Log out
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="content-holder w-full flex justify-center mt-20 h-auto mb-10 min-w-[200px]">
                    {tab === "Table" && <Table />}
                    {tab === "EditTable" && <EditTable />}
                    {tab === "Feedback" && <Feedback />}
                    {tab === "Settings" && <Settings />}
                    {tab === "Create" && <Create />}

                </div>
            </div>

        </>
    )
}