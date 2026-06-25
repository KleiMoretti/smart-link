import { useState } from "react";
import axios from "axios";
import { auth } from "../../firebase/firebase";
import Create_Manual from "../../pages/Dashboard/Create_Manual"
import Create_AI from "../../pages/Dashboard/Create_AI"


export default function CreateLink() {

    const [method, setMethod] = useState("");
    const handleMethod = (method) => setMethod(method);


    return (
        <>
            <div className="flex flex-col justify-center items-center w-full ">
                <div className="w-1/2 flex justify-center flex-wrap gap-10">
                    <div className={`min-w-[200px] bg-gray-800 hover:bg-gray-700 text-white p-3 w-1/2 rounded-lg cursor-pointer hover:scale-105 transition-transform delay-100 ease-in-out ${method === "" ? "" : "hidden"}`}
                        onClick={() => handleMethod("MANUAL")}>
                        <p className="m-0 font-medium">Manual</p>
                        <p>Manually enter each schedule details one by one. More control, but slower.</p>
                    </div>

                    <div className={`min-w-[200px] bg-gray-800 hover:bg-gray-700 text-white p-3 w-1/2 rounded-lg cursor-pointer hover:scale-105 transition-transform delay-100 ease-in-out ${method === "" ? "" : "hidden"}`}
                        onClick={() => handleMethod("AI")}>
                        <p className="m-0 font-medium">AI</p>
                        <p>Automatically extracts and saves your schedule from pasted text using AI. Fast and easy.</p>
                    </div>
                </div>


                {method === "MANUAL" && <Create_Manual />}
                {method === "AI" && <Create_AI />}
            </div>




        </>
    );
}