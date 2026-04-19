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
                {/* Left: Folxo-style image collage */}
                <div className="about-images relative">
                    <div className="relative w-full max-w-[500px]">
                        <div className="relative bg-[#3d4f5f] rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&auto=format&fit=crop&q=80"
                                alt="Design workspace"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                {['#f0e6d3', '#b8c4c8', '#8fa3aa', '#d4c1a8'].map((c, i) => (
                                    <div key={i} className="w-8 h-10 rounded" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                                    <path d="M1 1L8 21L11 14L18 11L1 1Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M11 14L18 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className="absolute -bottom-8 -right-4 w-[56%] aspect-[3/4] shadow-xl overflow-hidden border-4 border-[#f5f5f5]"
                            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 22% 100%, 0% 78%)" }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                                alt="Robert Fox designer"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="about-content">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        About me
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight mb-6">
                        Why hire me? Learn what<br />
                        makes me ideal.
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-3">
                        Welcome to my creative sanctuary! I&apos;m Robert Fox, a passionate UI/UX
                        designer on a mission to redefine digital experiences.
                    </p>
                    <p className="text-gray-500 text-base leading-relaxed mb-10">
                        I embark on a journey to weave aesthetic elegance and functional
                        simplicity into every project.
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

                    <Button
                        variant="outline"
                        className="border-2 border-[#050C1C] text-[#050C1C] bg-transparent hover:bg-[#050C1C] hover:text-white rounded-full px-8 py-6 text-base font-semibold group transition-all duration-300"
                    >
                        Learn more
                        <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                </div>
            </CommonWrapper>
        </section>
    )
}
