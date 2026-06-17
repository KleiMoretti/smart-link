
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

    return (
        <>
            <section className="px-3 py-3 h-screen relative overflow-hidden min-h-[300px] min-w-[200px]">
                <div className="flex items-center h-10" ref={MoveX}>
                    <div className="flex gap-2 cursor-pointer" onClick={() => { navigate("/") }}>
                        <div><i className="bi bi-arrow-left"></i></div>
                        <div><p>Back</p></div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex justify-center">
                        <div className="title">
                            <div className="flex gap-3 flex">
                                <div className="flex gap-1">
                                    <p>S</p>
                                    <p>I</p>
                                    <p>G</p>
                                    <p>N</p>
                                </div>
                                <div className="flex gap-1">
                                    <p>I</p>
                                    <p>N</p>
                                </div>
                                <div className="flex gap-1">
                                    <p>T</p>
                                    <p>O</p>
                                </div>
                                <div className="flex gap-1 font-bold">
                                    <p>F</p>
                                    <p>L</p>
                                    <p>U</p>
                                    <p>X</p>
                                </div>
                                <div className="flex gap-1 font-bold">
                                    <p>L</p>
                                    <p>I</p>
                                    <p>N</p>
                                    <p>K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex gap-2 justify-start   items-center w-[300px] mt-3 p-3 cursor-pointer border border-gray-400 hover:bg-gray-200 rounded-lg" onClick={handleLogin}>
                            <div className="flex justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,
                                    5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,
                                    8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,
                                    7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,
                                    24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,
                                    0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                            </div>
                            <div className="flex justify-start items-center">
                                <p className="m-0  whitespace-nowrap">Continue With Google Account</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
        </>
    )
}