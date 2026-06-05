import { useState } from "react";
import axios from "axios";
import { auth } from "../../firebase/firebase";

export default function CreateLink() {
    const [input, setInput] = useState([{ title: "", link: "", day: "", time: "" }]);

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
                Links: input
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
                <div className="mt-10">
                    {input.map((items, index) => (
                        <div className="justify-center flex gap-3 mt-6" key={index}>
                            <div>
                                <p>Title</p>
                                <div className="bg-gray-200 rounded-lg p-2 h-10">
                                    <input className="outline-none h-full bg-transparent" type="text" value={items.title} onChange={(e) => handleInput(e.target.value, index, "title")} />
                                </div>
                            </div>
                            <div>
                                <p>Link {index + 1}</p>
                                <div className="bg-gray-200 rounded-lg p-2 h-10">
                                    <input className="outline-none h-full bg-transparent" type="text" value={items.link} onChange={(e) => handleInput(e.target.value, index, "link")} />
                                </div>
                            </div>
                            <div>
                                <p>Day</p>
                                <div className="bg-gray-200 rounded-lg p-2 h-10">
                                    <select className="outline-none bg-transparent" value={items.day} onChange={(e) => handleInput(e.target.value, index, "day")}>
                                        <option value="">Day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option> {/* May typo yung Wenesday mo kanina */}
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>Time</p>
                                <div className="flex gap-2">
                                    <div className="bg-gray-200 rounded-lg p-2 h-10">
                                        <input className="h-full bg-transparent outline-none" type="time" value={items.time} onChange={(e) => handleInput(e.target.value, index, "time")} />
                                    </div>
                                    <div className={`bg-red-500 py-2 px-3 text-white rounded-lg cursor-pointer ${index !== 0 || input.length > 1 ? "" : "hidden"}`} onClick={() => removeInput(index)}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10 gap-10">
                    <div className="bg-gray-200 py-2 px-3 rounded-lg cursor-pointer" onClick={add}>
                        <button>Add</button>
                    </div>

                    <div className="bg-black py-2 px-3 text-white rounded-lg cursor-pointer" onClick={handleSubmit}>
                        <button>Done</button>
                    </div>
                </div>
            </div>
        </>
    );
}