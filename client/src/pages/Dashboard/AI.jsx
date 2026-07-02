import axios from "axios";
import { useState } from "react"
import { getToken } from "../../utils/Token"



export default function AI_TEST() {

    const [prompt, setPrompt] = useState("");

    const SendPrompt = async () => {
        const token = await getToken();
        console.log(token)
        const res = await axios.post(import.meta.env.VITE_API_SEND_ASK_GEMINI, { prompt },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

    return (
        <section className="p-[140px] flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-1/2">
                <p className="font-semibold ">Hello! I'm Moretti AI. What are we organizing today?</p>
                <div className="bg-white px-4 py-3 rounded-full relative flex">
                    <input type="text"
                        placeholder="Paste your schedule, and we'll organize the rest. example: Subject, Links, Time, Day"
                        className="outline-none w-full"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={() => SendPrompt()}><i className="bi text-3xl bi-arrow-up-circle-fill"></i></button>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3">
                        Easy to use
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3">
                        Fast Setup
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3">
                        Well Oraganize
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3">
                        AI powered
                    </div>
                </div>
            </div>
        </section>
    )
}