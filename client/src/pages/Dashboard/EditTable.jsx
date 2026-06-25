import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_METHOD, POST_METHOD } from "../../utils/Fetching"
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
    const [code, setCode] = useState("")


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

                const res = await GET_METHOD(import.meta.env.VITE_API_GET_LINK, token)

                if (res?.success && res?.link) {
                    setLink(res?.link);

                    if (res?.link.length > 0) setTitle(res?.link[0]?.schedule_name);
                    setCode(res?.link[0]?.code)

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


        const res = await POST_METHOD(import.meta.env.VITE_API_EDIT_TABLE, { editTable: edit }, token)

        if (res?.success) {
            alert("success")

        } else {
            alert("failed man")
        }
    };

    const handleSaveRow = async (id) => {
        console.log(addRow);
        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await POST_METHOD(import.meta.env.VITE_API_SAVE_LINK_ROW, { saveRow: addRow, saveCode: code, saveTitle: title }, token)

        if (res?.success) {
            alert("success")
            setAddRow([{ title: "", link: "", day: "", time: "", id: "" }])

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

        const res = await POST_METHOD(import.meta.env.VITE_API_DELETE_LINK, { LinksID: id }, token)

        if (res?.success) {
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

    const handleDeleteRow = (index) => {
        if (!index) return
        if (addRow.length === 1) {
            alert("can't delete");
            return;
        }

        setAddRow(addRow.filter((_, i) => i !== index))
    }

    const handleAutoSave = async (newName) => {
        try {
            const user = auth.currentUser;
            const token = await user.getIdToken();

            await POST_METHOD(import.meta.env.VITE_API_AUTO_SAVE, { saveTitle: title }, token)

            console.log("Saved via backend!");
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div className="flex items-center">
                <div className="w-full">

                    {links.length > 0 && (
                        <>
                            <div className="title-link-main w-full font-medium lg:flex lg:flex-wrap justify-between items-center gap-2">
                                <div className="flex items-center gap-1 border-1 border-gray-300 w-fit">
                                    <input
                                        className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition"
                                        type="text"
                                        placeholder="Enter schedule name"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={() => handleAutoSave(title)}
                                    />
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

                            <div className="mt-10">
                                <p className="font-medium ">Add Schedule</p>
                            </div>

                            <div className="flex justify-between flex-wrap gap-2">
                                <div className="flex gap-2 bg-gray-200 w-35 p-2 rounded-full hover:bg-gray-100 cursor-pointer items-center justify-center" onClick={handleAddRow}>
                                    <i className="bi bi-plus-circle"></i>
                                    <p className="m-0 whitespace-nowrap">Add Schedule</p>
                                </div>

                                <div className="flex gap-2 bg-gray-900 text-white w-35 p-2 rounded-full hover:bg-gray-700 cursor-pointer items-center justify-center transition" onClick={handleSaveRow}>
                                    <p className="m-0">Save</p>
                                </div>
                            </div>

                            {addRow.map((item, index) => (
                                <div key={index} className="create-area justify-between flex flex-wrap gap-4 mt-6 p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                                    <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" type="text" placeholder="title"
                                        value={item?.title === edit?.title ? edit?.title || "" : item.title} onChange={(e) => handleInput(e.target.value, index, "title")} />
                                    <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" type="text" placeholder="title" type="text" placeholder="link"
                                        value={item?.link === edit?.link ? edit?.link || "" : item.link} onChange={(e) => handleInput(e.target.value, index, "link")} />
                                    <select className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" type="text" placeholder="title"
                                        value={item?.day === edit?.day ? edit?.day || "" : item.day} onChange={(e) => handleInput(e.target.value, index, "day")}>
                                        <option value="">Day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                    <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" type="text" placeholder="title" type="time" placeholder="time"
                                        value={item.time === edit?.time ? edit?.time || "" : item.time} onChange={(e) => handleInput(e.target.value, index, "time")} />
                                    <div className={`flex justify-center items-center bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg cursor-pointer transition 
                            ${index !== 0 || addRow.length > 1 ? "" : "hidden"}`}
                                        onClick={() => handleDeleteRow(index)}>
                                        Delete
                                    </div>
                                </div>
                            ))}
                        </>
                    )}


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
                                        <div key={index} className="create-area justify-center flex flex-wrap gap-4 mt-6 p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                                            <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" value={editId === item.id ? edit?.title || "" : item.title} onChange={(e) => setEdit(prev => ({ ...prev, title: e.target.value }))} onFocus={() => {
                                                if (editId !== item?.id) {
                                                    setEditId(item?.id);
                                                    setEdit(item);
                                                }
                                            }} />

                                            <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" placeholder={CutLength(item.links, 20)} value={editId === item.id ? edit?.link || item.links : item.links} onChange={(e) => setEdit(prev => ({ ...prev, link: e.target.value }))}
                                                onFocus={() => {
                                                    if (editId !== item?.id) {
                                                        setEditId(item?.id);
                                                        setEdit(item);
                                                    }
                                                }} />

                                            <select className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" placeholder={item.day} value={editId === item.id ? edit?.day || "" : item.day} onChange={(e) => setEdit(prev => ({ ...prev, day: e.target.value }))}
                                                onFocus={() => {
                                                    if (editId !== item?.id) {
                                                        setEditId(item?.id);
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

                                            <input className="m-width bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition" placeholder={item.time} value={editId === item.id ? edit?.time || "" : item.time} onChange={(e) => setEdit(prev => ({ ...prev, time: e.target.value }))}
                                                onFocus={() => {
                                                    if (editId !== item.id) {
                                                        setEditId(item.id);
                                                        setEdit(item);
                                                    }
                                                }} />
                                            <div className="flex justify-center items-center bg-blue-50 hover:bg-blue-100  py-2 px-3 rounded-lg cursor-pointer transition text-blue-600" onClick={() => handleSave(item.id)}>Save</div>
                                            <div className="flex justify-center items-center bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg cursor-pointer transition" onClick={() => handleDelete(item.id)}>Delete</div>
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
    )
}