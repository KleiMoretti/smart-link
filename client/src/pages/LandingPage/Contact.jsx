

export default function ContactTest() {
    return (
        <>
            <section className="relative pt-[120px] pb-[100px] px-0">
                <div className="max-w-[1120px] my-0 mx-auto py-0 px-[32px] grid lg:grid-cols-[1fr_1fr] gap-[64px]">
                    <div>
                        <p className="font-['JetBrains_Mono',monospace] text-[12px] tracking-[0.12em] text-amber-500 mb-[18px]">GET STARTED</p>
                        <p className="text-[clamp(26px,3.6vw,38px)] font-bold font-['Space_Grotesk',sans-serif] leading-[1.3] tracking-[-0.01em] max-w-[720px]">Ready to carry <br />one link instead of ten?</p>
                        <div className="mb-[60px]">
                            <p className="text-[15px] leading-[1.65] text-[#94a3b8] max-w-[420px]">Tell us a bit about your schedule and we'll set up your first time-based Lyncks link — free for students.</p>
                        </div>

                        <div className="flex flex-col gap-[4px] py-[16px] px-0 border-t-1 border-t-[#22304f]">
                            <p className="m-0 text-[12px] text-[#5b6783]">Email</p>
                            <p className="m-0 font-['JetBrains_Mono',monospace] text-[14px] text-[#5b6783]">hello@lyncks.io</p>
                        </div>

                        <div className="flex flex-col gap-[4px] py-[16px] px-0 border-t-1 border-t-[#22304f]">
                            <p className="m-0 text-[12px] text-[#5b6783]">Response time</p>
                            <p className="m-0 font-['JetBrains_Mono',monospace] text-[14px] text-[#5b6783]">Within 24 hours</p>
                        </div>
                    </div>
                    <div>
                        <form className="flex flex-col gap-[18px] bg-[#141d35] border-2 border-[#22304f] p-[28px] rounded-lg">
                            <label className="flex flex-col gap-[8px] text-[13px] text-[#94a3b8]">
                                <p>Name</p>
                                <input className=" w-full font-['Inter',sans-serif] text-[14px] text-[#f8fafc] bg-[#111a2e] border-2 border-[#22304f] rounded-lg py-[12px] px-[14px] resize-none transition-colors duration-200 ease-in-out" type="text" placeholder="Juan Dela Cruz" />
                            </label>

                            <label className="flex flex-col gap-[8px] text-[13px] text-[#94a3b8]">
                                <p>Email</p>
                                <input className=" w-full font-['Inter',sans-serif] text-[14px] text-[#f8fafc] bg-[#111a2e] border-2 border-[#22304f] rounded-lg py-[12px] px-[14px] resize-none transition-colors duration-200 ease-in-out" type="text" placeholder="you@school.edu" />
                            </label>

                            <label className="flex flex-col gap-[8px] text-[13px] text-[#94a3b8]">
                                <p>What's your schedule like?</p>
                                <textarea className=" h-full outline-none w-full font-['Inter',sans-serif] text-[14px] text-[#f8fafc] bg-[#111a2e] border-1 border-[#22304f] rounded-lg py-[12px] px-[14px] resize-none transition-colors duration-200 ease-in-out" type="text" placeholder="3 classes a day, Gmeet + Zoom..." />
                            </label>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}