/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
    ArrowUpRight, Code, Monitor, Layout, Smartphone, Layers,
    Server, Database, Cpu, Zap, Lock,
    PenTool, GitBranch, Terminal, Settings, Box,
    Cloud, Globe, Rocket, Activity, Shield
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import CommonWrapper from "./CommonWrapper"
import { SectionTitle } from "./ui/section-title"

gsap.registerPlugin(ScrollTrigger)

interface TechItem {
    name: string
    icon: any
}

interface Skill {
    number: string
    title: string
    description: string
    stack: TechItem[]
}

const skills: Skill[] = [
    {
        number: "01",
        title: "Frontend Development",
        description: "Immerse your audience in seamless, visually compelling experiences.",
        stack: [
            { name: "React", icon: Code },
            { name: "Next.js", icon: Monitor },
            { name: "TypeScript", icon: Layout },
            { name: "Tailwind", icon: Smartphone },
            { name: "GSAP", icon: Layers },
            { name: "Redux", icon: Code },
        ]
    },
    {
        number: "02",
        title: "Backend Development",
        description: "Transform your online presence with thoughtfully designed websites.",
        stack: [
            { name: "Node.js", icon: Server },
            { name: "Express", icon: Zap },
            { name: "MongoDB", icon: Database },
            { name: "PostgreSQL", icon: Database },
            { name: "Prisma", icon: Cpu },
            { name: "JWT", icon: Lock },
        ]
    },
    {
        number: "03",
        title: "Tools",
        description: "Through meticulous prototyping, I provide a tangible preview of your project",
        stack: [
            { name: "Figma", icon: PenTool },
            { name: "Git", icon: GitBranch },
            { name: "Postman", icon: Terminal },
            { name: "Docker", icon: Box },
            { name: "Firebase", icon: Settings },
            { name: "Vercel", icon: Box },
        ]
    },
    {
        number: "04",
        title: "Deployment",
        description: "Whether you're establishing a new brand or revamping an existing one",
        stack: [
            { name: "AWS", icon: Cloud },
            { name: "Vercel", icon: Globe },
            { name: "Netlify", icon: Rocket },
            { name: "Railway", icon: Activity },
            { name: "DigitalOcean", icon: Shield },
            { name: "GitHub Actions", icon: GitBranch },
        ]
    }
]

export function Skills() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [marqueeVisible, setMarqueeVisible] = useState(false)

    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const floatingRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const rafRef = useRef<number | null>(null)

    const targetPos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })
    const initialized = useRef(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".skills-header", {
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

            gsap.from(".skill-row", {
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

    useEffect(() => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const loop = () => {
            currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08)
            currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08)

            if (floatingRef.current) {
                const tilt = (hoveredIndex !== null && hoveredIndex % 2 === 0) ? -10 : 10
                floatingRef.current.style.transform = `translateY(${currentPos.current.y - 60}px) rotate(${tilt}deg)`
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

        if (!initialized.current) {
            currentPos.current = { x, y }
            initialized.current = true
        }

        targetPos.current = { x, y }
    }, [])

    const handleMouseEnter = useCallback((index: number) => {
        setHoveredIndex(index)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setMarqueeVisible(true), 80)
    }, [])

    const handleMouseLeave = useCallback(() => {
        initialized.current = false
        setHoveredIndex(null)
        setMarqueeVisible(false)
        if (timerRef.current) clearTimeout(timerRef.current)
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
                <div className="skills-header">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        My Skills
                    </span>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-28">
                        <SectionTitle className="text-4xl md:text-6xl text-white">
                            Expertise <br />
                            & Tech Stack
                        </SectionTitle>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Floating Marquee */}
                    <div
                        ref={floatingRef}
                        className="absolute pointer-events-none z-20 top-0 left-[-20%] w-[140%]"
                        style={{
                            willChange: 'transform',
                        }}
                    >
                        <div
                            className="bg-white/95 backdrop-blur-xl border-y border-black/5"
                            style={{
                                width: '100%',
                                height: '120px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                opacity: marqueeVisible && hoveredIndex !== null ? 1 : 0,
                                transform: marqueeVisible && hoveredIndex !== null
                                    ? 'scale(1)'
                                    : 'scale(0.98)',
                                transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            }}
                        >
                            {hoveredIndex !== null && (
                                <div className="relative w-full overflow-hidden h-full flex items-center">
                                    <div className={cn(
                                        "flex items-center gap-24 whitespace-nowrap px-10",
                                        (hoveredIndex % 2 === 0) ? "animate-marquee-reverse" : "animate-marquee"
                                    )}>
                                        {[...skills[hoveredIndex].stack, ...skills[hoveredIndex].stack, ...skills[hoveredIndex].stack, ...skills[hoveredIndex].stack, ...skills[hoveredIndex].stack].map((item, i) => (
                                            <div key={i} className="flex items-center gap-6 shrink-0">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-[#FF5C00]">
                                                    <item.icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[#050C1C] text-lg font-bold tracking-wider uppercase">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-0 left-0 bottom-0 w-64 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10" />
                                    <div className="absolute top-0 right-0 bottom-0 w-64 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            height: '1px',
                            background: 'rgba(255,255,255,0.1)',
                            opacity: hoveredIndex === 0 ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />

                    {skills.map((skill, index) => {
                        const isHovered = hoveredIndex === index
                        const prevHovered = hoveredIndex === index - 1
                        const isLast = index === skills.length - 1

                        return (
                            <div
                                key={index}
                                className="skill-row group cursor-pointer relative"
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '12px',
                                        background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                                        transition: 'background 0.4s ease',
                                        pointerEvents: 'none',
                                        zIndex: 0,
                                    }}
                                />

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
                                                {skill.number}.
                                            </span>
                                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                                                <span
                                                    className="relative inline-block"
                                                    style={{ willChange: 'contents', transform: 'translateZ(0)' }}
                                                >
                                                    {skill.title}
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
                                                {skill.description}
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

                    <div
                        style={{
                            height: '1px',
                            background: 'rgba(255,255,255,0.1)',
                            opacity: hoveredIndex === skills.length - 1 ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </div>
            </CommonWrapper>

        </section>
    )
}
