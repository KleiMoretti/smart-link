

import { useState, useEffect } from "react"
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { reauthenticateWithPopup, onAuthStateChanged, GoogleAuthProvider, deleteUser } from "firebase/auth";

export default function Settings() {
    const [showWarn, setShowWarn] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const handleDelete = () => setShowWarn(true)
    const handleQuit = () => setShowWarn(false)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    const reauth = async () => {
        const user = auth.currentUser;

        if (!user) return;

        const provider = new GoogleAuthProvider();

        await reauthenticateWithPopup(user, provider);
    };

    const DeleteAccount = async () => {
        const user = auth.currentUser;

        if (!user) return;

        try {
            await reauth(); // 🔑 FIRST re-login
            await deleteUser(user); // THEN delete

            navigate("/login");
        } catch (error) {
            console.log(error.code, error.message);
        }
    };

    return (
        <>
            <div className={`absolute flex justify-center w-full h-full items-center -mt-40 backdrop-blur-sm bg-gray/10 ${showWarn ? "" : "hidden"}`} onClick={handleQuit}>
                <div className="p-4 border rounded-md border-gray-200 " onClick={(e) => e.stopPropagation()}>
                    <p>This action will permanently remove your account.</p>

                    <div className="w-full flex justify-center bg-red-500 text-white p-2 rounded-md hover:bg-red-700 cursor-pointer" onClick={DeleteAccount}>
                        <button>Continue</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-full mt-10">
                <div className="p-4 border rounded-md border-gray-200 w-1/3">
                    <div>
                        <p className="font-bold">Organization Settings</p>
                        <p>General configuration, privacy, and lifecycle controls</p>
                    </div>
                    <div>
                        <p>Are you sure you want to <span className="text-red-400">delete your account?</span></p>
                        <div className="bg-red-400 hover:bg-red-500 w-full p-2 text-md text-white font-bold rounded-md flex justify-center cursor-pointer" onClick={handleDelete}>
                            Delete Account
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}