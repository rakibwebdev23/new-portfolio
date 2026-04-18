"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUp } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { TypeAnimation } from "react-type-animation"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

            // hero text lines slide up
            tl.from(".hero-line", {
                y: 80,
                opacity: 0,
                duration: 1.1,
                stagger: 0.12,
                delay: 0.15,
            })

            // sub elements fade up
            tl.from(".hero-sub", {
                y: 28,
                opacity: 0,
                duration: 0.75,
                stagger: 0.1,
            }, "-=0.7")

            // image block
            tl.from(".hero-image-container", {
                scale: 0.94,
                opacity: 0,
                duration: 1.4,
                ease: "expo.out",
            }, "-=1.1")

            // floating cards entrance
            tl.from(".float-card", {
                x: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.18,
            }, "-=0.6")

            // continuous float animation
            gsap.to(".float-card", {
                y: -14,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { each: 0.6, from: "random" },
            })

            // mouse parallax on topo lines
            const onMouseMove = (e: MouseEvent) => {
                const xP = (e.clientX / window.innerWidth - 0.5) * 24
                const yP = (e.clientY / window.innerHeight - 0.5) * 24
                gsap.to(".parallax-bg", { x: xP, y: yP, duration: 1.1, ease: "power2.out" })
            }
            window.addEventListener("mousemove", onMouseMove)
            return () => window.removeEventListener("mousemove", onMouseMove)
        }, containerRef)

        return () => ctx.revert()
    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#050C1C] flex items-center overflow-hidden pt-28 pb-16"
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Orange topo lines */}
                <svg
                    className="parallax-bg absolute top-0 left-0 w-full h-full opacity-40"
                    viewBox="0 0 1440 900"
                    fill="none"
                >
                    <path d="M-60 220 C180 140 400 360 640 250 C880 140 1160 400 1500 280"
                        stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.55" />
                    <path d="M-60 430 C220 360 430 540 680 440 C930 340 1180 590 1500 490"
                        stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.40" />
                    <path d="M-60 640 C300 570 520 720 760 640 C1000 560 1260 800 1500 700"
                        stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.28" />
                    <path d="M-60 820 C350 760 580 870 820 820 C1060 770 1300 900 1500 870"
                        stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.18" />
                </svg>

                {/* Concentric arcs top-right */}
                <svg className="absolute -top-32 -right-32 w-[700px] h-[700px] opacity-[0.12]" viewBox="0 0 700 700">
                    {[110, 175, 240, 305, 370, 435].map((r) => (
                        <circle key={r} cx="700" cy="0" r={r * 1.55} stroke="white" strokeWidth="1" fill="none" />
                    ))}
                </svg>

                {/* Glow blobs */}
                <div className="absolute top-1/2 left-1/3 w-[560px] h-[560px] bg-blue-700/8 rounded-full blur-[160px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-orange-600/10 rounded-full blur-[130px]" />
            </div>

            {/* ── Triangle zigzag logo (center-top) ── */}
            <div className="absolute top-[108px] left-1/2 -translate-x-1/2 z-10 flex items-end gap-1.5 pointer-events-none">
                {[
                    { color: "#FF5C00", size: 18 },
                    { color: "white",   size: 22 },
                    { color: "#FF5C00", size: 18 },
                    { color: "white",   size: 22 },
                    { color: "#FF5C00", size: 14 },
                    { color: "white",   size: 18 },
                ].map((t, i) => (
                    <svg key={i} width={t.size} height={t.size} viewBox="0 0 20 20">
                        <path d="M10 0 L20 20 H0Z" fill={t.color} />
                    </svg>
                ))}
            </div>

            {/* ── Main Grid ── */}
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">

                {/* ════ LEFT CONTENT ════ */}
                <div className="space-y-7">

                    {/* Hello badge + scribble arcs */}
                    <div className="hero-line relative inline-flex items-center">
                        <svg className="absolute -left-8 -top-5 w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <path d="M4 26 C6 12, 14 6, 20 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M10 28 C12 14, 20 8, 26 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                        <svg className="absolute -right-8 -top-5 w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <path d="M28 26 C26 12, 18 6, 12 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M22 28 C20 14, 12 8, 6 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                        <span className="bg-white text-[#050C1C] px-7 py-2 rounded-full text-base font-bold shadow-lg select-none">
                            Hello
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold text-white leading-[1.07]">
                        <div className="hero-line overflow-hidden">Experience the</div>
                        <div className="hero-line overflow-hidden">power of visual</div>

                        {/* Orange typewriter line */}
                        <div className="hero-line text-[#FF5C00] relative min-h-[1.2em] flex items-center">
                            <TypeAnimation
                                sequence={[
                                    "Strategie",  2200, "", 400,
                                    "Storytelling", 2200, "", 400,
                                    "Creativity",  2200, "", 400,
                                    "Innovation",  2200, "", 400,
                                ]}
                                wrapper="span"
                                speed={45}
                                deletionSpeed={60}
                                cursor={true}
                                repeat={Infinity}
                                className="inline-block"
                                style={{ display: "inline-block" }}
                            />
                            {/* Double wave underline */}
                            <svg
                                className="absolute -bottom-4 left-0 w-[55%] h-6 pointer-events-none"
                                viewBox="0 0 340 22"
                                preserveAspectRatio="none"
                                fill="none"
                            >
                                <path d="M0 8 Q85 0 170 8 Q255 16 340 8" stroke="#FF5C00" strokeWidth="3.5" strokeLinecap="round" />
                                <path d="M0 15 Q85 7 170 15 Q255 23 340 15" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                            </svg>
                        </div>
                    </h1>

                    {/* Description */}
                    <p className="hero-sub text-white/65 text-base md:text-lg leading-relaxed max-w-[440px]">
                        Dive into a realm where design meets narrative. Folxo brings
                        to life the potent fusion of creativity and user experience.
                    </p>

                    {/* CTA row */}
                    <div className="hero-sub flex flex-wrap items-center gap-8 pt-2">
                        <Link href="/contact">
                            <button className="group flex items-center gap-3 bg-[#FF5C00] hover:bg-[#e65200] active:scale-95 text-white rounded-full px-9 py-4 text-base font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105">
                                Hire me
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>

                        {/* Client avatars */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[16, 17, 18, 19].map((n) => (
                                    <div
                                        key={n}
                                        className="w-11 h-11 rounded-full border-2 border-[#050C1C] overflow-hidden relative hover:scale-110 hover:z-20 transition-transform duration-200 cursor-pointer"
                                    >
                                        <Image src={`https://i.pravatar.cc/88?img=${n}`}
                                            alt={`Client ${n}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-black text-lg leading-tight">10K+ worldwide</p>
                                <p className="text-white font-black text-lg leading-tight">clients</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════ RIGHT IMAGE ════ */}
                <div className="hero-image-container relative flex justify-center md:justify-end">

                    {/* Sparkle decoration */}
                    <div className="absolute -bottom-10 right-[40%] z-0 float-card">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z" stroke="#FF5C00" strokeWidth="1" fill="none" />
                        </svg>
                    </div>

                    {/* Main image wrapper with group for hover */}
                    <div className="relative z-10 w-full max-w-[480px] group">

                        {/*
                            SVG Frame — matches Folxo reference exactly:
                            Top edge: starts from rounded left, goes right, then
                            makes a rectangular step down-right at top-right (L-notch)
                            Right side goes down, then another step inward at bottom-right
                            Bottom edge goes left back to rounded bottom-left
                            Left side closes back up
                        */}
                        <svg
                            className="absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)] z-20 pointer-events-none opacity-55 group-hover:opacity-100 transition-opacity duration-700"
                            viewBox="0 0 520 620"
                            fill="none"
                        >
                            {/*
                              Frame path — same notch shape as clip-path below:
                              Start top-left (after diagonal cut) → top edge → step down at 62% → step right to full width
                              → down right side → step inward at 80% height → continue to bottom
                              → left along bottom → up left side → close
                            */}
                            <path
                                d="
                                  M 44 2
                                  L 2 44
                                  V 580
                                  C 2 600 18 618 38 618
                                  H 360
                                  V 500
                                  H 518
                                  V 120
                                  L 400 2
                                  Z
                                "
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            {/* Dot accents at the two step-notch corners */}
                            <circle cx="518" cy="120" r="4.5" fill="white" />
                            <circle cx="360" cy="618" r="4.5" fill="white" />
                        </svg>

                        {/* ── Clipped image ──
                            clip-path polygon mirrors the SVG frame shape exactly:
                            - 0% 12% = top-left angled corner start
                            - Two top notch gaps (35%→43%)
                            - Bottom-right double-step notch (68%-88% area)
                            Hover: image scales up 5% (zoom-in effect)
                        */}
                        <div
                            className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl"
                            style={{
                                clipPath: `polygon(
                                    0%   8%,
                                    8%   0%,
                                    77%  0%,
                                    100% 19%,
                                    100% 80%,
                                    69%  80%,
                                    69%  100%,
                                    0%   100%
                                )`,
                            }}
                        >
                            <Image
                                src="/images/profile.jpg"
                                alt="Robert Fox – UX/UI Designer"
                                fill
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                            />
                            {/* Subtle bottom gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050C1C]/30 to-transparent" />
                        </div>

                        {/* ── Robert Fox Identity Card ──
                            Floats to the left of the image, ~35% from bottom
                            Hover: scales up slightly
                        */}
                        <div className="float-card absolute -left-16 bottom-[35%] bg-white rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-30 min-w-[210px] border border-gray-100 hover:scale-105 transition-transform duration-300 cursor-default">
                            <div className="w-12 h-12 rounded-xl overflow-hidden relative shadow-inner flex-shrink-0">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Robert Fox avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#050C1C] text-[16px] leading-none">Robert Fox</h4>
                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1.5">UX/UI Designer</p>
                            </div>
                        </div>

                        {/* ── Secondary Sketch Image ──
                            Bottom-left of main frame, notched top-left corner
                            Hover: scales up slightly
                        */}
                        <div
                            className="float-card absolute -bottom-10 -left-10 w-44 h-36 z-20 overflow-hidden shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform duration-300"
                            style={{ clipPath: `polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22%)` }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop"
                                alt="Design Sketch"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Scroll-to-top button ── */}
            <div className="absolute bottom-8 right-8 z-50">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="w-12 h-12 bg-[#FF5C00] hover:bg-[#e65200] rounded-lg flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </button>
            </div>
        </section>
    )
}




// "use client"

// import { useRef } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ArrowRight, ArrowUp } from "lucide-react"
// import gsap from "gsap"
// import { useGSAP } from "@gsap/react"
// import { TypeAnimation } from "react-type-animation"

// export function Hero() {
//     const containerRef = useRef<HTMLDivElement>(null)

//     useGSAP(() => {
//         const ctx = gsap.context(() => {
//             const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

//             // hero text lines slide up
//             tl.from(".hero-line", {
//                 y: 80,
//                 opacity: 0,
//                 duration: 1.1,
//                 stagger: 0.12,
//                 delay: 0.15,
//             })

//             // sub elements fade up
//             tl.from(".hero-sub", {
//                 y: 28,
//                 opacity: 0,
//                 duration: 0.75,
//                 stagger: 0.1,
//             }, "-=0.7")

//             // image block
//             tl.from(".hero-image-wrap", {
//                 scale: 0.94,
//                 opacity: 0,
//                 duration: 1.4,
//                 ease: "expo.out",
//             }, "-=1.1")

//             // floating cards
//             tl.from(".float-card", {
//                 x: 40,
//                 opacity: 0,
//                 duration: 0.9,
//                 stagger: 0.18,
//             }, "-=0.6")

//             // continuous float
//             gsap.to(".float-card", {
//                 y: -12,
//                 duration: 2.8,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut",
//                 stagger: { each: 0.6, from: "random" },
//             })

//             // parallax on mouse
//             const onMouseMove = (e: MouseEvent) => {
//                 const xP = (e.clientX / window.innerWidth - 0.5) * 24
//                 const yP = (e.clientY / window.innerHeight - 0.5) * 24
//                 gsap.to(".parallax-bg", { x: xP, y: yP, duration: 1.1, ease: "power2.out" })
//             }
//             window.addEventListener("mousemove", onMouseMove)
//             return () => window.removeEventListener("mousemove", onMouseMove)
//         }, containerRef)

//         return () => ctx.revert()
//     }, { scope: containerRef })

//     return (
//         <section
//             ref={containerRef}
//             className="relative min-h-screen bg-[#050C1C] flex items-center overflow-hidden pt-28 pb-16"
//         >
//             {/* ── Background: orange topo lines (left side) ── */}
//             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//                 <svg
//                     className="parallax-bg absolute top-0 left-0 w-full h-full opacity-40"
//                     viewBox="0 0 1440 900"
//                     fill="none"
//                 >
//                     <path d="M-60 220 C180 140 400 360 640 250 C880 140 1160 400 1500 280"
//                         stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.55" />
//                     <path d="M-60 430 C220 360 430 540 680 440 C930 340 1180 590 1500 490"
//                         stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.40" />
//                     <path d="M-60 640 C300 570 520 720 760 640 C1000 560 1260 800 1500 700"
//                         stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.28" />
//                     <path d="M-60 820 C350 760 580 870 820 820 C1060 770 1300 900 1500 870"
//                         stroke="#FF5C00" strokeWidth="1.4" strokeOpacity="0.18" />
//                 </svg>

//                 {/* Concentric arcs – top right corner */}
//                 <svg className="absolute -top-32 -right-32 w-[700px] h-[700px] opacity-[0.12]" viewBox="0 0 700 700">
//                     {[110, 175, 240, 305, 370, 435].map((r) => (
//                         <circle key={r} cx="700" cy="0" r={r * 1.55} stroke="white" strokeWidth="1" fill="none" />
//                     ))}
//                 </svg>

//                 {/* Subtle glow blobs */}
//                 <div className="absolute top-1/2 left-1/3 w-[560px] h-[560px] bg-blue-700/8 rounded-full blur-[160px]" />
//                 <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-orange-600/10 rounded-full blur-[130px]" />
//             </div>

//             {/* ── Center-top triangle logo (zigzag mountains) ── */}
//             {/*  Reference shows: 2 rows of alternating ▲ in orange & white  */}
//             <div className="absolute top-[108px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0 pointer-events-none">
//                 {/* top row – 3 white + 2 orange interleaved */}
//                 <div className="flex items-end gap-1.5">
//                     {[
//                         { color: "#FF5C00", size: 18 },
//                         { color: "white", size: 22 },
//                         { color: "#FF5C00", size: 18 },
//                         { color: "white", size: 22 },
//                         { color: "#FF5C00", size: 14 },
//                         { color: "white", size: 18 },
//                     ].map((t, i) => (
//                         <svg key={i} width={t.size} height={t.size} viewBox="0 0 20 20">
//                             <path d="M10 0 L20 20 H0Z" fill={t.color} />
//                         </svg>
//                     ))}
//                 </div>
//             </div>

//             {/* ── Main grid ── */}
//             <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">

//                 {/* ═══════════ LEFT CONTENT ═══════════ */}
//                 <div className="space-y-7">

//                     {/* Hello badge with orange scribble arcs */}
//                     <div className="hero-line relative inline-flex items-center">
//                         {/* Left scribble arcs */}
//                         <svg className="absolute -left-8 -top-5 w-8 h-8" viewBox="0 0 32 32" fill="none">
//                             <path d="M4 26 C6 12, 14 6, 20 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
//                             <path d="M10 28 C12 14, 20 8, 26 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
//                         </svg>
//                         {/* Right scribble arcs */}
//                         <svg className="absolute -right-8 -top-5 w-8 h-8" viewBox="0 0 32 32" fill="none">
//                             <path d="M28 26 C26 12, 18 6, 12 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
//                             <path d="M22 28 C20 14, 12 8, 6 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
//                         </svg>
//                         <span className="bg-white text-[#050C1C] px-7 py-2 rounded-full text-base font-bold shadow-lg select-none">
//                             Hello
//                         </span>
//                     </div>

//                     {/* Heading – static title with typewriter on orange line */}
//                     <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold text-white leading-[1.07]">
//                         <div className="hero-line overflow-hidden">Experience the</div>
//                         <div className="hero-line overflow-hidden">power of visual</div>
//                         {/* Orange typewriter line – DOES NOT change the base title */}
//                         <div className="hero-line text-[#FF5C00] relative min-h-[1.2em] flex items-center">
//                             <TypeAnimation
//                                 sequence={[
//                                     "Strategie",
//                                     2200,
//                                     "",
//                                     400,
//                                     "Storytelling",
//                                     2200,
//                                     "",
//                                     400,
//                                     "Creativity",
//                                     2200,
//                                     "",
//                                     400,
//                                     "Innovation",
//                                     2200,
//                                     "",
//                                     400,
//                                 ]}
//                                 wrapper="span"
//                                 speed={45}
//                                 deletionSpeed={60}
//                                 cursor={true}
//                                 repeat={Infinity}
//                                 className="inline-block"
//                                 style={{ display: "inline-block" }}
//                             />
//                             {/* Double wave underline SVG */}
//                             <svg
//                                 className="absolute -bottom-4 left-0 w-[55%] h-6 pointer-events-none"
//                                 viewBox="0 0 340 22"
//                                 preserveAspectRatio="none"
//                                 fill="none"
//                             >
//                                 <path d="M0 8 Q85 0 170 8 Q255 16 340 8" stroke="#FF5C00" strokeWidth="3.5" strokeLinecap="round" />
//                                 <path d="M0 15 Q85 7 170 15 Q255 23 340 15" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
//                             </svg>
//                         </div>
//                     </h1>

//                     {/* Description */}
//                     <p className="hero-sub text-white/65 text-base md:text-lg leading-relaxed max-w-[440px]">
//                         Dive into a realm where design meets narrative. Folxo brings
//                         to life the potent fusion of creativity and user experience.
//                     </p>

//                     {/* CTA row */}
//                     <div className="hero-sub flex flex-wrap items-center gap-8 pt-2">
//                         {/* Hire me button */}
//                         <Link href="/contact">
//                             <button
//                                 className="group flex items-center gap-3 bg-[#FF5C00] hover:bg-[#e65200] active:scale-95 text-white rounded-full px-9 py-4 text-base font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
//                             >
//                                 Hire me
//                                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//                             </button>
//                         </Link>

//                         {/* Client avatars + count */}
//                         <div className="flex items-center gap-4">
//                             <div className="flex -space-x-3">
//                                 {[16, 17, 18, 19].map((n) => (
//                                     <div
//                                         key={n}
//                                         className="w-11 h-11 rounded-full border-2 border-[#050C1C] overflow-hidden relative hover:scale-110 hover:z-20 transition-transform duration-200 cursor-pointer"
//                                     >
//                                         <Image
//                                             src={`https://i.pravatar.cc/88?img=${n}`}
//                                             alt={`Client ${n}`}
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                             <div>
//                                 <p className="text-white font-black text-lg leading-tight">10K+ worldwide</p>
//                                 <p className="text-white font-black text-lg leading-tight">clients</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ═══════════ RIGHT IMAGE ═══════════ */}
//                 <div className="hero-image-wrap relative flex justify-end items-center">

//                     {/* Sparkle / 4-point star accent – bottom-center-left */}
//                     <div className="float-card absolute bottom-8 left-[38%] z-0 opacity-70">
//                         <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
//                             <path d="M19 0L21.5 16.5L38 19L21.5 21.5L19 38L16.5 21.5L0 19L16.5 16.5L19 0Z"
//                                 stroke="#FF5C00" strokeWidth="1" fill="none" />
//                         </svg>
//                     </div>
//                     {/* Second sparkle */}
//                     <div className="float-card absolute bottom-16 left-[44%] z-0 opacity-50">
//                         <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//                             <path d="M11 0L12.5 9.5L22 11L12.5 12.5L11 22L9.5 12.5L0 11L9.5 9.5L11 0Z"
//                                 stroke="#FF5C00" strokeWidth="1" fill="none" />
//                         </svg>
//                     </div>

//                     {/* Main image wrapper */}
//                     <div className="relative z-10 w-full max-w-[460px] group">

//                         {/* ── White SVG border frame with notches ──
//                             Top-right notch cut: rectangular step
//                             Bottom-right notch cut: rectangular step
//                             Matches the reference frame exactly */}
//                         <svg
//                             className="absolute -inset-3 z-20 pointer-events-none w-[calc(100%+24px)] h-[calc(100%+24px)] opacity-60 group-hover:opacity-100 transition-opacity duration-700"
//                             viewBox="0 0 504 624"
//                             fill="none"
//                         >
//                             {/*
//                               Frame path:
//                               Start top-left corner → go right to first notch gap
//                               Top-right notch: skip a section, come back down then right again
//                               Right side down to bottom-right notch
//                               Bottom-right notch: step inward then continue down
//                               Bottom-left corner back to start
//                             */}
//                             <path
//                                 d="
//                                   M 40 2
//                                   H 310
//                                   V 48
//                                   H 502
//                                   V 400
//                                   H 452
//                                   V 502
//                                   H 420
//                                   V 622
//                                   H 40
//                                   C 18 622 2 606 2 584
//                                   V 40
//                                   C 2 18 18 2 40 2
//                                   Z
//                                 "
//                                 stroke="white"
//                                 strokeWidth="2.5"
//                             />
//                             {/* Corner dot accents at the notch joints */}
//                             <circle cx="310" cy="2" r="4" fill="white" />
//                             <circle cx="502" cy="48" r="4" fill="white" />
//                             <circle cx="452" cy="400" r="4" fill="white" />
//                             <circle cx="420" cy="502" r="4" fill="white" />
//                         </svg>

//                         {/* Clipped image – same shape as the frame path above */}
//                         <div
//                             className="relative w-full overflow-hidden shadow-2xl"
//                             style={{
//                                 aspectRatio: "504/624",
//                                 clipPath: `polygon(
//                                     8% 0%,
//                                     62% 0%,
//                                     62% 7.7%,
//                                     100% 7.7%,
//                                     100% 64%,
//                                     90% 64%,
//                                     90% 80.5%,
//                                     83% 80.5%,
//                                     83% 100%,
//                                     0% 100%,
//                                     0% 8%
//                                 )`,
//                             }}
//                         >
//                             <Image
//                                 src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
//                                 alt="Robert Fox – UX/UI Designer"
//                                 fill
//                                 priority
//                                 className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
//                             />
//                             {/* Subtle dark gradient at bottom */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-[#050C1C]/25 to-transparent" />
//                         </div>

//                         {/* ── Robert Fox identity card ──
//                             Sits floating just to the left of the image, ~35% from bottom */}
//                         <div className="float-card absolute -left-14 bottom-[30%] z-30 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 min-w-[200px] border border-gray-100 hover:scale-105 transition-transform duration-300 cursor-default">
//                             <div className="w-11 h-11 rounded-xl overflow-hidden relative shadow flex-shrink-0">
//                                 <Image
//                                     src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
//                                     alt="Robert Fox"
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                             <div>
//                                 <p className="font-extrabold text-[#050C1C] text-[15px] leading-none">Robert Fox</p>
//                                 <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">
//                                     UX/UI Designer
//                                 </p>
//                             </div>
//                         </div>

//                         {/* ── Second small image – bottom-left, notched top-left corner ── */}
//                         <div
//                             className="float-card absolute -bottom-10 -left-8 w-40 h-32 z-20 overflow-hidden shadow-xl border-2 border-white/20 hover:scale-105 transition-transform duration-300"
//                             style={{
//                                 clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)",
//                             }}
//                         >
//                             <Image
//                                 src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=600&auto=format&fit=crop"
//                                 alt="Design Sketch"
//                                 fill
//                                 className="object-cover"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ── Scroll-to-top button ── */}
//             <div className="absolute bottom-8 right-8 z-50">
//                 <button
//                     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                     className="w-13 h-13 w-12 h-12 bg-[#FF5C00] hover:bg-[#e65200] rounded-lg flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all duration-300"
//                 >
//                     <ArrowUp className="w-5 h-5 text-white" />
//                 </button>
//             </div>
//         </section>
//     )
// }
