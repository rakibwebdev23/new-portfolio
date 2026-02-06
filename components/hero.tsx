"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import gsap from "gsap"
import Image from "next/image"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Periodic rotation for the circular text
            gsap.to(".circular-text", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear"
            })

            // Entry animations
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.from(".hero-content-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                delay: 0.2
            })

            tl.from(".hero-image", {
                scale: 0.9,
                opacity: 0,
                duration: 1.2
            }, "-=0.8")

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="min-h-screen pt-32 md:pt-0 flex flex-col justify-center relative overflow-hidden bg-background">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-grow">
                {/* Left Content */}
                <div className="space-y-8 relative z-10 pt-10 md:pt-0">
                    {/* Badge / Circular Text Area */}
                    <div className="hero-content-item relative w-fit mb-6">
                        <div className="animate-spin-slow">
                            <svg className="w-28 h-28 md:w-32 md:h-32 circular-text" viewBox="0 0 100 100" width="100" height="100">
                                <defs>
                                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text fontSize="11">
                                    <textPath xlinkHref="#circle" className="uppercase font-bold tracking-widest fill-gray-400">
                                        • MERN Stack Developer • Frontend Developer
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-gray-400 p-4 rounded-full z-10">R</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-content-item space-y-4 relative">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter text-primary relative z-10 font-semibold">
                            MD Rakib <br />
                            <span className="font-extralight">Hasan</span>
                        </h1>
                        {/* Curved Underline */}
                        <svg className="absolute -bottom-6 left-0 w-64 md:w-80 h-auto text-primary z-0" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00026 26.8C80.8003 3.19999 157.6 -3.20001 198.8 9.19999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="hero-content-item max-w-lg pt-4">
                        <p className="text-white/80 leading-relaxed text-lg">
                            Lead MERN Stack Developer based in Dhaka, specializing in building scalable SaaS solutions and high-performance web applications.
                        </p>
                    </div>

                    <div className="hero-content-item pt-6">
                        <Button variant="outline" size="lg" className="rounded-none border-primary text-primary hover:bg-primary hover:text-black transition-all px-8 h-14 text-base tracking-wider font-semibold group cursor-pointer">
                            Download CV <Download className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Right Image with Complex Frame */}
                <div className="hero-image relative flex justify-center md:justify-end mt-10 md:mt-0">

                    {/* Background decorative curved lines on right */}
                    <svg className="absolute -top-10 -right-32 w-[600px] h-[700px] z-0 pointer-events-none" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M350 50 Q420 150 380 280 Q340 400 400 500" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                        <path d="M380 30 Q450 130 410 260 Q370 380 430 480" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
                    </svg>

                    {/* Decorative yellow dots pattern - near center left */}
                    <div className="absolute top-1/3 -left-8 z-20 grid grid-cols-3 gap-2">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                        ))}
                    </div>

                    {/* Decorative yellow dots pattern - top right */}
                    <div className="absolute top-8 right-8 z-20 grid grid-cols-4 gap-1.5">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                        ))}
                    </div>

                    {/* Decorative star element - bottom left */}
                    <div className="absolute bottom-32 -left-20 z-30">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 0L24.5 20L45 22.5L24.5 25L22.5 45L20.5 25L0 22.5L20.5 20L22.5 0Z" stroke="#ff6b4a" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>

                    {/* Main Image Container with complex frame */}
                    <div className="relative z-10 w-full max-w-[420px] group cursor-pointer">

                        {/* SVG Frame Outline - matching reference image 2 precisely */}
                        <svg
                            className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] z-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                            viewBox="0 0 454 574"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path d="
                                M 30 2
                                L 155 2
                                L 155 35
                                L 190 35
                                L 190 2
                                L 300 2
                                Q 310 2 310 12
                                L 310 45
                                L 345 45
                                L 345 2
                                L 452 2
                                L 452 380
                                Q 452 395 437 395
                                L 400 395
                                L 400 430
                                Q 400 440 390 440
                                L 370 440
                                L 370 395
                                L 320 395
                                L 320 572
                                L 30 572
                                Q 2 572 2 542
                                L 2 32
                                Q 2 2 30 2
                                Z
                            " stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
                        </svg>

                        {/* Clipped Image - matching frame shape */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-bl-3xl transition-all duration-500 ease-out group-hover:scale-[1.08]" style={{
                            clipPath: `polygon(
                                7% 0%,
                                34% 0%,
                                34% 6%,
                                42% 6%,
                                42% 0%,
                                66% 0%,
                                68% 2%,
                                68% 8%,
                                76% 8%,
                                76% 0%,
                                100% 0%,
                                100% 68%,
                                96% 69%,
                                88% 69%,
                                88% 76%,
                                81.5% 77%,
                                81.5% 69%,
                                70% 69%,
                                70% 100%,
                                7% 100%,
                                0% 94%,
                                0% 6%,
                                7% 0%
                            )`
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
                                alt="MD Rakib Hasan"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Profile Card - positioned on left middle */}
                        <div className="absolute left-0 bottom-[32%] -translate-x-1/3 z-30 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
                            <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60"
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-base">Robert Fox</h4>
                                <p className="text-gray-500 text-sm">UX/UI Designer</p>
                            </div>
                        </div>

                        {/* Secondary Image at bottom left with diagonal cut */}
                        <div className="absolute -bottom-6 -left-6 w-40 h-32 z-20 overflow-hidden" style={{
                            clipPath: `polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)`
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60"
                                alt="Working"
                                fill
                                className="object-cover"
                            />
                            {/* White border overlay - diagonal line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 128" preserveAspectRatio="none">
                                <path d="M32 0 L0 32 L0 128 L160 128 L160 0 L32 0" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
