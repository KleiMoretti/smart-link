

export default function Table({ profile, name, email }) {
    return (
        <>

            <div className="w-full flex justify-center mt-20">
                <div className="w-1/2  flex items-center">
                    <div >
                        <div className="text-4xl font-medium">
                            <p className="m-0">1B Schedule</p>
                        </div>

                        <div className="flex gap-10 mt-10 items-center">
                            <p className="bg-sky-500 text-white p-2  rounded-full">Full Week</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Mon</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Tue</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Wed</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Thu</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Fri</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Sat</p>
                            <p className="hover:bg-gray-300 p-2 cursor-pointer rounded-full">Sun</p>
                        </div>
                    </div>

                </div>


            </div>


        </>
    )
}