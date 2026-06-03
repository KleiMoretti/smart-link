export default function Table({ profile, name, email }) {
    return (
        <>
            <div className="flex items-center space-x-2 mt-10">
                <div>
                    <img className="w-10 h-10 rounded-full" src={profile} alt="" />
                </div>
                <div className="leading-none">
                    <div><p className="m-0 text-sm leading-none">{name}</p></div>
                    <div><p className="m-0 text-sm text-sky-500 leading-none">{email}</p></div>
                </div>
            </div>
            <div className="flex justify-between mt-20">
                <div>
                    <select className="cursor-pointer border border-gray-2 p-2 outline-none">
                        <option>My Class</option>
                        <option>My Job</option>
                    </select>

                </div>
                <div className="flex space-x-5">

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="m-0">Active Link</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="m-0">Next Schedule</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <p className="m-0">Most Visitor</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <p className="m-0">Less Active</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <p className="m-0">Inactive</p>
                    </div>

                </div>
            </div>

            <div className="w-full overflow-x-auto flex justify-center">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead className="bg-gray-100 ">
                        <tr>
                            <th className="border p-3">MONDAY</th>
                            <th className="border p-3">TUESDAY</th>
                            <th className="border p-3">WEDNESDAY</th>
                            <th className="border p-3">THURSDAY</th>
                            <th className="border p-3">FRIDAY</th>
                            <th className="border p-3">SATURDAY</th>
                            <th className="border p-3">SUNDAY</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border p-3 bg-green-200">
                                8:00 AM <br />
                                https://meet.google.com/abc-defg-hij
                            </td>

                            <td className="border p-3">
                                9:30 AM <br />
                                https://meet.google.com/qwe-rtyu-iop
                            </td>

                            <td className="border p-3">
                                1:00 PM <br />
                                https://meet.google.com/zxc-vbnm-asd
                            </td>

                            <td className="border p-3">
                                3:00 PM <br />
                                https://meet.google.com/fgh-jklm-qwe
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>
                        </tr>

                        <tr>
                            <td>
                            </td>

                            <td className="border p-3">
                                9:30 AM <br />
                                https://meet.google.com/qwe-rtyu-iop
                            </td>

                            <td className="border p-3"></td>

                            <td className="border p-3">
                                3:00 PM <br />
                                https://meet.google.com/fgh-jklm-qwe
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>

                            <td className="border p-3">
                                10:00 AM <br />
                                https://meet.google.com/poi-uytr-ewq
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </>
    )
}