"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Project {
    title: string
    category: string
    image: string
    tags: string[]
}

const projects: Project[] = [
    {
        title: "Ecommerce app design",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "Mobile App"]
    },
    {
        title: "Travel website design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "UI/UX Design", "Web design"]
    },
    {
        title: "Agency website design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "UI/UX Design", "Web design"]
    },
    {
        title: "Aiko brand identity design",
        category: "Branding Design",
        image: "https://images.unsplash.com/photo-1634942536846-e9863ef57f42?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "Branding design"]
    },
    {
        title: "Smart watch app design",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "Mobile App"]
    },
    {
        title: "Mikoto brand identity design",
        category: "Branding Design",
        image: "https://images.unsplash.com/photo-1636114670789-8c2d4661f25c?w=600&auto=format&fit=crop&q=60",
        tags: ["All project", "Branding design"]
    }
]

const filterTags = ["All project", "Branding design", "UI/UX Design", "Web design", "Mobile App"]

export function Portfolio() {
    const [activeFilter, setActiveFilter] = useState("All project")
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            gsap.from(".portfolio-card", {
                scrollTrigger: {
                    trigger: ".portfolio-grid",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const filteredProjects = activeFilter === "All project"
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter))

    return (
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="portfolio-header mb-12">
                    <span className="text-[#FF5C00] text-sm font-medium flex items-center gap-2 mb-4">
                        <span className="w-6 h-[2px] bg-[#FF5C00]"></span>
                        My portfolio
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight">
                            Let's have a look at my<br />
                            latest projects
                        </h2>

                        {/* Filter Tags */}
                        <div className="flex flex-wrap gap-3">
                            {filterTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    className={`
                                        px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                                        ${activeFilter === tag
                                            ? 'bg-[#FF5C00] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="portfolio-card group cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Orange Circle Overlay on Hover */}
                                <div className={`
                                    absolute inset-0 flex items-center justify-center
                                    transition-all duration-300
                                    ${hoveredIndex === index ? 'bg-black/20' : 'bg-transparent'}
                                `}>
                                    <div className={`
                                        w-16 h-16 rounded-full bg-[#FF5C00] flex items-center justify-center
                                        transition-all duration-300
                                        ${hoveredIndex === index
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-75'}
                                    `}>
                                        <ArrowUpRight className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`
                                        text-xl font-bold transition-colors duration-300
                                        ${hoveredIndex === index ? 'text-[#FF5C00]' : 'text-[#050C1C]'}
                                    `}>
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {project.category}
                                    </p>
                                </div>
                                <button className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                                    ${hoveredIndex === index
                                        ? 'border-[#FF5C00] text-[#FF5C00]'
                                        : 'border-gray-300 text-gray-400'}
                                `}>
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
