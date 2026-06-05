import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ profile, name, email }) {
    const navigate = useNavigate()

    const [showDay, setDay] = useState("full week");
    const [loading, setLoading] = useState(true);
    const [links, setLink] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);

                const token = await user.getIdToken();

                const res = await axios.get("http://localhost:5000/api/GetLinks", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    setLink(res.data.link);
                    console.log(res.data.link);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);



    const handleFull = () => setDay("full week")
    const handleMon = () => setDay("Monday")
    const handleTue = () => setDay("Tuesday")
    const handleWed = () => setDay("Wednesday")
    const handleThu = () => setDay("Thursday")
    const handleFri = () => setDay("Friday")
    const handleSat = () => setDay("Saturday")
    const handleSun = () => setDay("Sunday")

    const cutLength = (text, max) => {

        const textLength = text.length > max ? text.slice(0, max) + "..." : text;
        return textLength;
    }

    if (loading) return <p>Loading...</p>
    return (
        <>

            <div>
                <div className=" flex items-center">
                    <div >
                        <div className="text-4xl font-medium flex justify-between items-center">
                            <p className="m-0">1B Schedule</p>
                            <a href={`http://localhost:5000/api/${links[0].code}`} className="m-0 text-lg text-sky-blue">{`http://localhost:5000/api/${links[0].code}`}</a>
                        </div>


                        <div className="flex gap-10 mt-10 items-center">
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "full week" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleFull}>Full Week</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Monday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleMon}>Mon</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Tuesday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleTue}>Tue</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Wednesday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleWed}>Wed</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Thursday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleThu}>Thu</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Friday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleFri}>Fri</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Saturday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleSat}>Sat</p>
                            <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Sunday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleSun}>Sun</p>
                        </div>


                        {links.map((item, index) => (
                            (showDay === "full week" || item.day.toLowerCase() === showDay.toLowerCase()) && (
                                <div key={index} className="mt-10">

                                    <div>
                                        <p className="font-medium">{item.day}</p>
                                    </div>

                                    <div className="flex justify-between gap-30 border-gray-500 hover:bg-gray-300 border p-3 hover:scale-110 transform transition cursor-pointer">
                                        <div>
                                            {cutLength(item.title, 9)}
                                        </div>

                                        <div>
                                            <a href={item.links}>{cutLength(item.links, 20)}</a>
                                        </div>

                                        <div>
                                            {item.day}
                                        </div>

                                        <div>
                                            {item.time}
                                        </div>
                                    </div>

                                </div>
                            )
                        ))}

                    </div>


                </div>


            </div>


        </>
    )
}