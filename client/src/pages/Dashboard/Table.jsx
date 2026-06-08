import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CutLength } from "../../utils/CutLength";

export default function Table({ profile, name, email }) {
    const navigate = useNavigate()

    const [showDay, setDay] = useState("full week");
    const [loading, setLoading] = useState(true);
    const [links, setLink] = useState([]);
    const [title, setTitle] = useState("");


    const handleFull = () => setDay("full week")
    const handleMon = () => setDay("Monday")
    const handleTue = () => setDay("Tuesday")
    const handleWed = () => setDay("Wednesday")
    const handleThu = () => setDay("Thursday")
    const handleFri = () => setDay("Friday")
    const handleSat = () => setDay("Saturday")
    const handleSun = () => setDay("Sunday")
    const handleSelect = (value) => setDay(value)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);

                const token = await user.getIdToken();

                const res = await axios.get(`${import.meta.env.VITE_API_GET_LINK}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (res.data?.success && res.data?.link) {
                    setLink(res.data?.link);
                    console.log(res.data?.link)
                    res.data.link.map(item => {
                        setTitle(item.schedule_name)
                    });
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);



    const BackendRedirect = import.meta.env.VITE_REDIRECT_FRONTEND_URL || "";

    if (loading) return <p>Loading...</p>

    return (
        <>

            <div>
                <div className="flex items-center">
                    <div >
                        <div className="title-link-main w-full font-medium lg:flex lg:flex-wrap justify-between items-center gap-2">
                            <p className="link-title m-0 lg:text-4xl md:text-3xl text-2xl">
                                {title}
                            </p>

                            {links.length > 0 && links[0]?.code && (
                                <a
                                    href={`${BackendRedirect}${links[0].code}`}
                                    className="m-0 lg:text-lg text-sky-600 hover:underline break-all"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {`${BackendRedirect}${links[0].code}`}
                                </a>
                            )}
                        </div>

                        <div className="flex mt-10 items-center">
                            <div className="lg:flex hidden gap-10">
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "full week" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleFull}>Full Week</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Monday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleMon}>Mon</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Tuesday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleTue}>Tue</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Wednesday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleWed}>Wed</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Thursday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleThu}>Thu</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Friday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleFri}>Fri</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Saturday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleSat}>Sat</p>
                                <p className={`p-2 cursor-pointer rounded-full transition ${showDay === "Sunday" ? "bg-sky-500 text-white" : "hover:bg-gray-200"}`} onClick={handleSun}>Sun</p>
                            </div>

                            <div className="flex flex-col lg:hidden">
                                <select value="full week" className="border-gray-500 border p-2 outline-none" value={showDay} onChange={(e) => handleSelect(e.target.value)}>
                                    <option value="full week">Full Week</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                        </div>

                        {(() => {
                            // 1. Filter ang links base sa napiling day
                            const filtered = showDay === "full week"
                                ? links
                                : links.filter(item => item.day === showDay);

                            // 2. I-group sila by day
                            const groups = filtered.reduce((acc, item) => {
                                (acc[item.day] = acc[item.day] || []).push(item);
                                return acc;
                            }, {});

                            // 3. I-render ang mga grupo
                            return Object.keys(groups).length > 0 ? (
                                Object.entries(groups).map(([day, dayItems]) => (
                                    <div key={day} className="mt-4">
                                        <p className="font-medium text-lg mb-2">{day}</p>
                                        {dayItems.map((item, index) => (
                                            <div key={index} className="flex justify-between border border-gray-200 hover:border-sky-500 rounded-md hover:bg-sky-100 p-3 hover:scale-110 transform transition cursor-pointer mb-2">
                                                <div>{CutLength(item.title, 9)}</div>
                                                <div>
                                                    <a href={item.links} target="_blank" rel="noreferrer">
                                                        {CutLength(item.links, 20)}
                                                    </a>
                                                </div>
                                                <div>{item.day}</div>
                                                <div>{item.time}</div>

                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 mt-10">No links found</div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </>
    )
}