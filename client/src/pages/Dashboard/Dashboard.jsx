
import { useState } from "react"
import "../../css/Dashboard.css"
import Table from "./Table"


export default function Dashboard() {
    const [showLines, setShowLine] = useState(false)

    return (
        <>
            <nav className="border boder-gray-500">
                <div className="flex justify-center h-20 items-center">
                    <div className="flex lg:w-[80%] justify-between gap-20">
                        <div className="flex items-center">
                            <h2 className="tracking-tight font-ubuntu font-bold whitespace-nowrap md:text-[2vw]">FluxLink</h2>
                        </div>
                        <div className="flex gap-10 items-center font-medium ">
                            <div>
                                Schedules
                            </div>

                            <div>
                                Subscription
                            </div>
                            <div>
                                Feedback
                            </div>
                            <div>
                                Settings
                            </div>
                        </div>
                        <div className="whitespace-nowrap flex bg-blue-500 hover:bg-blue-600 items-center px-3 py-2 text-white rounded-md font-bold cursor-pointer transition-colors duration-200">
                            Create Link
                        </div>
                    </div>
                </div>
            </nav>

            <Table />
        </>
    )
}