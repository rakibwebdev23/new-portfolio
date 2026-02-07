"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: "5+", label: "Years of experience" },
    { value: "98%", label: "Positive review" },
    { value: "100+", label: "Project completed" }
]

export function AboutMe() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section on scroll
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
                    const endValue = stats[index].value.replace(/[^0-9]/g, '')
                    const suffix = stats[index].value.replace(/[0-9]/g, '')

                    gsap.fromTo(
                        { val: 0 },
                        { val: parseInt(endValue) },
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
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Images Collage */}
                    <div className="about-images relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Main large image */}
                            <div className="col-span-2 aspect-[16/10] rounded-2xl overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
                                    alt="Team collaboration"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Two smaller images */}
                            <div className="aspect-square rounded-2xl overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&auto=format&fit=crop&q=60"
                                    alt="Design work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60"
                                    alt="Creative work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="about-content">
                        <span className="text-[#FF5C00] text-sm font-medium flex items-center gap-2 mb-4">
                            <span className="w-6 h-[2px] bg-[#FF5C00]"></span>
                            Why hire me?
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight mb-6">
                            Learn what makes<br />
                            me ideal
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            With a rich background in UI/UX design and a keen eye for detail, I transform ideas into visually stunning and user-friendly solutions. My commitment to understanding your unique needs ensures that every project reflects your brand's essence.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center md:text-left">
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
                            className="bg-[#FF5C00] hover:bg-[#e65400] text-white rounded-full px-8 py-6 text-base font-semibold group transition-all duration-300 hover:scale-105"
                        >
                            Learn more
                            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
