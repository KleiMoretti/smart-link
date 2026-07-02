import axios from "axios";
import { useState } from "react"
import { getToken } from "../../utils/Token"



export default function AI_TEST() {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const SendPrompt = async () => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        try {
            const token = await getToken();
            const res = await axios.post(import.meta.env.VITE_API_SEND_ASK_GEMINI, { prompt },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="lg:py-[140px] py-40 px-2 lg:px-0  w-full lg:flex justify-center items-center bg-gray-100 min-h-screen ">
            <div className="lg:w-1/2 w-full">
                <p className="font-semibold text-center text-[clamp(12px,2vw,18px)] whitespace-nowrap font-['Space_Grotesk',sans-serif]">Hello! I'm Lyncks AI. What are we organizing today?</p>
                <div className="bg-white px-4 py-3 rounded-full flex w-full">
                    <input type="text"
                        placeholder="Paste your schedule, and we'll organize the rest. example: Subject, Links, Time, Day"
                        className="outline-none w-full placeholder:text-sm lg:placeholder:text-md placeholder:font-['Inter',sans-serif]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={() => SendPrompt()}> {isLoading ? (
                        <i className="bi text-3xl bi-arrow-clockwise animate-spin"></i>
                    ) : (
                        <i className="bi text-3xl bi-arrow-up-circle-fill"></i>
                    )}</button>
                </div>
                <div className="hidden text-sm lg:flex justify-start gap-2 mt-3 font-['Space_Grotesk',sans-serif]">
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3  whitespace-nowrap">
                        Easy to use
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3  whitespace-nowrap">
                        Fast Setup
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3  whitespace-nowrap">
                        Well Oraganize
                    </div>
                    <div className="bg-white border border-gray-100 rounded-full py-2 px-3  whitespace-nowrap">
                        AI powered
                    </div>
                </div>
            </div>
        </section>
    )
}