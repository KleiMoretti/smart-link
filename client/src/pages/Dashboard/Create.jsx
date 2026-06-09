import { useState } from "react";
import axios from "axios";
import { auth } from "../../firebase/firebase";

export default function CreateLink() {
    const [input, setInput] = useState([{ title: "", link: "", day: "", time: "" }]);
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(false);

    //handle submit
    const handleSubmit = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("Mag-login muna men!");
                return;
            }

            //para sa token
            const token = await user.getIdToken();

            //fetching data
            const res = await axios.post(`${import.meta.env.VITE_API_SAVE_LINK}`, {
                Links: input,
                Title: title
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success === 400) {
                alert("Invalid Links")
            }

            if (res.data.success) {
                setInput([{ title: "", link: "", day: "", time: "" }]);
                alert("success men");
            }
        } catch (error) {
            console.error(error);
            alert("failed to saved");
        }
    };

    const add = () => {
        const lastInput = input[input.length - 1];
        if (!lastInput.title || !lastInput.link || !lastInput.day || !lastInput.time) {
            alert("Please complete all fields first!");
            return;
        }
        setInput([...input, { title: "", link: "", day: "", time: "" }]);
    };

    const handleInput = (value, index, field) => {
        const update = [...input];
        update[index][field] = value;
        setInput(update);
    };

    const removeInput = (index) => {
        if (input.length === 1) {
            alert("can't delete");
            return;
        }
        setInput(input.filter((_, i) => i !== index));
    };

    return (
        <>
            <div>
                <div className={`mt-10 ${show ? "hidden" : ""}`}>
                    <div className="create-parent max-w-md mx-auto">
                        <p className="text-sm font-medium text-slate-600 mb-1">Schedule Name</p>

                        {/* Input Container */}
                        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-200">
                            <input
                                className="w-full outline-none h-full bg-transparent text-slate-800"
                                type="text"
                                placeholder="e.g. Weekly Study Plan"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Button */}
                        <div className="flex w-full justify-center mt-6">
                            <div
                                className={`w-full flex justify-center bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${title.length > 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                                onClick={() => setShow(true)}
                            >
                                <button className="font-medium">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>

                {show && (
                    <div className="space-y-6">
                        <div>
                            {input.map((items, index) => (
                                // Inayos ang layout para maging flex-wrap at responsive
                                <div className="create-area justify-center flex flex-wrap gap-4 mt-6 p-4 border border-slate-100 rounded-xl bg-white shadow-sm" key={index}>

                                    {/* Title */}
                                    <div className="create-parent flex-1 min-w-[200px]">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Title</p>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition">
                                            <input className="w-full outline-none h-full bg-transparent text-slate-800" type="text" value={items.title} onChange={(e) => handleInput(e.target.value, index, "title")} />
                                        </div>
                                    </div>

                                    {/* Link */}
                                    <div className="create-parent flex-1 min-w-[200px]">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Link {index + 1}</p>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition">
                                            <input className="w-full outline-none h-full bg-transparent text-slate-800" type="text" value={items.link} onChange={(e) => handleInput(e.target.value, index, "link")} />
                                        </div>
                                    </div>

                                    {/* Day */}
                                    <div className="create-parent flex-1 min-w-[150px]">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Day</p>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition">
                                            <select className="w-full outline-none bg-transparent text-slate-800 h-full" value={items.day} onChange={(e) => handleInput(e.target.value, index, "day")}>
                                                <option value="">Select Day</option>
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

                                    {/* Time & Delete */}
                                    <div className="create-parent flex-none">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Time</p>
                                        <div className="delete-area flex gap-2">
                                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-10 focus-within:border-sky-500 transition">
                                                <input className="h-full bg-transparent outline-none text-slate-800" type="time" value={items.time} onChange={(e) => handleInput(e.target.value, index, "time")} />
                                            </div>
                                            <div className={`flex justify-center items-center bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg cursor-pointer transition ${index !== 0 || input.length > 1 ? "" : "hidden"}`} onClick={() => removeInput(index)}>
                                                Delete
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center mt-10 gap-4">
                            <div className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-6 rounded-lg cursor-pointer font-medium transition whitespace-nowrap" onClick={add}>
                                <button>Add Another</button>
                            </div>
                            <div className="bg-blue-200 hover:bg-blue-300 text-blue-500 py-2 px-6 rounded-lg cursor-pointer font-medium transition whitespace-nowrap" onClick={handleSubmit}>
                                <button>Done</button>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}