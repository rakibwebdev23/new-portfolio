"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import CommonWrapper from "./CommonWrapper"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: "5+", label: "Years of experience" },
    { value: "500+", label: "Satisfied clients" },
    { value: "98%", label: "Positive review" }
]

export function AboutMe() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })

            gsap.from(".about-images", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
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
                            duration: 2,
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
        <section ref={sectionRef} className="py-24 bg-[#f5f5f5] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-16 right-24 opacity-30 pointer-events-none">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="10" y="10" width="60" height="60" stroke="#FF5C00" strokeWidth="1.5" fill="none" transform="rotate(45 40 40)" />
                    {Array.from({ length: 8 }).map((_, i) => (
                        <line key={i} x1={10 + i * 9} y1="10" x2={10 + i * 9} y2="70" stroke="#FF5C00" strokeWidth="0.8" opacity="0.5" />
                    ))}
                </svg>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" stroke="#FF5C00" strokeWidth="1.5" fill="none" />
                    <circle cx="60" cy="60" r="36" stroke="#FF5C00" strokeWidth="1" fill="none" />
                </svg>
            </div>
            <div className="absolute bottom-24 right-36 opacity-60 pointer-events-none">
                <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
                    <path d="M5 50 C20 10, 50 55, 85 20" stroke="#FF5C00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M5 55 C20 15, 50 60, 85 25" stroke="#FF5C00" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
            </div>

            <CommonWrapper className="grid md:grid-cols-2 gap-16 items-center">
                {/* Left: Simple Professional Image Collage */}
                <div className="about-images relative">
                    <div className="relative w-full max-w-[500px]">
                        {/* Primary Image */}
                        <div className="relative bg-[#050C1C]/5 rounded-3xl overflow-hidden aspect-[4/3] shadow-xl group/img">
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&auto=format&fit=crop&q=80"
                                alt="Design workspace"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                            />

                            {/* Color markers refined */}
                            <div className="absolute bottom-6 left-6 flex gap-3 z-20">
                                {['#FF5C00', '#050C1C', '#8fa3aa', '#d4c1a8'].map((c, i) => (
                                    <div key={i} className="w-9 h-2 rounded-full shadow-sm" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>

                        {/* Secondary Overlaid Image */}
                        <div className="absolute -bottom-10 -right-4 w-[60%] aspect-[3/4] shadow-2xl overflow-hidden rounded-2xl border-[6px] border-white z-10 group/img2">
                            <Image
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                                alt="MD Rakib Hasan"
                                fill
                                className="object-cover group-hover/img2:scale-110 transition-transform duration-1000"
                            />
                        </div>

                        {/* Basic Decorative Element */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-[#FF5C00] opacity-20" />
                    </div>
                </div>

                {/* Right: Content */}
                <div className="about-content">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        About me
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight mb-6">
                        Why Hire Me? Discover What Makes Me a Strong Fit
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-3">
                        I’m a passionate MERN Stack Developer who builds scalable, high-performance web applications with a focus on clean code and seamless user experience.
                    </p>
                    <p className="text-gray-500 text-base leading-relaxed mb-3">
                        I specialize in developing full-stack solutions using MongoDB, Express.js, React, and Node.js. My goal is to create efficient, user-friendly, and visually engaging applications that solve real-world problems.
                    </p>
                    <p className="text-gray-500 text-base leading-relaxed mb-10">
                        I continuously learn and adapt to new technologies to deliver modern and reliable digital products.
                    </p>

                    {/* Stats */}
                    <div className="flex items-stretch gap-0 mb-10">
                        {stats.map((stat, index) => (
                            <div key={index} className={`flex-1 ${index > 0 ? 'pl-6 border-l border-gray-300' : ''} ${index < stats.length - 1 ? 'pr-6' : ''}`}>
                                <span
                                    ref={el => { counterRefs.current[index] = el }}
                                    className="text-4xl font-bold text-[#050C1C] block mb-1"
                                >
                                    0{stat.value.replace(/[0-9]/g, '')}
                                </span>
                                <span className="text-gray-500 text-sm">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        className="relative flex items-center gap-2 border-2 border-[#050C1C] text-[#050C1C] bg-transparent rounded-full px-8 py-3 text-base font-semibold group cursor-pointer overflow-hidden z-10 transition-colors duration-300"
                    >
                        {/* Smooth sliding background fill */}
                        <span className="absolute inset-0 bg-[#050C1C] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />

                        <span className="relative z-20 group-hover:text-white transition-colors duration-300">
                            Learn more
                        </span>
                        <ArrowUpRight className="relative z-20 ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </button>
                </div>
            </CommonWrapper>
        </section>
    )
}
