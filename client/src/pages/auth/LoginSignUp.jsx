import "../../css/LoginSignUp.css"
import { useEffect, useState } from "react"
import supabase from "../../lib/supabaseClient";
import { signInWithGoogle } from "../../firebase/firebase";


export default function LoginPage() {

    const [check, setcheck] = useState("");
    const [active, setactive] = useState(false);
    const [showInputPassword, setshowInputPassword] = useState(false);

    const handleLogin = async () => {
        const user = await signInWithGoogle();
        console.log(user);
    };




    const checker = (e) => {
        const value = e.target.value;
        setcheck(value)
        if (value.trim().toLowerCase().endsWith("@gmail.com") && value != "@gmail.com") {
            setactive(true)
        } else {
            setactive(false)
            setshowInputPassword(false)
        }
    }

    function showInput() {
        if (active) {
            setshowInputPassword(true)
        } else {
            setshowInputPassword(false)
        }
    }


    return (
        <>
            <section className="px-3 py-3 h-screen relative overflow-hidden min-h-[300px] min-w-[200px]">
                <div className="flex items-center h-10">
                    <div className="flex gap-2 cursor-pointer">
                        <div><i className="bi bi-arrow-left"></i></div>
                        <div><p>Back</p></div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-1/2 ">
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
                            <form action="">
                                <div className="email flex bg-gray-100 px-3 py-3 rounded-lg w-[500px]">
                                    <input className="outline-none w-full" type="text" placeholder="Username"
                                        value={check} onChange={checker} />
                                    <i className={`cursor-pointer bi bi-arrow-right-circle ${active ? "text-green-500" : ""}`} onClick={showInput}></i>
                                </div>

                                {showInputPassword && (
                                    <div className="username flex bg-gray-100 px-3 py-3 rounded-lg w-[500px] mt-2">
                                        <input className="outline-none w-full" type="text" placeholder="Password"
                                        />
                                        <i className={`cursor-pointer bi bi-arrow-right-circle`}></i>
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

                            <p className="text-sky-500 cursor-pointer m-0">
                                Create Your Flux Link Account
                            </p>
                        </div>

                        <div className="flex gap-2 justify-start items-center w-full mt-3 p-3 h-full cursor-pointer border border-gray-400 hover:bg-gray-100 rounded-lg" onClick={handleLogin}>
                            <div className="flex justify-start items-center">
                                <i class="bi bi-google"></i>

                            </div>
                            <div className="flex justify-start items-center">
                                <p className="m-0">Sign Up With Google Account</p>
                            </div>
                        </div>
                    </div>

                </div>


            </section>
        </>
    )
}