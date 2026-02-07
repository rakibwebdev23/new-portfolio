"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import Image from "next/image"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entry animations
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.from(".hero-content-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                delay: 0.3
            })

            tl.from(".hero-image", {
                scale: 0.9,
                opacity: 0,
                duration: 1.2
            }, "-=0.8")

            tl.from(".floating-badge", {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2
            }, "-=0.6")

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="min-h-screen pt-32 flex flex-col justify-center relative overflow-hidden bg-[#050C1C]">
            {/* Background Decorative Elements */}
            {/* Topographic lines pattern */}
            <div className="absolute inset-0 z-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="200" cy="450" rx="400" ry="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <ellipse cx="200" cy="450" rx="350" ry="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
                    <ellipse cx="200" cy="450" rx="300" ry="220" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
                    <ellipse cx="200" cy="450" rx="250" ry="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            {/* Blue glow effect */}
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-grow">
                {/* Left Content */}
                <div className="space-y-8 relative z-10 pt-10 md:pt-0">
                    {/* Hello Badge */}
                    <div className="hero-content-item flex items-center gap-3 mb-6">
                        {/* Decorative star */}
                        <svg className="w-6 h-6 text-[#FF5C00]" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
                        </svg>
                        <span className="bg-white text-[#050C1C] px-4 py-1.5 rounded-full text-sm font-medium">
                            Hello
                        </span>
                        {/* Decorative lines */}
                        <svg className="w-10 h-10 text-[#FF5C00]" viewBox="0 0 40 40" fill="none">
                            <path d="M20 5L22 15L32 17L22 19L20 29L18 19L8 17L18 15L20 5Z" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                    </div>

                    {/* Main Heading */}
                    <div className="hero-content-item space-y-2">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                            Experience the<br />
                            power of visual<br />
                            <span className="text-[#FF5C00] relative inline-block">
                                Strategies
                                {/* Orange underline */}
                                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                                    <path d="M0 6 Q50 0, 100 6 Q150 12, 200 6" stroke="#FF5C00" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="hero-content-item max-w-md">
                        <p className="text-white/70 text-lg leading-relaxed">
                            Dive into a realm where design meets narrative. Folxo brings to life the potent fusion of creativity and user experience.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="hero-content-item flex flex-wrap items-center gap-6 pt-4">
                        {/* Hire Me Button */}
                        <Button
                            className="bg-[#FF5C00] hover:bg-[#e65400] text-white rounded-full px-8 py-6 text-base font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            Hire me
                            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Button>

                        {/* Client Avatars */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050C1C] overflow-hidden relative">
                                        <Image
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt={`Client ${i}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg">10K+</p>
                                <p className="text-white/60 text-sm">worldwide clients</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image with Complex Frame */}
                <div className="hero-image relative flex justify-center md:justify-end mt-10 md:mt-0">
                    {/* Decorative geometric elements */}
                    <div className="absolute -top-8 right-1/4 z-30">
                        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                            <path d="M0 40L15 0L30 40" fill="#FF5C00" />
                            <path d="M20 40L35 0L50 40" fill="white" />
                            <path d="M40 40L55 0L60 20" fill="#FF5C00" />
                        </svg>
                    </div>

                    {/* Main Image Container with complex frame */}
                    <div className="relative z-10 w-full max-w-[420px] group">

                        {/* SVG Frame Outline */}
                        <svg
                            className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] z-20 pointer-events-none"
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
                        <div className="relative aspect-[4/5] overflow-hidden rounded-bl-3xl transition-all duration-500 ease-out" style={{
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
                                alt="Designer at work"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Profile Card - Floating badge */}
                        <div className="floating-badge absolute left-0 bottom-[35%] -translate-x-1/4 z-30 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
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

                        {/* Secondary Image at bottom left */}
                        <div className="floating-badge absolute -bottom-4 -left-4 w-36 h-28 z-20 overflow-hidden rounded-tr-2xl" style={{
                            clipPath: `polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)`
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60"
                                alt="Working"
                                fill
                                className="object-cover"
                            />
                            {/* White border overlay */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 144 112" preserveAspectRatio="none">
                                <path d="M29 0 L0 29 L0 112 L144 112 L144 0 L29 0" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
                            </svg>
                        </div>

                        {/* Decorative star element */}
                        <div className="floating-badge absolute bottom-16 right-0 translate-x-1/2 z-30">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <path d="M25 0L27 23L50 25L27 27L25 50L23 27L0 25L23 23L25 0Z" stroke="#FF5C00" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
