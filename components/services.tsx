"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Layers, Monitor, Play } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const services = [
    {
        icon: Layers,
        title: "UX/UI And Product Design",
        description: "Creating intuitive and visually stunning user interfaces"
    },
    {
        icon: Monitor,
        title: "Website Design And Developments",
        description: "Building responsive and high-performance web applications"
    },
    {
        icon: Play,
        title: "Motion Graphics And Animations",
        description: "Bringing designs to life with smooth animations"
    }
]

export function Services() {
    const sectionRef = useRef<HTMLElement>(null)
    const leftContentRef = useRef<HTMLDivElement>(null)
    const rightContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Left Content
            gsap.from(leftContentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })

            // Animate Right Content (Service Cards)
            const cards = rightContentRef.current?.children
            if (cards) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    },
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left Content */}
                    <div ref={leftContentRef} className="space-y-6">
                        <span className="text-sm text-zinc-500 tracking-wider">- SERVICES</span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Best Services I<br />Offer!
                        </h2>

                        <p className="text-zinc-400 max-w-md leading-relaxed">
                            Hi, this is MD Rakib Hasan having 4+ years of experience in the web design and
                            development field. Love to develop your business in reality by providing high-quality
                            service from my end.
                        </p>

                        <div className="flex items-center gap-6 pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 font-semibold">
                                ✦ Hire Me
                            </Button>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <span>Or,</span>
                                <span className="text-zinc-400">Mail:</span>
                                <a href="mailto:rh.rakibhasan365@gmail.com" className="text-white hover:text-primary transition-colors">
                                    rh.rakibhasan365@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Service Cards */}
                    <div ref={rightContentRef} className="space-y-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group flex items-start gap-6 pb-8 border-b border-white/10 last:border-b-0"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-lg border border-white/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <service.icon className="w-6 h-6" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-3">
                                    <h3 className="text-2xl md:text-3xl font-serif text-white/80 group-hover:text-white transition-colors">
                                        {service.title}
                                    </h3>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-sm"
                                    >
                                        Read More <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
