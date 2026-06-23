
export default function AboutTest() {
    return (
        <>
            <section className="relative py-[120px] px-0">
                <div className="max-w-[1120px] my-0 mx-auto py-0 px-[32px]">
                    <p className="font-['JetBrains_Mono',monospace] text-[12px] tracking-[0.12em] text-[#5b5fef] mb-[18px]">ABOUT LYNCKS</p>
                    <p className="text-[clamp(26px,3.6vw,38px)] font-bold font-['Space_Grotesk',sans-serif] leading-[1.3] tracking-[-0.01em] max-w-[720px]">
                        Built for the student with five tabs open <br />
                        and one minute to get to class.
                    </p>
                    <div className="h-[1px] bg-[#22304f] mt-[40px] mb-[56px] mx-0">
                    </div>

                    <div className="lg:grid-cols-3 grid gap-[20px]">
                        <div className="bg-[#141d35] border-[2px] border-[#22304f] py-[28px] px-[24px] transition-colors duration-300 ease-in-out hover:border-teal-500 rounded-lg">
                            <span className="inline-block mb-[16px] text-[#94a3b8] text-[11px] tracking-[0.08em]">STEP 1</span>
                            <p className="text-white font-['JetBrains_Mono',monospace]  text-lg font-bold mb-[10px]">Set your schedule</p>
                            <p className="text-[14px] text-[#94a3b8] font-['Space_Grotesk',sans-serif]">Add each link once — Gmeet, Zoom, Discord, whatever you use — and tell Lyncks what time block it belongs to.</p>
                        </div>

                        <div className="bg-[#141d35] border-[2px] border-[#22304f] py-[28px] px-[24px] transition-colors duration-300 ease-in-out hover:border-amber-500 rounded-lg">
                            <span className="inline-block mb-[16px] text-[#94a3b8] text-[11px] tracking-[0.08em]">STEP 1</span>
                            <p className="text-white font-['JetBrains_Mono',monospace]  text-lg font-bold mb-[10px]">Set your schedule</p>
                            <p className="text-[14px] text-[#94a3b8] font-['Space_Grotesk',sans-serif]">Add each link once — Gmeet, Zoom, Discord, whatever you use — and tell Lyncks what time block it belongs to.</p>
                        </div>

                        <div className="bg-[#141d35] border-[2px] border-[#22304f] py-[28px] px-[24px] transition-colors duration-300 ease-in-out hover:border-indigo-500 rounded-lg">
                            <span className="inline-block mb-[16px] text-[#94a3b8] text-[11px] tracking-[0.08em]">STEP 1</span>
                            <p className="text-white font-['JetBrains_Mono',monospace]  text-lg font-bold mb-[10px]">Set your schedule</p>
                            <p className="text-[14px] text-[#94a3b8] font-['Space_Grotesk',sans-serif]">Add each link once — Gmeet, Zoom, Discord, whatever you use — and tell Lyncks what time block it belongs to.</p>
                        </div>
                    </div>
                    <div className="mt-[64px] flex justify-between flex-wrap gap-[32px] rounded-[16px] bg-[#111a2e] border-1 border-[#22304f] p-[32px]">
                        <div className="flex flex-col items-center gap-[6px] flex-1 min-w-[140px]">
                            <span className="font-['Space_Grotesk',sans-serif] text-[#4ade9b] font-bold text-[32px]">1</span>
                            <span className="text-[#94a3b8] text-center text-[12px]">link to remember</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] flex-1 min-w-[140px]">
                            <span className="font-['Space_Grotesk',sans-serif] text-[#4ade9b] font-bold text-[32px]">10+</span>
                            <span className="text-[#94a3b8] text-center text-[12px]">destinations handled</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] flex-1 min-w-[140px]">
                            <span className="font-['Space_Grotesk',sans-serif] text-[#4ade9b] font-bold text-[32px]">0</span>
                            <span className="text-[#94a3b8] text-center text-[12px]">missed classes from wrong links</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}