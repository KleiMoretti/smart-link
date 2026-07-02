import { useEffect, useState } from "react"
import { GET_METHOD } from "../../utils/Fetching"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Table() {

    const redirectLink = import.meta.env.VITE_REDIRECT_FRONTEND_URL;
    const [token, setToken] = useState(null)
    const [links, setLinks] = useState([])
    const [code, setCode] = useState("")
    const [schedule_name, setSchedule_name] = useState("")
    const [addRow, setAddRow] = useState([
        {
            title: "",
            links: "",
            day: "",
            time: "",
        },
    ]);
    const [filterDay, setFilterDay] = useState("Full Week")
    const [edit_On, setEditOn] = useState(false)
    const [auths, setAuths] = useState(false)
    const navigate = useNavigate()

    const dayOrder = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 7
    }

    {/* AUTH CHECK */ }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const getToken = await user.getIdToken();
                setToken(getToken);
                setAuths(true);

            } else {
                navigate("/login");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    {/* FETCH LINKS */ }
    useEffect(() => {
        if (!token) return;


        const function_fetch_link = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API_GET_LINK, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setCode(res?.data?.link?.[0]?.code)
                setSchedule_name(res?.data?.link?.[0]?.schedule_name)
                setLinks(res?.data?.link);
            } catch (err) {
                console.error(err);
            }
        };

        function_fetch_link();
    }, [token]);


    const handleChanges = (id, field, value) => {
        setLinks((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };
    const SaveEdit = async () => {
        if (!auths) return;
        const tkn = token;

        const res = await axios.post(import.meta.env.VITE_API_SAVE_EDIT, { editedLinks: links }, {
            headers: {
                authorization: `Bearer ${tkn}`
            }
        })
    }

    const SaveRow = async () => {
        if (!auths) return;
        const tkn = token;

        const res = await axios.post(import.meta.env.VITE_API_SAVEROW, { AddRow: addRow, code, schedule_name }, {
            headers: {
                authorization: `Bearer ${tkn}`
            }
        })

        setAddRow([{
            title: "",
            links: "",
            day: "",
            time: "",
        },])
    }
    const AddRow = () => {
        const recentRow = addRow[addRow.length - 1];

        if (
            !recentRow.title.trim() ||
            !recentRow.links.trim() ||
            !recentRow.day.trim() ||
            !recentRow.time.trim()
        ) {
            alert("Complete the current row first.");
            return;
        }

        setAddRow((prev) => [
            ...prev,
            {
                title: "",
                time: "",
                links: "",
                day: "",
            },
        ]);
    };
    const handleEditChanges = (index, field, value) => {
        setAddRow((prev) => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ))
    }
    const handleEditDelete = (index) => {
        setAddRow(prev => prev.filter((_, i) => i != index))
    }
    const editDelete = async (id) => {
        if (!id) return;

        const res = await axios.post(import.meta.env.VITE_API_DELETE_EDIT, { rowID: id }, { headers: { authorization: `Bearer ${token}` } })

    }

    return (
        <>
            <section className="py-50 flex item-center justify-center ">
                <div className="max-w-[1000px] w-full">

                    {/* HEAD */}
                    <div className={`${links.length > 0 ? "" : "hidden"} border border-gray-100 p-4 rounded-2xl shadow-sm `}>
                        <div className="text-sm flex justify-end">
                            <a className={`${edit_On ? "flex" : "hidden"} px-3 py-2 cursor-pointer`}
                                onClick={() => { setEditOn(prev => !prev); SaveRow(); SaveEdit(); }}>Save</a>

                            <a className={`${edit_On ? "hidden" : "flex"} text-black px-3 py-2 cursor-pointer`}
                                onClick={() => { setEditOn(prev => !prev) }}>Edit</a>
                        </div>
                        <div className="flex justify-between items-center flex-wrap">
                            <div>
                                <p className="m-0 text-[clamp(25px,5vw,40px)] font-semibold font-['JetBrains_Mono',monospace]">
                                    {/*1B Schedule*/} {links[0]?.schedule_name}
                                </p>
                                <a className="m-0 text-blue-500 font-semibold font-['Space_Grotesk',sans-serif]" href={`${redirectLink + links[0]?.code}`}>
                                    {`${redirectLink + links[0]?.code}`}
                                </a>
                            </div>

                            <div className="flex gap-2 text-xs flex-wrap">
                                {["Full Week", ...Object.keys(dayOrder)].map((item, index) => (
                                    <p key={index} className={`${filterDay === item ? "bg-indigo-500 text-white" : "hover:bg-indigo-100"} m-0 p-2 rounded-full cursor-pointer transition-colors duration-200 ease-in-out`}
                                        onClick={() => setFilterDay(item)}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <table className="w-full text-md mt-10 table-fixed">
                                <thead>
                                    <tr className="bg-indigo-400 text-white">
                                        <th className="w-1/6 px-6 py-4 text-left rounded-l-lg">Time</th>
                                        <th className="w-1/6 px-6 py-4 text-left">Subject</th>
                                        <th className="w-1/6 px-6 py-4 text-left">Links</th>
                                        <th className={`w-1/6 px-6 py-4 text-left ${edit_On ? "" : " rounded-r-lg"}`}>Day</th>
                                        <th className={`px-6 py-4 text-left  ${!edit_On ? "hidden" : "w-1/6"} rounded-r-lg`}>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {(() => {
                                        const filtered = filterDay === "Full Week" ? links : links?.filter(item => item.day === filterDay);
                                        const groups = filtered?.reduce((acc, item) => {
                                            (acc[item.day] = acc[item.day] || []).push(item)
                                            return acc
                                        }, {});

                                        const sortDay = Object.keys(groups).sort((a, b) => (dayOrder[a] || 0) - (dayOrder[b] || 0));

                                        return sortDay && sortDay.length > 0 ? (
                                            sortDay.map(day => (
                                                groups[day].map((items, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 text-left text-sm text-gray-700">
                                                            {edit_On ?
                                                                <input type="time" className="border border-gray-500 p-3"
                                                                    value={items.time}
                                                                    onChange={(e) => handleChanges(items.id, "time", e.target.value)} />
                                                                : items.time
                                                            }

                                                        </td>
                                                        <td className="px-6 py-4 text-left text-sm text-gray-700 font-semibold">
                                                            {edit_On ?
                                                                <input type="text" className="border border-gray-500 p-3"
                                                                    value={items.title}
                                                                    onChange={(e) => handleChanges(items.id, "title", e.target.value)} />
                                                                : items.title
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 text-left text-sm text-blue-500 font-medium">
                                                            {edit_On ?
                                                                <input type="text" className="border border-gray-500 p-3"
                                                                    value={items.links}
                                                                    onChange={(e) => handleChanges(items.id, "links", e.target.value)} />
                                                                : items.links
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 text-left text-sm text-gray-700">
                                                            {edit_On ?
                                                                <select className="border-gray-500 border p-3 outline-none"
                                                                    value={items.day}
                                                                    onChange={(e) => handleChanges(items.id, "day", e.target.value)}
                                                                >
                                                                    <option value="Monday">Monday</option>
                                                                    <option value="Tuesday">Tuesday</option>
                                                                    <option value="Wednesday">Wednesday</option>
                                                                    <option value="Thursday">Thursday</option>
                                                                    <option value="Friday">Friday</option>
                                                                    <option value="Saturday">Saturday</option>
                                                                    <option value="Sunday">Sunday</option>
                                                                </select>
                                                                : items.day
                                                            }
                                                        </td>

                                                        <td className={`w-1/6 px-6 py-4 text-left text-sm text-red-500 cursor-pointer ${!edit_On ? "hidden" : ""}`}
                                                            onClick={() => editDelete(items.id)}>
                                                            Delete
                                                        </td>
                                                    </tr >
                                                ))
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                                                    No Schedule
                                                </td>
                                            </tr>
                                        );
                                    })()}
                                </tbody>

                            </table>
                        </div>

                        {/*
                        <pre>{JSON.stringify(links, null, 2)}</pre>
                        */}

                    </div>
                    <div className={`${edit_On ? "" : "hidden"} mt-3 shadow-sm border border-gray-100 rounded-lg py-10`}>
                        {addRow.map((item, index) => (
                            <div key={index} className="flex w-full justify-center gap-2 mt-2">
                                <input type="time" className="border border-gray-100 p-2 rounded-md"
                                    value={item.time}
                                    onChange={(e) => handleEditChanges(index, "time", e.target.value)} />
                                <input type="text" className="border border-gray-100 p-2 rounded-md" placeholder="Subject"
                                    value={item.title}
                                    onChange={(e) => handleEditChanges(index, "title", e.target.value)} />
                                <input type="text" className="border border-gray-100 p-2 rounded-md" placeholder="Link"
                                    value={item.links}
                                    onChange={(e) => handleEditChanges(index, "links", e.target.value)} />
                                <select className="border-gray-500 border p-2 outline-none"
                                    value={item.day}
                                    onChange={(e) => handleEditChanges(index, "day", e.target.value)}>
                                    <option value="day">Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <div className={`${addRow.length === 1 ? "hidden" : ""} bg-red-100 text-red-500 px-3 py-2 rounded-md border-1 border-red-300 cursor-pointer`} onClick={() => handleEditDelete(index)}>
                                    DELETE
                                </div>
                            </div>
                        ))
                        }

                        <div className="flex justify-center mt-10">
                            <div className="w-1/5 flex justify-center items-center">
                                <div className="bg-indigo-100 text-indigo-500 px-3 py-2 rounded-md border-1 border-indigo-300 cursor-pointer" onClick={() => AddRow()}>
                                    Add Row
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${links.length > 0 ? "hidden" : ""} text-center text-gray-500`}>
                        No Schedule Found
                    </div>
                </div>
            </section >
        </>
    )
}