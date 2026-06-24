
// L O C A L  I M P O R T
import { MoveY, MoveX } from "../../animation/Moves"

// U T I L S
import { checker, showInput, } from "../../utils/Checkers";

//L I B  I M P O R T
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";

//F I R E B A S E
import { signInWithGoogle } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";

import Logo from "../../assets/logo1.png"

export default function Login() {

    const MoveYRef = useRef();
    const MoveXRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        MoveY(MoveYRef.current, -100, 50, 1)
        MoveX(MoveXRef.current, -100, 0, 1)

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard")
            }
        })

        return () => unsubscribe
    }, [navigate]);

    const handleLogin = async () => {
        const result = await signInWithGoogle();
        if (result) {
            navigate("/dashboard");
        }
    };

    const google_information = [
        {
            title: "Why only Google?",
            details: [
                { description: "One secure account for everything" },
                { description: "No passwords to remember or reset" },
                { description: "Fast setup, instant access" },
            ]
        },
        {
            title: "Your privacy matters",
            details: [
                { description: "We only access your name and email" },
                { description: "No password database to worry about" },
                { description: "Encrypted by Google's security" },
            ]
        }
    ]
    return (
        <>
            <section className="relative overflow-hidden flex  items-center bg-[oklch(96.2%_0.018_272.314)] h-screen">
                <div className="max-w-[700px] my-0 mx-auto py-0 px-[32px] w-full">
                    <div className="flex justify-center bg-[oklch(98.5%_0.002_247.839)] px-[35px] py-[40px] rounded-2xl ">
                        <div>

                            <div className="flex justify-center mb-[10px]">
                                <img className="rounded-lg w-17" src={Logo} alt="" />
                            </div>

                            <p className=" text-center text-[30px] font-bold font-['Space_Grotesk',sans-serif]">Lyncks</p>
                            <p className="text-center text-sm text-[#94a3b8]">One link. right destination</p>

                            <div className="hover:bg-gray-100 flex justify-center items-center border border-gray-200  h-15 gap-2 rounded-lg mt-10 cursor-pointer whitespace-nowrap px-3" onClick={handleLogin}>
                                <svg className="w-[clamp(20px,3vw,30px)]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <div className="text-[clamp(14px,2vw,16px)]">
                                    <button>Continue with Google</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-10">
                                <div className="h-[2px] w-full bg-gray-200" />
                                <div className="text-[clamp(12px,2vw,16px)]">
                                    <p className="m-0 whitespace-nowrap">Why only Google?</p>
                                </div>
                                <div className="h-[2px] w-full bg-gray-200" />
                            </div>

                            {google_information.map((item, index) => (
                                <div key={index} className="rounded-md mt-10 text-[clamp(12px,2vw,16px)]" >
                                    <p className="m-0 font-bold">{item.title}</p>
                                    {item.details.map((items, index) => (
                                        <div key={index} className="flex items-center gap-2  mt-2">
                                            <i className="bi bi-check2 text-[oklch(79.2%_0.209_151.711)]"></i>
                                            <p className="m-0 text-black/50">{items.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}