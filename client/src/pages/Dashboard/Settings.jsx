

import { useState } from "react"



export default function Settings() {
    const [showWarn, setShowWarn] = useState(false)

    const handleDelete = () => setShowWarn(true)
    const handleQuit = () => setShowWarn(false)

    return (
        <>
            <div className={`absolute flex justify-center w-full h-full items-center -mt-40 backdrop-blur-sm bg-gray/10 ${showWarn ? "" : "hidden"}`} onClick={handleQuit}>
                <div className="p-4 border rounded-md border-gray-200 ">
                    This action will permanently remove your account.
                </div>
            </div>

            <div className="flex justify-center mt-10">
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