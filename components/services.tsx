"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import CommonWrapper from "./CommonWrapper"

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
        title: "Frontend Development",
        description: "Immerse your audience in seamless, visually compelling experiences.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "02",
        title: "Backend Development",
        description: "Transform your online presence with thoughtfully designed websites.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "03",
        title: "Tools",
        description: "Through meticulous prototyping, I provide a tangible preview of your project",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60"
    },
    {
        number: "04",
        title: "Deployment",
        description: "Whether you're establishing a new brand or revamping an existing one",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60"
    }
]

export function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [imageVisible, setImageVisible] = useState(false)
    const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const rafRef = useRef<number | null>(null)

    // Raw target mouse position (updated instantly on mousemove)
    const targetPos = useRef({ x: 0, y: 0 })
    // Current smoothed position (lerped every frame)
    const currentPos = useRef({ x: 0, y: 0 })
    // Whether we've received the first mouse position for this hover session
    const initialized = useRef(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
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

    // Single persistent RAF loop — runs always, lerps toward target
    useEffect(() => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const loop = () => {
            currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08)
            currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08)

            if (imageRef.current) {
                imageRef.current.style.transform = `translate(${currentPos.current.x - 150}px, ${currentPos.current.y - 120}px) rotate(-5deg)`
            }

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // On first move after entering, snap current to target to avoid sliding in from 0,0
        if (!initialized.current) {
            currentPos.current = { x, y }
            initialized.current = true
        }

        targetPos.current = { x, y }
    }, [])

    const handleMouseEnter = useCallback((index: number) => {
        setHoveredIndex(index)
        if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
        imageTimerRef.current = setTimeout(() => setImageVisible(true), 80)
    }, [])

    const handleMouseLeave = useCallback(() => {
        initialized.current = false
        setHoveredIndex(null)
        setImageVisible(false)
        if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-[#050C1C] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-[500px] h-full opacity-25 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 500 800" fill="none">
                    {[100, 160, 220, 280, 340, 400, 460].map((r) => (
                        <circle
                            key={r}
                            cx="500"
                            cy="400"
                            r={r}
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1"
                            fill="none"
                        />
                    ))}
                </svg>
            </div>

            <CommonWrapper>
                <div className="services-header ">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        My Skills
                    </span>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-28">

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            My Skills <br />
                            & Tech Stack
                        </h2>
                        {/* <div className="flex items-end">
                            <p className="text-white/60 text-base max-w-md leading-relaxed">
                                Welcome to the heart of innovation, where design meets purpose.
                            </p>
                        </div> */}
                    </div>

                </div>

                <div
                    ref={containerRef}
                    className="relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Floating image — uses transform only, no left/top, for GPU compositing */}
                    <div
                        ref={imageRef}
                        className="absolute pointer-events-none z-20 top-0 left-0"
                        style={{
                            willChange: 'transform',
                            // opacity and scale handled separately for enter/exit feel
                        }}
                    >
                        <div
                            style={{
                                width: '350px',
                                height: '440px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                                position: 'relative',
                                opacity: imageVisible && hoveredIndex !== null ? 1 : 0,
                                transform: imageVisible && hoveredIndex !== null
                                    ? 'scale(1)'
                                    : 'scale(0.88)',
                                transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                        >
                            {hoveredIndex !== null && (
                                <Image
                                    src={services[hoveredIndex].image}
                                    alt={services[hoveredIndex].title}
                                    fill
                                    className="object-cover"
                                    style={{
                                        opacity: imageLoaded[hoveredIndex] ? 1 : 0,
                                        transition: 'opacity 0.35s ease',
                                    }}
                                    onLoad={() =>
                                        setImageLoaded(prev => ({ ...prev, [hoveredIndex!]: true }))
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* Top border — fades when first row hovered */}
                    <div
                        style={{
                            height: '1px',
                            background: 'rgba(255,255,255,0.1)',
                            opacity: hoveredIndex === 0 ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />

                    {services.map((service, index) => {
                        const isHovered = hoveredIndex === index
                        const prevHovered = hoveredIndex === index - 1
                        const isLast = index === services.length - 1

                        return (
                            <div
                                key={index}
                                className="service-row group cursor-pointer relative"
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                {/* Hover background */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '12px',
                                        background: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        transition: 'background 0.4s ease',
                                        pointerEvents: 'none',
                                        zIndex: 0,
                                    }}
                                />

                                {/* Row divider */}
                                <div
                                    style={{
                                        height: '1px',
                                        background: 'rgba(255,255,255,0.1)',
                                        opacity: isHovered || prevHovered ? 0 : 1,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />

                                <div className="relative z-10 py-8 md:py-20 px-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <span
                                                className="text-xl md:text-[44px] font-medium w-12 shrink-0"
                                                style={{
                                                    color: isHovered ? 'rgba(255,92,0,0.7)' : 'rgba(255,255,255,0.3)',
                                                    transition: 'color 0.35s ease',
                                                }}
                                            >
                                                {service.number}.
                                            </span>
                                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                                                <span
                                                    className="relative inline-block"
                                                    style={{ willChange: 'contents', transform: 'translateZ(0)' }}
                                                >
                                                    {service.title}
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: '-4px',
                                                            left: 0,
                                                            height: '2px',
                                                            backgroundColor: '#FF5C00',
                                                            width: isHovered ? '100%' : '0%',
                                                            transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: '-10px',
                                                            left: 0,
                                                            height: '2px',
                                                            backgroundColor: '#FF5C00',
                                                            opacity: 0.45,
                                                            width: isHovered ? '100%' : '0%',
                                                            transition: 'width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s',
                                                        }}
                                                    />
                                                </span>
                                            </h3>
                                        </div>

                                        <div className="hidden md:flex items-center gap-8">
                                            <p
                                                className="max-w-xs text-sm leading-relaxed"
                                                style={{
                                                    color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
                                                    transition: 'color 0.35s ease',
                                                }}
                                            >
                                                {service.description}
                                            </p>

                                            <div
                                                className="w-14 h-14 md:w-20 md:h-20 rounded-full shrink-0 relative overflow-hidden"
                                                style={{
                                                    border: '2px solid',
                                                    borderColor: isHovered ? '#FF5C00' : 'rgba(255,255,255,0.2)',
                                                    transition: 'border-color 0.35s ease',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        borderRadius: '9999px',
                                                        background: '#FF5C00',
                                                        transform: isHovered ? 'scale(1)' : 'scale(0)',
                                                        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                        transformOrigin: 'center',
                                                    }}
                                                />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center text-white"
                                                    style={{
                                                        transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.35s ease',
                                                    }}
                                                >
                                                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isLast && (
                                    <div
                                        style={{
                                            height: '1px',
                                            background: 'rgba(255,255,255,0.1)',
                                            opacity: isHovered ? 0 : 1,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    />
                                )}
                            </div>
                        )
                    })}

                    {/* Bottom border — fades when last row hovered */}
                    <div
                        style={{
                            height: '1px',
                            background: 'rgba(255,255,255,0.1)',
                            opacity: hoveredIndex === services.length - 1 ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </div>
            </CommonWrapper>
        </section>
    )
}




// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ArrowUpRight } from "lucide-react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Image from "next/image"
// import CommonWrapper from "./CommonWrapper"

// gsap.registerPlugin(ScrollTrigger)

// interface Service {
//     number: string
//     title: string
//     description: string
//     image: string
// }

// const services: Service[] = [
//     {
//         number: "01",
//         title: "UI/UX design",
//         description: "Immerse your audience in seamless, visually compelling experiences.",
//         image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "02",
//         title: "Web design",
//         description: "Transform your online presence with thoughtfully designed websites.",
//         image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "03",
//         title: "Prototyping",
//         description: "Through meticulous prototyping, I provide a tangible preview of your project",
//         image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "04",
//         title: "Branding design",
//         description: "Whether you're establishing a new brand or revamping an existing one",
//         image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "05",
//         title: "App design",
//         description: "I will create an intuitive mobile app to streamline your business operations",
//         image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=60"
//     }
// ]

// export function Services() {
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//     const sectionRef = useRef<HTMLDivElement>(null)
//     const containerRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             gsap.from(".services-header", {
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top 80%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 50,
//                 opacity: 0,
//                 duration: 0.8,
//                 ease: "power3.out"
//             })

//             gsap.from(".service-row", {
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top 70%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 30,
//                 opacity: 0,
//                 duration: 0.6,
//                 stagger: 0.15,
//                 ease: "power3.out"
//             })
//         }, sectionRef)

//         return () => ctx.revert()
//     }, [])

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (containerRef.current) {
//             const rect = containerRef.current.getBoundingClientRect()
//             setMousePosition({
//                 x: e.clientX - rect.left,
//                 y: e.clientY - rect.top
//             })
//         }
//     }

//     return (
//         <section ref={sectionRef} className="py-24 bg-[#050C1C] relative overflow-hidden">
//             {/* Background topographic concentric arcs - right side */}
//             <div className="absolute right-0 top-0 w-[500px] h-full opacity-25 pointer-events-none">
//                 <svg className="w-full h-full" viewBox="0 0 500 800" fill="none">
//                     {[100, 160, 220, 280, 340, 400, 460].map((r) => (
//                         <circle key={r} cx="500" cy="400" r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
//                     ))}
//                 </svg>
//             </div>

//             <CommonWrapper>
//                 {/* Section Header — 2-column */}
//                 <div className="services-header grid md:grid-cols-2 gap-8 mb-16">
//                     <div>
//                         <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
//                             <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
//                             My services
//                         </span>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//                             Innovative design services<br />
//                             for your unique vision
//                         </h2>
//                     </div>
//                     <div className="flex items-end">
//                         <p className="text-white/60 text-base max-w-md leading-relaxed">
//                             Welcome to the heart of innovation, where design meets purpose.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Services List */}
//                 <div
//                     ref={containerRef}
//                     className="relative"
//                     onMouseMove={handleMouseMove}
//                     onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                     {/* Floating image on hover */}
//                     <div
//                         className="absolute pointer-events-none z-20 transition-opacity duration-300"
//                         style={{
//                             left: mousePosition.x - 150,
//                             top: mousePosition.y - 120,
//                             opacity: hoveredIndex !== null ? 1 : 0,
//                         }}
//                     >
//                         {hoveredIndex !== null && (
//                             <div className="w-[300px] h-[240px] rounded-2xl overflow-hidden shadow-2xl" style={{ transform: "rotate(-5deg)" }}>
//                                 <Image
//                                     src={services[hoveredIndex].image}
//                                     alt={services[hoveredIndex].title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {services.map((service, index) => (
//                         <div
//                             key={index}
//                             className="service-row group cursor-pointer"
//                             onMouseEnter={() => setHoveredIndex(index)}
//                         >
//                             <div className={`
//                                 border-t border-white/10 py-8 px-4
//                                 transition-all duration-300
//                                 ${hoveredIndex === index ? 'bg-white/5 rounded-xl' : ''}
//                             `}>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-8">
//                                         <span className="text-white/30 text-xl font-medium w-12 shrink-0">
//                                             {service.number}.
//                                         </span>
//                                         <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//                                             <span
//                                                 className="relative inline-block"
//                                                 style={{ willChange: 'contents', transform: 'translateZ(0)' }}
//                                             >
//                                                 {service.title}
//                                                 {/* First border line */}
//                                                 <span className={`
//                                                     absolute -bottom-1 left-0 h-[2px] bg-[#FF5C00]
//                                                     transition-all duration-300
//                                                     ${hoveredIndex === index ? 'w-full' : 'w-0'}
//                                                 `} />
//                                                 {/* Second border line */}
//                                                 <span className={`
//                                                     absolute -bottom-[10px] left-0 h-[2px] bg-[#FF5C00]
//                                                     transition-all duration-[350ms] delay-[40ms] opacity-50
//                                                     ${hoveredIndex === index ? 'w-full' : 'w-0'}
//                                                 `} />
//                                             </span>
//                                         </h3>
//                                     </div>

//                                     <div className="hidden md:flex items-center gap-8">
//                                         <p className="text-white/50 max-w-xs text-sm leading-relaxed">
//                                             {service.description}
//                                         </p>
//                                         <div className={`
//                                             w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300
//                                             ${hoveredIndex === index
//                                                 ? 'bg-[#FF5C00] border-[#FF5C00] text-white'
//                                                 : 'border-white/20 text-white hover:border-white/50'}
//                                         `}>
//                                             <ArrowUpRight className="w-5 h-5" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="border-t border-white/10"></div>
//                 </div>
//             </CommonWrapper>
//         </section>
//     )
// }










// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ArrowUpRight } from "lucide-react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Image from "next/image"
// import CommonWrapper from "./CommonWrapper"

// gsap.registerPlugin(ScrollTrigger)

// interface Service {
//     number: string
//     title: string
//     description: string
//     image: string
// }

// const services: Service[] = [
//     {
//         number: "01",
//         title: "UI/UX design",
//         description: "Immerse your audience in seamless, visually compelling experiences.",
//         image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "02",
//         title: "Web design",
//         description: "Transform your online presence with thoughtfully designed websites.",
//         image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "03",
//         title: "Prototyping",
//         description: "Through meticulous prototyping, I provide a tangible preview of your project",
//         image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "04",
//         title: "Branding design",
//         description: "Whether you're establishing a new brand or revamping an existing one",
//         image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60"
//     },
//     {
//         number: "05",
//         title: "App design",
//         description: "I will create an intuitive mobile app to streamline your business operations",
//         image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=60"
//     }
// ]

// export function Services() {
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//     const sectionRef = useRef<HTMLDivElement>(null)
//     const containerRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             gsap.from(".services-header", {
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top 80%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 50,
//                 opacity: 0,
//                 duration: 0.8,
//                 ease: "power3.out"
//             })

//             gsap.from(".service-row", {
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top 70%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 30,
//                 opacity: 0,
//                 duration: 0.6,
//                 stagger: 0.15,
//                 ease: "power3.out"
//             })
//         }, sectionRef)

//         return () => ctx.revert()
//     }, [])

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (containerRef.current) {
//             const rect = containerRef.current.getBoundingClientRect()
//             setMousePosition({
//                 x: e.clientX - rect.left,
//                 y: e.clientY - rect.top
//             })
//         }
//     }

//     return (
//         <section ref={sectionRef} className="py-24 bg-[#050C1C] relative overflow-hidden">
//             {/* Background topographic concentric arcs - right side */}
//             <div className="absolute right-0 top-0 w-[500px] h-full opacity-25 pointer-events-none">
//                 <svg className="w-full h-full" viewBox="0 0 500 800" fill="none">
//                     {[100, 160, 220, 280, 340, 400, 460].map((r) => (
//                         <circle key={r} cx="500" cy="400" r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
//                     ))}
//                 </svg>
//             </div>

//             <CommonWrapper>
//                 {/* Section Header — 2-column */}
//                 <div className="services-header grid md:grid-cols-2 gap-8 mb-16">
//                     <div>
//                         <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
//                             <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
//                             My services
//                         </span>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//                             Innovative design services<br />
//                             for your unique vision
//                         </h2>
//                     </div>
//                     <div className="flex items-end">
//                         <p className="text-white/60 text-base max-w-md leading-relaxed">
//                             Welcome to the heart of innovation, where design meets purpose.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Services List */}
//                 <div
//                     ref={containerRef}
//                     className="relative"
//                     onMouseMove={handleMouseMove}
//                     onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                     {/* Floating image on hover */}
//                     <div
//                         className="absolute pointer-events-none z-20 transition-opacity duration-300"
//                         style={{
//                             left: mousePosition.x - 150,
//                             top: mousePosition.y - 120,
//                             opacity: hoveredIndex !== null ? 1 : 0,
//                         }}
//                     >
//                         {hoveredIndex !== null && (
//                             <div className="w-[300px] h-[240px] rounded-2xl overflow-hidden shadow-2xl" style={{ transform: "rotate(-5deg)" }}>
//                                 <Image
//                                     src={services[hoveredIndex].image}
//                                     alt={services[hoveredIndex].title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {services.map((service, index) => (
//                         <div
//                             key={index}
//                             className="service-row group cursor-pointer"
//                             onMouseEnter={() => setHoveredIndex(index)}
//                         >
//                             <div className={`
//                                 border-t border-white/10 py-8 px-4
//                                 transition-all duration-300
//                                 ${hoveredIndex === index ? 'bg-white/5 rounded-xl' : ''}
//                             `}>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-8">
//                                         <span className="text-white/30 text-xl font-medium w-12 shrink-0">
//                                             {service.number}.
//                                         </span>
//                                         <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//                                             <span className="relative">
//                                                 {service.title}
//                                                 <span className={`
//                                                     absolute -bottom-1 left-0 h-[2px] bg-[#FF5C00] transition-all duration-300
//                                                     ${hoveredIndex === index ? 'w-full' : 'w-0'}
//                                                 `}></span>
//                                             </span>
//                                         </h3>
//                                     </div>

//                                     <div className="hidden md:flex items-center gap-8">
//                                         <p className="text-white/50 max-w-xs text-sm leading-relaxed">
//                                             {service.description}
//                                         </p>
//                                         <div className={`
//                                             w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300
//                                             ${hoveredIndex === index
//                                                 ? 'bg-[#FF5C00] border-[#FF5C00] text-white'
//                                                 : 'border-white/20 text-white hover:border-white/50'}
//                                         `}>
//                                             <ArrowUpRight className="w-5 h-5" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="border-t border-white/10"></div>
//                 </div>
//             </CommonWrapper>
//         </section>
//     )
// }
