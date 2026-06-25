import axios from "axios";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import Logo from "../../assets/logo.png"


export default function CreateAI() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [raw, setRaw] = useState("");
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const AskAi = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setResponse("");

        try {
            const user = auth.currentUser;

            if (!user) {
                console.error("Walang naka-login na user!");
                setResponse("Please log in first.");
                setIsLoading(false);
                return;
            }

            const token = await user.getIdToken();

            const res = await axios.post(`${import.meta.env.VITE_API_SEND_ASK_GEMINI}`,
                { prompt: prompt, titleSched: title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data?.success) {
                setResponse(res.data?.data);
                setPrompt("");
                setRaw(res.data?.raw)
            }
        } catch (error) {
            console.error("May error:", error);
            setResponse("Error connecting to AI.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex justify-center  min-h-screen">

            <div className={`${show ? "hidden" : ""}`}>
                <input className="p-3 bg-white border border-gray-500 w-full rounded-sm" type="text"
                    placeholder="Schedule name" value={title} onChange={(e) => { setTitle(e.target.value) }} />


                <div className="flex mt-2 justify-center w-full bg-black text-white p-2 rounded-sm cursor-pointer" onClick={() => {
                    if (title.trim().length < 3) return;
                    setShow(true);
                }}>

                    <button >Set</button>
                </div>
            </div>



            {show && title.length > 2 && (
                <div className="min-w-1/5 ">

                    <div className="flex justify-center">
                        <img className="w-20 h-20" src={Logo} alt="" />
                    </div>

                    <div className="flex justify-center mt-5">
                        <p className="text-gray-500">Lets <span className="font-medium text-gray-900">Klei.moretti</span> Setup your Schedule</p>
                    </div>



                    <input className="p-3 bg-white border border-gray-500 w-full rounded-sm" type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Paste Your Schedule"
                        disabled={isLoading} />


                    <div className="flex mt-2 justify-center w-full bg-black text-white p-2 rounded-sm"
                        onClick={AskAi}>

                        <button disabled={isLoading}>{isLoading ? "Processing..." : "Submit"}</button>
                    </div>
                </div>
            )}

        </section>
    );
}