
// L O C A L  I M P O R T
import "../../css/LoginSignUp.css"
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

export default function LoginPage() {


    const [checkActive, setcheckActive] = useState("");
    const [check, setcheck] = useState(false);
    const [checkPass, setcheckPass] = useState("");
    const [activeCheckPass, setActiveCheckPass] = useState("");
    const [activeSignIn, setactiveSignIn] = useState(false);

    const [showSignInPassword, setshowSignInPassword] = useState(false);

    const MoveYRef = useRef();
    const MoveXRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        MoveY(MoveYRef.current, -100, 50)
        MoveX(MoveXRef.current, -100, 0)
    }, [])

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            if (signInWithGoogle) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.error(error);
        }
    };
    const checkLength = (value) => {
        if (!value) return;

        if (value.length > 8) {
            setActiveCheckPass(true);
        } else {
            setActiveCheckPass(false);
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

                {/*  S I G N  I N */}
                <div >
                    <div className="flex items-center justify-center h-1/2 " ref={MoveYRef}>
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
                                            <p>I</p>
                                        </div>
                                        <div>
                                            <p>N</p>
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
                                        <input className="outline-none w-full" type="text" placeholder="Username"
                                            value={checkActive} onChange={(e) => checker(e, setcheckActive, setactiveSignIn, setshowSignInPassword, setcheck)} />

                                        <i className={`cursor-pointer bi bi-arrow-right-circle  
                                        ${check ? "hidden" : ""}  
                                        ${activeSignIn ? "text-green-500" : ""}`}
                                            onClick={() => {
                                                showInput(activeSignIn, setshowSignInPassword);
                                                if (activeSignIn) {
                                                    setcheck(true)
                                                }
                                            }
                                            }>
                                        </i>

                                        <i className={`bi bi-check-circle-fill ${check ? "text-green-500" : "hidden"}`}></i>
                                    </div>
                                    {showSignInPassword && (
                                        <div className="username flex bg-gray-100 px-3 py-3 rounded-lg w-[500px] mt-2">
                                            <input className="outline-none w-full" type="text" placeholder="Password" value={checkPass} onChange={(e) => { setcheckPass(e.target.value); checkLength(e.target.value); }} />
                                            <i className={`cursor-pointer bi bi-arrow-right-circle ${activeCheckPass ? "text-green-500" : ""}`}></i>
                                        </div>
                                    )}
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
                                <p className="text-sky-500 cursor-pointer m-0 hover:text-sky-600">
                                    Create Your Flux Link Account
                                </p>
                            </div>
                            <div className="flex gap-2 justify-start items-center w-full mt-3 p-3 h-full cursor-pointer border border-gray-400 hover:bg-gray-100 rounded-lg" onClick={handleLogin}>
                                <div className="flex justify-start items-center">
                                    <i className="bi bi-google"></i>
                                </div>
                                <div className="flex justify-start items-center">
                                    <p className="m-0">Sign In With Google Account</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section >
        </>
    )
}