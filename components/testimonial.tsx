"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Star } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
    {
        quote: "Folxo's ability to create visually appealing and user-friendly interfaces is unmatched. Their design solutions have breathed new life into our brand, making a lasting impression on our target audience.",
        author: "Liam Jones",
        role: "CEO, Skyline Travels",
        image: "https://i.pravatar.cc/150?img=52",
        rating: 98
    },
    {
        quote: "Working with Folxo has been an absolute pleasure. Their attention to detail and commitment to delivering a top-notch product is truly commendable. I highly recommend Folxo for anyone looking for a talented designer.",
        author: "Sarah Mitchell",
        role: "CEO at TechStart",
        image: "https://i.pravatar.cc/150?img=32",
        rating: 98
    },
    {
        quote: "The design work exceeded all our expectations. The team understood our vision perfectly and delivered a product that truly represents our brand. Highly professional and incredibly talented designers.",
        author: "James Wilson",
        role: "Founder at Designify",
        image: "https://i.pravatar.cc/150?img=33",
        rating: 98
    }
]

export function Testimonial() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-content", {
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
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const t = testimonials[currentIndex]

    return (
        <section ref={sectionRef} className="py-24 bg-[#050C1C] relative overflow-hidden">
            {/* Concentric arcs background — top-left */}
            <div className="absolute left-0 top-0 w-[400px] h-full opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 700" fill="none">
                    {[80, 140, 200, 260, 320].map((r) => (
                        <circle key={r} cx="0" cy="350" r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                    ))}
                </svg>
            </div>
            {/* Concentric arcs — right side */}
            <div className="absolute right-0 top-0 w-[400px] h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 700" fill="none">
                    {[80, 140, 200, 260, 320].map((r) => (
                        <circle key={r} cx="400" cy="350" r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-6">
                <div className="testimonial-content grid md:grid-cols-2 gap-12 items-center">
                    {/* LEFT: Notched portrait image with rating badge */}
                    <div className="relative hidden md:flex justify-center items-center">
                        {/* Notched frame outer border */}
                        <div className="relative w-full max-w-[380px]">
                            {/* SVG outer frame */}
                            <svg
                                className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] z-10 pointer-events-none"
                                viewBox="0 0 420 520"
                                fill="none"
                            >
                                <path
                                    d="M40 2H180M250 2H400C410 2 418 10 418 20V340L360 340V500C360 510 350 518 340 518H40C30 518 2 510 2 500V20C2 10 10 2 20 2Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    opacity="0.5"
                                />
                            </svg>

                            {/* Portrait image with notch clip */}
                            <div
                                className="relative w-full aspect-[3/4] overflow-hidden"
                                style={{
                                    clipPath: "polygon(12% 0%, 36% 0%, 36% 5%, 45% 5%, 45% 0%, 100% 0%, 100% 72%, 86% 72%, 86% 80%, 74% 80%, 74% 72%, 60% 72%, 60% 100%, 0% 100%, 0% 14%)"
                                }}
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                                    alt="Client testimonial"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Rating badge */}
                            <div className="absolute top-12 right-0 translate-x-1/3 bg-white rounded-2xl px-5 py-4 shadow-xl z-20 flex items-center gap-3">
                                <Star className="w-7 h-7 fill-black text-black" />
                                <div>
                                    <span className="text-2xl font-bold text-black">98</span>
                                    <span className="text-2xl font-bold text-[#FF5C00]">%</span>
                                    <p className="text-gray-500 text-xs mt-0.5">Positive review</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Testimonial text content */}
                    <div>
                        <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                            <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                            Testimonial
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Empowering user experiences
                        </h2>

                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            &ldquo;{t.quote}&rdquo;
                        </p>

                        <div className="mb-8">
                            <p className="text-white font-bold text-base">{t.author}</p>
                            <p className="text-white/50 text-sm">{t.role}</p>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
