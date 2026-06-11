import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CutLength } from "../../utils/CutLength";
import "../../css/LandingPage.css"

export default function Table({ profile, name, email }) {
    const navigate = useNavigate()

    const [showDay, setDay] = useState("full week");
    const [loading, setLoading] = useState(true);
    const [links, setLink] = useState([]);
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);
    const [edit, setEdit] = useState({ title: "", link: "", day: "", time: "", id: "" });
    const [addRow, setAddRow] = useState([{ title: "", link: "", day: "", time: "", id: "" }]);

    const BackendRedirect = import.meta.env.VITE_REDIRECT_FRONTEND_URL || "";

    const handleSelect = (value) => setDay(value)

    // Custom sort order para sa mga araw
    const dayOrder = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 7
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                const token = await user.getIdToken();
                const res = await axios.get(`${import.meta.env.VITE_API_GET_LINK}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data?.success && res.data?.link) {
                    setLink(res.data?.link);
                    if (res.data.link.length > 0) setTitle(res.data.link[0].schedule_name);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async (id) => {
        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await axios.post(
            "http://localhost:5000/api/editable",
            { editTable: edit },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
            alert("success")
        } else {
            alert("failed man")
        }
    };

    const handleDelete = async (id) => {
        const user = await auth.currentUser;
        const token = await user.getIdToken();

        if (!user || !token) return alert("you're not logged");

        if (!Number.isInteger(id) || id <= 0) {
            return alert("Invalid");
        }

        const res = await axios.post(`${import.meta.env.VITE_API_DELETE_LINK}`,
            { LinksID: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (res.data?.success) {
            alert("success men")
        } else {
            alert("Invalid men")
        }


    }

    const handleInput = (value, index, field) => {
        const update = [...addRow]
        update[index][field] = value;
        return setAddRow(update)
    }

    const handleAddRow = () => {
        const prev = addRow[addRow.length - 1];
        if (!prev.title || !prev.link || !prev.day || !prev.time) {
            alert("Please complete all fields first!");
            return
        }
        setAddRow([...addRow, { title: "", link: "", day: "", time: "", id: "" }])
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div className="flex items-center">
                <div className="w-full">
                    <div className="title-link-main w-full font-medium lg:flex lg:flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-1">
                            <p className="link-title m-0 lg:text-4xl md:text-3xl text-2xl">{title}</p>
                            <i className="m-0 bi bi-pencil-square cursor-pointer"></i>
                        </div>
                        {links.length > 0 && links[0]?.code && (
                            <a href={`${BackendRedirect}${links[0].code}`} className="m-0 lg:text-lg text-gray-900 hover:underline break-all" target="_blank" rel="noreferrer">
                                {`${BackendRedirect}${links[0].code}`}
                            </a>
                        )}
                    </div>

                    {/* Day Selection UI */}
                    <div className="flex mt-10 items-center">
                        <div className="lg:flex hidden gap-10">
                            {["full week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                                <p key={index} className={`p-2 cursor-pointer rounded-full transition ${showDay === day ? "bg-gray-900 text-white" : "hover:bg-gray-200"}`} onClick={() => handleSelect(day)}>
                                    {day === "full week" ? "Full Week" : day}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col lg:hidden">
                            <select value={showDay} className="border-gray-500 border p-2 outline-none" onChange={(e) => handleSelect(e.target.value)}>
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

                    <div className="flex justify-between">
                        <div className="flex gap-2 bg-gray-200 w-35 p-2 rounded-full hover:bg-gray-100 cursor-pointer items-center justify-center" onClick={handleAddRow}>
                            <i class="bi bi-plus-circle"></i>
                            <p className="m-0 whitespace-nowrap">Add Row</p>
                        </div>

                        <div className="flex gap-2 bg-gray-900 text-white w-35 p-2 rounded-full hover:bg-gray-700 cursor-pointer items-center justify-center transition">
                            <p className="m-0">Save</p>
                        </div>


                    </div>

                    {(() => {
                        const filtered = showDay === "full week" ? links : links.filter(item => item.day === showDay);

                        const groups = filtered.reduce((acc, item) => {

                            (acc[item.day] = acc[item.day] || []).push(item);
                            return acc;
                        }, {});

                        const sortedDays = Object.keys(groups).sort((a, b) => (dayOrder[a] || 0) - (dayOrder[b] || 0));

                        return sortedDays.length > 0 ? (
                            sortedDays.map((day, index) => (
                                <div key={index} className="mt-4">
                                    <p className="font-medium text-lg mb-2">{day}</p>
                                    {groups[day].map((item, index) => (
                                        <div key={index} className="flex flex-wrap gap-4 items-center justify-between border border-gray-200 hover:border-gray-500 rounded-md hover:bg-gray-100 p-3 transition cursor-pointer mb-2">
                                            <input className="m-0 flex-1 min-w-[100px] outline-none border border-gray-200 p-1" type="text" value={editId === item.id ? edit?.title || "" : item.title} onChange={(e) => setEdit(prev => ({ ...prev, title: e.target.value }))} onFocus={() => {
                                                if (editId !== item.id) {
                                                    setEditId(item.id);
                                                    setEdit(item);
                                                }
                                            }} />
                                            <input className="m-0 flex-1 min-w-[100px] outline-none border border-gray-200 p-1" type="text" placeholder={CutLength(item.links, 20)} value={editId === item.id ? edit?.link || item.links : item.links} onChange={(e) => setEdit(prev => ({ ...prev, link: e.target.value }))} onFocus={() => {
                                                if (editId !== item.id) {
                                                    setEditId(item.id);
                                                    setEdit(item);
                                                }
                                            }} />

                                            <select className="m-0 flex-1 min-w-[100px] outline-none border border-gray-200 p-1" type="text" placeholder={item.day} value={editId === item.id ? edit?.day || "" : item.day} onChange={(e) => setEdit(prev => ({ ...prev, day: e.target.value }))} onFocus={() => {
                                                if (editId !== item.id) {
                                                    setEditId(item.id);
                                                    setEdit(item);
                                                }
                                            }}>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                            <input className="m-0 flex-1 min-w-[100px] outline-none border border-gray-200 p-1" type="text" placeholder={item.time} value={editId === item.id ? edit?.time || "" : item.time} onChange={(e) => setEdit(prev => ({ ...prev, time: e.target.value }))} onFocus={() => {
                                                if (editId !== item.id) {
                                                    setEditId(item.id);
                                                    setEdit(item);
                                                }
                                            }} />
                                            <div className="p-1 rounded-sm" onClick={() => handleSave(item.id)}><i className="text-blue-600 bi bi-save"></i></div>
                                            <div className="p-1 rounded-sm" onClick={() => handleDelete(item.id)}><i className="text-red-400 bi bi-trash-fill"></i></div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 mt-10">No links found</div>
                        );
                    })()}

                    <div className="mt-10">
                        <p className="font-medium ">Add Column</p>
                    </div>

                    {addRow.map((item, index) => (
                        <div key={index} className="flex justify-between bg-gray-100 p-2 mt-2">
                            <p>{index}</p>
                            <input type="text" placeholder="title" value={item.title} onChange={(e) => handleInput(e.target.value, index, "title")} />
                            <input type="text" placeholder="link" value={item.link} onChange={(e) => handleInput(e.target.value, index, "link")} />
                            <select value={item.day} onChange={(e) => handleInput(e.target.value, index, "day")}>
                                <option value="full week">Full Week</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input type="time" placeholder="time" value={item.time} onChange={(e) => handleInput(e.target.value, index, "time")} />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}