"use client"

import { useEffect, useRef } from "react"
import CommonWrapper from "./CommonWrapper"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: "5+", label: "Years of experience" },
    { value: "30+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" }
]

export function AboutMe() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // General entrance for cards
            gsap.from(".bento-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power4.out"
            })

            // Animate stats counters
            counterRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rawVal = stats[index].value.replace(/[^0-9]/g, '')
                    const suffix = stats[index].value.replace(/[0-9]/g, '')
                    gsap.fromTo(
                        { val: 0 },
                        { val: parseInt(rawVal) },
                        {
                            duration: 2.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            },
                            onUpdate: function () {
                                if (ref) {
                                    ref.textContent = Math.round(this.targets()[0].val) + suffix
                                }
                            }
                        }
                    )
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#020617] relative overflow-hidden min-h-screen flex items-center">
            {/* ── Background Atmospheric Glows ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
            </div>

            <CommonWrapper className="relative z-10">
                <div className="flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
                        <div className="max-w-2xl">
                            <span className="text-[#FF5C00] text-sm font-bold uppercase tracking-[0.4em] mb-4 block">
                                Professional Overview
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                Md Rakib Hasan <br />
                                <span className="text-white/40">Full-Stack Architect</span>
                            </h2>
                        </div>
                        <div className="h-px flex-1 bg-white/10 hidden md:block mb-6 ml-12"></div>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {/* Bio Card (Large) */}
                        <div className="md:col-span-2 lg:col-span-2 bento-card p-8 md:p-10 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col justify-between group hover:bg-white/[0.05] transition-all duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FF5C00]"></span>
                                    The Narrative
                                </h3>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Motivated MERN Stack Developer with strong expertise in modern frontend frameworks and backend technologies.
                                    Experienced in leading teams and building scalable SaaS dashboards, role-based systems, and performance-optimized web applications.
                                    I blend technical precision with creative problem-solving to deliver high-impact digital solutions.
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-4 text-[#FF5C00] font-bold text-sm tracking-widest uppercase">
                                Crafting Excellence
                            </div>
                        </div>

                        {/* Career Card (Vertical) */}
                        <div className="md:col-span-1 lg:col-span-2 bento-card p-8 md:p-10 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col group hover:bg-white/[0.05] transition-all duration-500">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Current Mission
                            </h3>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[#FF5C00] text-xs font-black uppercase tracking-tighter mb-1">June 2025 — Present</p>
                                    <h4 className="text-2xl font-bold text-white">Frontend Developer</h4>
                                    <p className="text-white/50 font-medium">Softvence Agency, Dhaka</p>
                                </div>
                                <div className="space-y-4 text-white/40 text-sm italic border-l-2 border-white/5 pl-6">
                                    "Leading frontend architecture and optimizing React-based systems for high-traffic agency clients."
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards (Compact) */}
                        <div className="bento-card p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-[#FF5C00]/30 transition-all duration-500">
                            <span ref={(el) => { counterRefs.current[0] = el }} className="text-5xl font-black text-white mb-2">0</span>
                            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Experience</span>
                        </div>

                        <div className="bento-card p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-[#FF5C00]/30 transition-all duration-500">
                            <span ref={(el) => { counterRefs.current[1] = el }} className="text-5xl font-black text-white mb-2">0</span>
                            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Projects</span>
                        </div>

                        <div className="lg:col-span-2 bento-card p-8 md:p-10 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500">
                            <div className="flex flex-col">
                                <span ref={(el) => { counterRefs.current[2] = el }} className="text-5xl font-black text-[#FF5C00] mb-1">0</span>
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Client Satisfaction</span>
                            </div>
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>

                    </div>
                </div>
            </CommonWrapper>
        </section>
    )
}
