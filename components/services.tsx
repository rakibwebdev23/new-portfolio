"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Service {
    number: string
    title: string
    description: string
    image: string
}

const services: Service[] = [
    {
        number: "01",
        title: "UI/UX design",
        description: "Immerse your audience in seamless, visually compelling experiences.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "02",
        title: "Web design",
        description: "Captivate your audience with stunning digital presence with the best practices.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "03",
        title: "Prototyping",
        description: "Through meticulous prototyping, I provide a tangible preview of your project.",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "04",
        title: "Branding design",
        description: "Whether you are building a new brand or revitalizing an existing one.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "05",
        title: "App design",
        description: "I will create an intuitive mobile app to streamline your business.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=60"
    }
]

export function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header on scroll
            gsap.from(".services-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })

            // Animate service rows on scroll
            gsap.from(".service-row", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out"
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        }
    }

    return (
        <section ref={sectionRef} className="py-24 bg-[#050C1C] relative overflow-hidden">
            {/* Background topographic lines */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="500" cy="400" rx="400" ry="350" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <ellipse cx="500" cy="400" rx="340" ry="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
                    <ellipse cx="500" cy="400" rx="280" ry="250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="services-header grid md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <span className="text-[#FF5C00] text-sm font-medium flex items-center gap-2 mb-4">
                            <span className="w-6 h-[2px] bg-[#FF5C00]"></span>
                            My services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Innovative design services<br />
                            for your unique vision
                        </h2>
                    </div>
                    <div className="flex items-end">
                        <p className="text-white/60 text-lg max-w-md">
                            Welcome to the heart of innovation, where design meets purpose. At Folxo, I offer a range of specialized services crafted to enhance your digital presence and elevate your brand.
                        </p>
                    </div>
                </div>

                {/* Services List */}
                <div
                    ref={containerRef}
                    className="relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Floating Image - appears on hover */}
                    <div
                        className="absolute pointer-events-none z-20 transition-opacity duration-300"
                        style={{
                            left: mousePosition.x - 150,
                            top: mousePosition.y - 120,
                            opacity: hoveredIndex !== null ? 1 : 0,
                            transform: `translate(0, 0) rotate(-5deg)`,
                        }}
                    >
                        {hoveredIndex !== null && (
                            <div className="w-[300px] h-[240px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={services[hoveredIndex].image}
                                    alt={services[hoveredIndex].title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-row group cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <div className={`
                                border-t border-white/10 py-8 
                                transition-all duration-300 
                                ${hoveredIndex === index ? 'bg-white/5' : ''}
                            `}>
                                <div className="flex items-center justify-between">
                                    {/* Left: Number and Title */}
                                    <div className="flex items-center gap-8">
                                        <span className="text-white/30 text-xl font-medium w-12">
                                            {service.number}.
                                        </span>
                                        <h3 className={`
                                            text-2xl md:text-3xl font-bold transition-colors duration-300
                                            ${hoveredIndex === index ? 'text-white' : 'text-white'}
                                        `}>
                                            <span className="relative">
                                                {service.title}
                                                {/* Orange underline on hover */}
                                                <span className={`
                                                    absolute -bottom-1 left-0 h-0.5 bg-[#FF5C00] transition-all duration-300
                                                    ${hoveredIndex === index ? 'w-full' : 'w-0'}
                                                `}></span>
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Right: Description and Arrow */}
                                    <div className="hidden md:flex items-center gap-8">
                                        <p className="text-white/50 max-w-xs text-sm">
                                            {service.description}
                                        </p>
                                        <button className={`
                                            w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                            ${hoveredIndex === index
                                                ? 'bg-[#FF5C00] border-[#FF5C00] text-white'
                                                : 'border-white/20 text-white hover:border-white/40'}
                                        `}>
                                            <ArrowUpRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bottom border */}
                    <div className="border-t border-white/10"></div>
                </div>
            </div>
        </section>
    )
}
