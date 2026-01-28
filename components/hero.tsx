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
        <section ref={containerRef} className="min-h-screen pt-24 md:pt-0 flex flex-col justify-center relative overflow-hidden bg-background">
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

                {/* Right Image */}
                <div className="hero-image relative flex justify-center md:justify-end mt-10 md:mt-0">
                    {/* Abstract Pattern */}
                    <div className="absolute top-10 right-10 w-full h-full md:w-[500px] md:h-[500px] opacity-20">
                        <div className="flex gap-4 flex-wrap justify-end">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-primary rounded-full"></div>
                            ))}
                        </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative z-10 w-full max-w-[400px] aspect-[4/5] bg-zinc-800/0 overflow-hidden">
                        <div className="w-full h-full bg-yellow-500 rounded-t-[200px] relative overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
                                alt="MD Rakib Hasan"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Strip */}
            {/* <div className="w-full border-t border-white/5 bg-background/50 backdrop-blur-sm z-20">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <h3 className="text-2xl font-serif font-bold text-white">Kagont</h3>
                        <h3 className="text-2xl font-serif font-bold text-white">katerio</h3>
                        <h3 className="text-2xl font-serif font-bold text-white">Alregky</h3>
                        <h3 className="text-2xl font-serif font-bold text-white">Opilgo</h3>
                        <h3 className="text-2xl font-serif font-bold text-white">Kagont</h3>
                    </div>
                </div>
            </div> */}
        </section>
    )
}
