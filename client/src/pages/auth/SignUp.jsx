
// L O C A L  I M P O R T
import "../../css/LoginSignUp.css"
import { MoveY, MoveX } from "../../animation/Moves"

// U T I L S
import { checker, handleSignUp, showInput, } from "../../utils/Checkers";

//L I B  I M P O R T
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";

//F I R E B A S E
import { signUpWithGoogle } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";

export default function SignUp() {
    const MoveYRef = useRef();
    const MoveXRef = useRef();
    const navigate = useNavigate();


    const [status, setStatus] = useState("");

    useEffect(() => {
        MoveY(MoveYRef.current, -100, 50);
        MoveX(MoveXRef.current, -100, 0);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const signUpHandle = async () => {
        const res = await signUpWithGoogle();

        if (!res) return;

        navigate("/sign-up");
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

                {/*  S I G N  I N */}
                <div >
                    <div className="flex items-center justify-center h-1/2" ref={MoveYRef}>
                        <div className="flex text-lg flex-col items-center gap-2 justify-center">
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
                            <div className="w-full flex justify-center">
                                <form>
                                    <div className="email flex bg-gray-100 px-3 py-3 rounded-lg w-[500px]">
                                        <input className="outline-none w-full" type="text" placeholder="Username" />

                                        <i className="cursor-pointer bi bi-arrow-right-circle">
                                        </i>

                                        <i className="bi bi-check-circle-fill"></i>
                                    </div>

                                    <div className="username flex bg-gray-100 px-3 py-3 rounded-lg w-[500px] mt-2">
                                        <input className="outline-none w-full" type="text" placeholder="Password" />
                                        <i className={`cursor-pointer bi bi-arrow-right-circle`}></i>
                                    </div>

                                </form>
                            </div>
                            {/*FORGET AND CREATE ACCOUNT*/}
                            <div className="text  w-full flex justify-start text-sm">
                                <div className="flex items-center justify-center  text-sky-500">
                                    <div className="flex items-center">
                                        <a href="#">Forgotten your Password? </a>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="bi bi-arrow-right-short"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="text flex flex-col w-full  text-sm mt-3">
                                <p className="m-0">Do not have an Flux Link Account?</p>
                                <p className="text-sky-500 cursor-pointer m-0 hover:text-sky-600" onClick={() => navigate("/login")}>
                                    Create Your Flux Link Account
                                </p>
                            </div>
                            <div className="flex gap-2 justify-start items-center w-full mt-3 p-3 h-full cursor-pointer border border-gray-400 hover:bg-gray-100 rounded-lg">
                                <div className="flex justify-start items-center">
                                    <i className="bi bi-google"></i>
                                </div>
                                <div className="flex justify-start items-center">
                                    <p className="m-0" onClick={signUpHandle}>Sign Up With Google Account</p>
                                </div>
                                <p>{status}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </section >
        </>
    )
}