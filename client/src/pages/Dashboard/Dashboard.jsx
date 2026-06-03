import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Table from "../Dashboard/Table"
import CreateLink from "../Dashboard/Create"

export default function Dashboard() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [tab, setTab] = useState("")

    const handleDashboard = () => setTab("Dashboard");
    const handleSchedules = () => setTab("Schedule");
    const handleSubscription = () => setTab("Subscription");
    const handleSettings = () => setTab("Settings");
    const handleCreateLink = () => setTab("CreateLink");



    useEffect(() => {
        setTab("Schedule");
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
    }
    if (loading) return <p>Loading...</p>

    return (
        <section className="p-10">
            <nav className="flex justify-between items-center">
                <div className="font-bold flex items-center">
                    <p>FluxLink</p>
                </div>
                <div className="flex gap-5 flex items-center">
                    <div>
                        <p className={`m-0 cursor-pointer ${tab === "Dashboard" ? "font-bold" : ""}`} onClick={handleDashboard} >Dashboard</p>
                    </div>
                    <div>
                        <p className={`m-0 cursor-pointer ${tab === "Schedule" ? "font-bold" : ""}`} onClick={handleSchedules}>Schedules</p>
                    </div>
                    <div>
                        <p className={`m-0 cursor-pointer ${tab === "Subscription" ? "font-bold" : ""}`} onClick={handleSubscription}>Subscription</p>
                    </div>
                    <div>
                        <p className={`m-0 cursor-pointer ${tab === "Settings" ? "font-bold" : ""}`} onClick={handleSettings}>Settings</p>
                    </div>
                </div>

                <div className={`bg-black text-white font-bold flex items-center p-2 rounded-md cursor-pointer  ${tab === "CreateLink" ? "hidden" : ""}`} onClick={handleCreateLink}>
                    < p className="m-0" >Create Link</p>
                </div>
            </nav>



            {tab === "Dashboard" && "<Dashboard/>"}
            {tab === "Schedule" && <Table profile={userDetails?.photoURL} name={userDetails?.displayName} email={userDetails?.email} />}
            {tab === "Subscription" && "<Subscription />"}
            {tab === "Settings" && "<Settings />"}
            {tab === "CreateLink" && <CreateLink />}


            <div className="text-white cursor-pointer bg-red-500 w-[100px] items-center flex justify-center p-2 rounded-md mt-4 hover:bg-red-400">
                <p className="m-0" onClick={handleSignOUt}>Sign Out</p>
            </div>
        </section >
    );
}