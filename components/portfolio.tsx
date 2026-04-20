"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import CommonWrapper from "./CommonWrapper"

gsap.registerPlugin(ScrollTrigger)

interface Project {
    title: string
    category: string
    image: string
    tags: string[]
    highlighted?: boolean
}

const projects: Project[] = [
    {
        title: "Ecommerce app design",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "Mobile App"],
        highlighted: true
    },
    {
        title: "Travel website design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "UI/UX Design"],
        highlighted: false
    },
    {
        title: "Agency website design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "UI/UX Design"],
        highlighted: false
    },
    {
        title: "Aiko brand identity design",
        category: "Branding Design",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "Branding Design"],
        highlighted: true
    },
    {
        title: "Smart watch app design",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "Mobile App"],
        highlighted: false
    },
    {
        title: "Mikoto brand identity design",
        category: "Branding Design",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80",
        tags: ["All", "Branding Design"],
        highlighted: false
    }
]

const filterTags = ["All", "Branding Design", "UI/UX Design", "Mobile App"]

export function Portfolio() {
    const [activeFilter, setActiveFilter] = useState("All")
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter))

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".portfolio-header", {
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

            // Stacking Logic
            const slides = gsap.utils.toArray(".portfolio-slide")
            slides.forEach((slide: any, i: number) => {
                ScrollTrigger.create({
                    trigger: slide,
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    id: `slide-${i}`,
                    onEnter: () => {
                        gsap.fromTo(slide.querySelector(".slide-content"),
                            { y: 60, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
                        )
                    }
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [filteredProjects]) // Refresh triggers when projects are filtered

    const handleFilterChange = (tag: string) => {
        setActiveFilter(tag)
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 100)
    }

    return (
        <section ref={sectionRef} className="py-24 bg-[#f5f5f5]">
            <CommonWrapper>
                {/* Section Header */}
                <div className="portfolio-header mb-12">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        Portfolio
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight">
                            Let&apos;s have a look at my<br />
                            latest projects
                        </h2>

                        {/* Filter Tags */}
                        <div className="flex flex-wrap gap-3">
                            {filterTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleFilterChange(tag)}
                                    className={`
                                        px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300
                                        ${activeFilter === tag
                                            ? 'bg-[#050C1C] text-white border-[#050C1C]'
                                            : 'bg-transparent text-[#050C1C] border-[#050C1C] hover:bg-[#050C1C] hover:text-white'}
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Stack */}
                <div className="portfolio-stack relative mt-16">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className={`
                                portfolio-slide h-screen w-full flex items-center justify-center sticky top-0
                                ${index % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-[#e9e9e9]'}
                            `}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="slide-content grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl px-6">
                                {/* Image Column */}
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-[#FF5C00]/20">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>

                                {/* Details Column */}
                                <div className="flex flex-col gap-6">
                                    <span className="text-[#FF5C00] font-bold text-lg uppercase tracking-widest">
                                        Project // 0{index + 1}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-black text-[#050C1C] leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-lg max-w-md">
                                        Innovative {project.category.toLowerCase()} solution developed with technical precision and design elegance.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href="#" className="inline-flex items-center gap-3 mt-6 text-[#050C1C] font-bold text-lg group/link">
                                        View Case Study
                                        <div className="w-12 h-12 rounded-full bg-[#050C1C] text-white flex items-center justify-center transition-all duration-300 group-hover/link:bg-[#FF5C00] group-hover/link:translate-x-2">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CommonWrapper>
        </section>
    )
}

import Link from "next/link"
