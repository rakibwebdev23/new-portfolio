"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowUp, Star, Lightbulb } from "lucide-react"
import gsap from "gsap"
import Image from "next/image"
import { useGSAP } from "@gsap/react"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cyclingWordRef = useRef<HTMLSpanElement>(null)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const words = ["Stories", "Concepts", "Designs"]

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Entry animations for text
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

            tl.from(".hero-split-text", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                delay: 0.2
            })

            tl.from(".hero-reveal-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            }, "-=0.8")

            tl.from(".hero-image-container", {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out"
            }, "-=1")

            tl.from(".floating-card", {
                x: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            }, "-=0.5")

            // Floating animations
            gsap.to(".float-element", {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.7,
                    from: "random"
                }
            })

            // Topographic lines drawing animation
            gsap.to(".topo-line", {
                strokeDashoffset: 0,
                duration: 4,
                stagger: 0.3,
                ease: "power2.inOut"
            })

            // Word cycling animation
            const wordCycle = () => {
                const tlWord = gsap.timeline({
                    onComplete: () => {
                        setCurrentWordIndex((prev) => (prev + 1) % words.length)
                        gsap.delayedCall(2, wordCycle)
                    }
                })

                tlWord.to(cyclingWordRef.current, {
                    y: -30,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.in"
                })
                tlWord.set(cyclingWordRef.current, { y: 30 })
                tlWord.to(cyclingWordRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
                })
            }

            gsap.delayedCall(3, wordCycle)

            // Mouse parallax effect
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e
                const xPos = (clientX / window.innerWidth - 0.5) * 30
                const yPos = (clientY / window.innerHeight - 0.5) * 30

                gsap.to(".parallax-bg", {
                    x: xPos,
                    y: yPos,
                    duration: 1.2,
                    ease: "power2.out"
                })
            }

            window.addEventListener("mousemove", handleMouseMove)
            return () => window.removeEventListener("mousemove", handleMouseMove)

        }, containerRef)

        return () => ctx.revert()
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden bg-[#050C1C]">
            {/* Authentic Topographic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Left Vibrant Orange Topo Lines */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-35 parallax-bg" viewBox="0 0 1440 900" fill="none">
                    <path className="topo-line" d="M0 200C150 160 350 320 550 240C750 160 1000 380 1440 280" stroke="#FF5C00" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="1800" strokeDashoffset="1800" />
                    <path className="topo-line" d="M0 400C250 350 450 520 650 430C850 340 1100 580 1440 480" stroke="#FF5C00" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="1800" strokeDashoffset="1800" />
                    <path className="topo-line" d="M0 600C350 550 550 720 750 640C950 560 1200 820 1440 700" stroke="#FF5C00" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="1800" strokeDashoffset="1800" />
                </svg>

                {/* Top Right Concentric Circles (Radiating from corner) */}
                <svg className="absolute -top-40 -right-40 w-[800px] h-[800px] opacity-15" viewBox="0 0 800 800">
                    {[100, 160, 220, 280, 340, 400].map((r) => (
                        <circle key={r} cx="800" cy="0" r={r * 1.5} stroke="white" strokeWidth="1" fill="none" />
                    ))}
                </svg>

                {/* Chunkier Center Top Triangle Logo */}
                <div className="absolute top-32 left-1/2 -translate-x-1/2 flex gap-2 opacity-100 z-20">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <svg key={i} width="24" height="16" viewBox="0 0 24 16">
                            <path d="M0 16L12 0L24 16H0Z" fill={i % 2 === 0 ? "#FF5C00" : "white"} />
                        </svg>
                    ))}
                </div>

                {/* Geometric Accents */}
                <div className="absolute top-[30%] right-[15%] float-element opacity-30">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16L20 0Z" fill="#FF5C00" />
                    </svg>
                </div>
                <div className="absolute bottom-[25%] left-[10%] float-element opacity-15">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M30 0L60 60H0L30 0Z" stroke="white" strokeWidth="1" fill="none" />
                    </svg>
                </div>
            </div>

            {/* Aesthetic Glows */}
            <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/15 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-grow relative z-10">
                {/* Left Content */}
                <div className="space-y-8">
                    {/* Hello Badge with CURVED Scribbles */}
                    <div className="relative inline-block hero-reveal-item group">
                        {/* Left Scribbles (Hand-drawn Curved Arcs) */}
                        <div className="absolute -top-7 -left-10 flex gap-2 -rotate-15">
                            {[1, 2, 3].map((i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 20 20">
                                    <path d="M2 18 C5 5, 15 5, 18 18" stroke="#FF5C00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                </svg>
                            ))}
                        </div>
                        {/* Right Scribbles (Hand-drawn Curved Arcs) */}
                        <div className="absolute -top-7 -right-10 flex gap-2 rotate-15">
                            {[1, 2, 3].map((i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 20 20">
                                    <path d="M2 18 C5 5, 15 5, 18 18" stroke="#FF5C00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                </svg>
                            ))}
                        </div>
                        <span className="bg-white text-[#050C1C] px-8 py-2.5 rounded-full text-lg font-bold shadow-2xl inline-block transition-transform hover:scale-105">
                            Hello
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05]">
                        <div className="hero-split-text overflow-hidden h-[1.1em]">Experience the</div>
                        <div className="hero-split-text overflow-hidden h-[1.1em]">power of visual</div>
                        <div className="hero-split-text overflow-hidden text-[#FF5C00] relative min-h-[1.1em]">
                            <span ref={cyclingWordRef} className="inline-block relative">
                                {words[currentWordIndex]}
                            </span>
                            {/* Hand-drawn DOUBLE Wave Underline */}
                            <svg className="absolute -bottom-5 left-0 w-full h-8 opacity-100" viewBox="0 0 400 30" preserveAspectRatio="none">
                                <path d="M0 10 Q100 0, 200 10 Q300 20, 400 10" stroke="#FF5C00" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M0 18 Q100 8, 200 18 Q300 28, 400 18" stroke="#FF5C00" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
                            </svg>
                        </div>
                    </h1>

                    {/* Description */}
                    <p className="hero-reveal-item text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
                        Dive into a realm where design meets narrative. Folxo brings to life the potent fusion of creativity and user experience.
                    </p>

                    {/* CTA & Clients */}
                    <div className="hero-reveal-item flex flex-wrap items-center gap-10 pt-4">
                        <Button
                            className="bg-[#FF5C00] hover:bg-[#e65400] text-white rounded-full px-12 py-8 text-xl font-bold group transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/30"
                        >
                            Hire me
                            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#050C1C] overflow-hidden relative transition-transform hover:scale-110 hover:z-20">
                                        <Image
                                            src={`https://i.pravatar.cc/100?img=${i + 15}`}
                                            alt={`Client ${i}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-black text-xl leading-none">10K+ worldwide</p>
                                <p className="text-white font-black text-xl leading-none mt-1">clients</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image Content with Perfect Frame */}
                <div className="hero-image-container relative flex justify-center md:justify-end">
                    {/* Background Sparkle Decoration */}
                    <div className="absolute -bottom-10 right-[40%] z-0 float-element">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z" stroke="#FF5C00" strokeWidth="1" fill="none" />
                        </svg>
                    </div>

                    {/* Main Frame Wrapper */}
                    <div className="relative z-10 w-full max-w-[480px] group">
                        {/* Perfect Solid Notched SVG Frame */}
                        <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 520 640" fill="none">
                            <path d="M50 2H220M300 2H480C495 2 518 25 518 50V420L460 420V600C460 625 435 638 410 638H50C25 638 2 615 2 590V50C2 25 25 2 50 2Z" stroke="white" strokeWidth="2.5" />
                            <circle cx="220" cy="2" r="4" fill="white" />
                            <circle cx="300" cy="2" r="4" fill="white" />
                        </svg>

                        {/* Image Container with precise Notched Clip Path */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl" style={{
                            clipPath: `polygon(12% 0%, 35% 0%, 35% 4%, 43% 4%, 43% 0%, 65% 0%, 100% 0%, 100% 68%, 88% 68%, 88% 76%, 80% 76%, 80% 68%, 68% 68%, 68% 100%, 0% 100%, 0% 12%)`
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                                alt="Robert Fox"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050C1C]/30 to-transparent"></div>
                        </div>

                        {/* Robert Fox Identity Card */}
                        <div className="floating-card float-element absolute -left-16 bottom-[35%] bg-white rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-30 min-w-[210px] border border-gray-100">
                            <div className="w-12 h-12 rounded-xl overflow-hidden relative shadow-inner">
                                <Image
                                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                                    alt="Robert Fox avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#050C1C] text-lg leading-none">Robert Fox</h4>
                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1.5">UX/UI Designer</p>
                            </div>
                        </div>

                        {/* Secondary Sketch Image - Precise 45-degree Notch */}
                        <div className="floating-card float-element absolute -bottom-10 -left-10 w-44 h-36 z-20 overflow-hidden shadow-2xl border-2 border-white/20" style={{
                            clipPath: `polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22%)`
                        }}>
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

            {/* Bottom Right Scroll Button */}
            <div className="absolute bottom-10 right-10 z-50">
                <Button className="w-14 h-14 bg-[#FF5C00] hover:bg-[#e65400] p-0 rounded-lg shadow-2xl transition-transform hover:-translate-y-2">
                    <ArrowUp className="h-7 w-7 text-white" />
                </Button>
            </div>
        </section>
    )
}
