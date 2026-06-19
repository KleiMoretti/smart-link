import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../css/LandingPage.css"
import { CutLength } from "../../utils/CutLength";
import { GET_METHOD } from "../../utils/Fetching"
import { useQuery } from "@tanstack/react-query"

export default function Table({ profile, name, email }) {
    const navigate = useNavigate()

    const [showDay, setDay] = useState("full week");
    const [authChecked, setAuthChecked] = useState(false);

    const BackendRedirect = import.meta.env.VITE_REDIRECT_FRONTEND_URL || "";

    const handleNav = (value) => setDay(value)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, [navigate]);

    const dayOrder = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 7
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user_schedule'],
        queryFn: async () => {
            const user = auth.currentUser;
            if (!user) return { link: [], title: "" };
            const token = await user.getIdToken();
            const res = await GET_METHOD(import.meta.env.VITE_API_GET_LINK, token);
            return { link: res?.link || [], title: res?.title || "" };
        },
        enabled: authChecked,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const links = data?.link || [];

    if (!authChecked || isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading schedule.</p>;

    return (
        <>
            <div>
                <div className="flex items-center">
                    <div>

                        {links.length > 0 && (
                            <>
                                <div className="title-link-main w-full font-medium lg:flex lg:flex-wrap justify-between items-center gap-2">
                                    <p className="link-title m-0 lg:text-4xl md:text-3xl text-2xl">
                                        {links[0]?.schedule_name}
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
                                        {["full week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                                            <p key={index} className={`p-2 cursor-pointer rounded-full transition ${showDay === day ? "bg-gray-900 text-white" : "hover:bg-gray-200"}`} onClick={() => handleNav(day)}>
                                                {day === "full week" ? "Full Week" : day}
                                            </p>
                                        ))}
                                    </div>

                                    {/* PARA MOBILE UI */}
                                    <div className="flex flex-col lg:hidden">
                                        <select className="border-gray-500 border p-2 outline-none " value={showDay} onChange={(e) => handleNav(e.target.value)}>
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
                            </>
                        )}

                        {(() => {

                            const filtered = showDay === "full week" ? links : links.filter(item => item.day === showDay)

                            const groups = filtered.reduce((acc, item) => {
                                (acc[item.day] = acc[item.day] || []).push(item)
                                return acc
                            }, {})

                            const sortedDay = Object.keys(groups).sort((a, b) => (dayOrder[a] || 0) - (dayOrder[b] || 0));

                            return links.length > 0 ? (
                                sortedDay.map((day) => (

                                    <div key={day} className="mt-10">
                                        <p className="font-medium text-lg mb-2">{day}</p>

                                        {groups[day].map((item, index) => (

                                            <div key={index} className="border-l-4 border-teal-500 rounded-md overflow-hidden mb-2">
                                                <div className="flex flex-wrap gap-4 items-center justify-between border border-gray-500 hover:border-sky-500 hover:bg-sky-100 p-3 transition cursor-pointer">
                                                    <p className="m-0 flex-1 min-w-[100px] font-medium">{CutLength(item.title, 9)}</p>
                                                    <a className="m-0 flex-1 min-w-[150px] text-sky-600 truncate" href={item.links} target="_blank" rel="noreferrer">
                                                        {CutLength(item.links, 20)}
                                                    </a>
                                                    <p className="m-0 text-sm text-gray-500">{item.day}</p>
                                                    <p className="m-0 text-sm text-gray-500">{item.time}</p>
                                                </div>
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