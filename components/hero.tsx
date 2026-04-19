"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUp } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { TypeAnimation } from "react-type-animation"
import CommonWrapper from "./CommonWrapper"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    // Handle scroll-to-top visibility
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

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
            tl.from(".float-badge, .float-id-card, .float-sparkle", {
                x: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.18,
            }, "-=0.6")

            // continuous float animations
            gsap.to(".float-sparkle", {
                y: -12,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })
            // badge
            gsap.to(".float-badge", {
                y: 24,
                duration: 3.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.2,
            })
            // identity card
            gsap.to(".float-id-card", {
                y: -24,
                duration: 3.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.8,
            })

            // mouse parallax
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
            className="relative min-h-[90vh] bg-[#050b1b] flex items-center overflow-hidden pt-40 pb-28"
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

            {/* ── Main Grid ── */}
            <CommonWrapper className="grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* ════ LEFT CONTENT ════ */}
                <div className="space-y-7 md:pl-6">
                    {/* Hello badge */}
                    <div className="hero-line relative inline-flex items-center">
                        <svg className="absolute -left-8 -top-6 w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <path d="M4 26 C6 12, 14 6, 20 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M10 28 C12 14, 20 8, 26 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                        <svg className="absolute -right-8 -top-6 w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <path d="M28 26 C26 12, 18 6, 12 18" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M22 28 C20 14, 12 8, 6 20" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                        <span className="bg-white text-[#050C1C] px-7 py-2 rounded-full text-base font-bold shadow-lg select-none">
                            Hello
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold text-white leading-[1.07]">
                        <div className="hero-line overflow-hidden">Design . Code .</div>
                        <div className="hero-line overflow-hidden">Web Experiences</div>

                        {/* Orange typewriter line */}
                        <div className="hero-line text-[#FF5C00] relative min-h-[1.2em] flex items-center">
                            <TypeAnimation
                                sequence={[
                                    "Clean Code", 2200, "", 400,
                                    "Modern UI", 2200, "", 400,
                                    "Interactive", 2200, "", 400,
                                    "Scalable", 2200, "", 400,
                                ]}
                                wrapper="span"
                                speed={60}
                                deletionSpeed={50}
                                cursor={true}
                                repeat={Infinity}
                                className="inline-block"
                                style={{ display: "inline-block" }}
                            />
                            {/* Double wave underline */}
                            <svg
                                className="absolute -bottom-4 left-0 w-[65%] h-6 pointer-events-none"
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
                        I build full-stack web applications using the MERN stack, focusing on performance, scalability, and clean user experiences.
                    </p>

                    {/* CTA row */}
                    <div className="hero-sub flex flex-wrap items-center gap-8 pt-2">
                        <Link href="/contact">
                            <button className="group flex items-center gap-3 bg-[#FF5C00] hover:bg-[#e65200] active:scale-95 text-white rounded-full px-9 py-4 text-base font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 cursor-pointer">
                                Hire me
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ════ RIGHT IMAGE ════ */}
                <div className="hero-image-container relative flex justify-center md:justify-end md:pr-5">
                    {/* Sparkle decoration */}
                    {/* <div className="absolute -bottom-10 right-[40%] z-0 float-sparkle">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z" stroke="#FF5C00" strokeWidth="1" fill="none" />
                        </svg>
                    </div> */}

                    {/* Main image wrapper */}
                    <div className="relative z-10 w-full max-w-[420px] group">
                        {/* Deep orange ambient glow */}
                        <div className="absolute -inset-[14px] rounded-[2.8rem] bg-gradient-to-br from-[#FF5C00]/40 via-transparent to-blue-600/15 blur-[28px] opacity-60 group-hover:opacity-90 transition-opacity duration-700 z-0" />

                        {/* Ring borders */}
                        <div className="absolute -inset-[8px] rounded-[2.4rem] border border-white/[0.08] z-10 pointer-events-none" />
                        <div className="absolute -inset-[3px] rounded-[2.1rem] border border-[#FF5C00]/25 z-10 pointer-events-none group-hover:border-[#FF5C00]/50 transition-colors duration-700" />

                        {/* Brackets */}
                        <svg className="absolute -top-4 -left-4 w-12 h-12 z-20 pointer-events-none drop-shadow-[0_0_6px_rgba(255,92,0,0.7)]" viewBox="0 0 48 48" fill="none">
                            <path d="M3 22 L3 3 L22 3" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="absolute -top-4 -right-4 w-12 h-12 z-20 pointer-events-none drop-shadow-[0_0_6px_rgba(255,92,0,0.7)]" viewBox="0 0 48 48" fill="none">
                            <path d="M26 3 L45 3 L45 22" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="absolute -bottom-4 -left-4 w-12 h-12 z-20 pointer-events-none drop-shadow-[0_0_6px_rgba(255,92,0,0.7)]" viewBox="0 0 48 48" fill="none">
                            <path d="M3 26 L3 45 L22 45" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="absolute -bottom-4 -right-4 w-12 h-12 z-20 pointer-events-none drop-shadow-[0_0_6px_rgba(255,92,0,0.7)]" viewBox="0 0 48 48" fill="none">
                            <path d="M26 45 L45 45 L45 26" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {/* Image */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] z-10"
                            style={{ boxShadow: "0 0 0 1px rgba(255,92,0,0.15), 0 8px 40px rgba(255,92,0,0.20), 0 32px 80px rgba(0,0,0,0.5)" }}
                        >
                            <Image
                                src="/images/profile.jpg"
                                alt="MD Rakib Hasan"
                                fill
                                priority
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>

                        {/* Experience badge */}
                        <div className="float-badge absolute -bottom-6 -right-5 z-30">
                            <div className="bg-[#FF5C00] rounded-[1.2rem] px-5 py-3.5 shadow-lg flex flex-col items-center">
                                <span className="text-white font-black text-[1.6rem] leading-none">3+</span>
                                <span className="text-white/85 font-bold text-[9px] uppercase tracking-widest mt-1">Years Exp.</span>
                            </div>
                        </div>

                        {/* Identity Card */}
                        <div className="float-id-card absolute -left-[70px] bottom-[36%] z-30">
                            <div className="bg-white rounded-2xl py-3 px-4 shadow-xl flex items-center gap-3 border border-gray-100 min-w-[210px]">
                                <div className="w-11 h-11 rounded-xl overflow-hidden relative border-2 border-[#FF5C00]/20">
                                    <Image src="/images/profile.jpg" alt="Avatar" fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-[#050C1C] text-[13px]">MD Rakib Hasan</h4>
                                    <p className="text-[#FF5C00] font-bold text-[9px] uppercase">Mern Stack Dev</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonWrapper>

            {/* Scroll to top */}
            <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="w-12 h-12 bg-[#FF5C00] hover:bg-[#e65200] rounded-lg flex items-center justify-center shadow-2xl transition-all cursor-pointer"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </button>
            </div>
        </section>
    )
}
