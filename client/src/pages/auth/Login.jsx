
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
                                    <div>
                                        <p>S</p>
                                    </div>
                                    <div>
                                        <p>I</p>
                                    </div>
                                    <div>
                                        <p>G</p>
                                    </div>
                                    <div>
                                        <p>N</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div>
                                        <p>U</p>
                                    </div>
                                    <div>
                                        <p>P</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div>
                                        <p>T</p>
                                    </div>
                                    <div>
                                        <p>O</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 font-bold">
                                    <div>
                                        <p>F</p>
                                    </div>
                                    <div>
                                        <p>L</p>
                                    </div>
                                    <div>
                                        <p>U</p>
                                    </div>
                                    <div>
                                        <p>X</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 font-bold">
                                    <div>
                                        <p>L</p>
                                    </div>
                                    <div>
                                        <p>I</p>
                                    </div>
                                    <div>
                                        <p>N</p>
                                    </div>
                                    <div>
                                        <p>K</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex gap-2 justify-start items-center w-[300px] mt-3 p-3 cursor-pointer border border-gray-400 hover:bg-gray-100 rounded-lg" onClick={handleLogin}>
                            <div className="flex justify-start items-center">
                                <i className="bi bi-google"></i>
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