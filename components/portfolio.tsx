// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ArrowUpRight } from "lucide-react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Image from "next/image"
// import CommonWrapper from "./CommonWrapper"
// import Link from "next/link"

// gsap.registerPlugin(ScrollTrigger)

// interface Project {
//     title: string
//     category: string
//     image: string
//     tags: string[]
//     highlighted?: boolean
// }

// const projects: Project[] = [
//     {
//         title: "Ecommerce app design",
//         category: "Mobile App",
//         image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "Mobile App"],
//         highlighted: true
//     },
//     {
//         title: "Travel website design",
//         category: "UI/UX Design",
//         image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "UI/UX Design"],
//         highlighted: false
//     },
//     {
//         title: "Agency website design",
//         category: "UI/UX Design",
//         image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "UI/UX Design"],
//         highlighted: false
//     },
//     {
//         title: "Aiko brand identity design",
//         category: "Branding Design",
//         image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "Branding Design"],
//         highlighted: true
//     },
//     {
//         title: "Smart watch app design",
//         category: "Mobile App",
//         image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "Mobile App"],
//         highlighted: false
//     },
//     {
//         title: "Mikoto brand identity design",
//         category: "Branding Design",
//         image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80",
//         tags: ["All", "Branding Design"],
//         highlighted: false
//     }
// ]

// const cardBgs = [
//     "#0B1224",
//     "#081021",
//     "#0C1428",
//     "#091223",
//     "#0A1326",
//     "#0D152A",
// ]

// export function Portfolio() {
//     const sectionRef = useRef<HTMLDivElement>(null)
//     const ctxRef = useRef<gsap.Context | null>(null)

//     useEffect(() => {
//         // Kill previous context cleanly before re-init
//         if (ctxRef.current) {
//             ctxRef.current.revert()
//         }

//         ctxRef.current = gsap.context(() => {
//             // Header fade-in
//             gsap.from(".portfolio-header", {
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

//             const cards = gsap.utils.toArray<HTMLElement>(".portfolio-slide")

//             cards.forEach((card, i) => {
//                 const content = card.querySelector<HTMLElement>(".slide-content")

//                 // Fade + slide content in when card enters viewport
//                 if (content) {
//                     gsap.fromTo(content,
//                         { y: 60, opacity: 0 },
//                         {
//                             y: 0,
//                             opacity: 1,
//                             duration: 0.85,
//                             ease: "power3.out",
//                             scrollTrigger: {
//                                 trigger: card,
//                                 start: "top 85%",
//                                 toggleActions: "play none none none",
//                             }
//                         }
//                     )
//                 }

//                 // Scale THIS card down as the NEXT card scrolls over it
//                 // scrub: true = perfectly tied to scroll position, zero jank/shake
//                 if (i < cards.length - 1) {
//                     const nextCard = cards[i + 1]
//                     gsap.to(card, {
//                         scale: 0.94,
//                         borderRadius: "32px",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: nextCard,
//                             start: "top bottom",  // next card enters from bottom
//                             end: "top top",       // next card fully covers this one
//                             scrub: true,          // tied to scroll — buttery smooth
//                         }
//                     })
//                 }
//             })
//         }, sectionRef)

//         return () => {
//             ctxRef.current?.revert()
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [projects])

//     return (
//         <section ref={sectionRef} className="py-24 bg-[#050b1b]">
//             <CommonWrapper>
//                 {/* Section Header */}
//                 <div className="portfolio-header mb-12">
//                     <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
//                         <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
//                         Portfolio
//                     </span>
//                     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
//                         <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//                             Let&apos;s have a look at my<br />
//                             latest projects
//                         </h2>
//                     </div>
//                 </div>

//                 {/* 
//                     Pure CSS sticky stack — NO GSAP pin at all.
//                     Browser handles sticky natively = zero layout recalculation = zero shake.
//                     GSAP only handles scale + opacity animations via scrub.
//                 */}
//                 <div className="portfolio-stack relative mt-16">
//                     {projects.map((project, index) => (
//                         <div
//                             key={`${project.title}-${index}`}
//                             className="portfolio-slide"
//                             style={{
//                                 position: "sticky",
//                                 top: 0,
//                                 zIndex: index + 1,
//                                 height: "100vh",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: cardBgs[index % cardBgs.length],
//                                 borderRadius: "24px",
//                                 overflow: "hidden",
//                                 // willChange tells browser to promote to its own layer
//                                 // so transforms happen on GPU — critical for no shake
//                                 willChange: "transform, border-radius",
//                                 transformOrigin: "top center",
//                                 border: "1px solid rgba(255, 255, 255, 0.05)",
//                             }}
//                         >
//                             <div
//                                 className="slide-content grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl px-6"
//                                 style={{ opacity: 0 }}
//                             >
//                                 {/* Image */}
//                                 <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-[#FF5C00]/20">
//                                     <Image
//                                         src={project.image}
//                                         alt={project.title}
//                                         fill
//                                         className="object-cover transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
//                                 </div>

//                                 {/* Details */}
//                                 <div className="flex flex-col gap-6">
//                                     <span className="text-[#FF5C00] font-bold text-lg uppercase tracking-widest">
//                                         Project // 0{index + 1}
//                                     </span>
//                                     <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
//                                         {project.title}
//                                     </h3>
//                                     <p className="text-white/60 text-lg max-w-md">
//                                         Innovative {project.category.toLowerCase()} solution developed with technical precision and design elegance.
//                                     </p>
//                                     <div className="flex flex-wrap gap-3 mt-2">
//                                         {project.tags.map(tag => (
//                                             <span
//                                                 key={tag}
//                                                 className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/80"
//                                             >
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <Link
//                                         href="#"
//                                         className="inline-flex items-center gap-3 mt-6 text-white font-bold text-lg group/link"
//                                     >
//                                         View Case Study
//                                         <div className="w-12 h-12 rounded-full bg-white text-[#050C1C] flex items-center justify-center transition-all duration-300 group-hover/link:bg-[#FF5C00] group-hover/link:text-white group-hover/link:translate-x-2">
//                                             <ArrowUpRight className="w-6 h-6" />
//                                         </div>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </CommonWrapper>
//         </section>
//     )
// }




// 3rd bg color set another

"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import CommonWrapper from "./CommonWrapper"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

interface Project {
    title: string
    category: string
    image: string
    tags: string[]
    highlighted?: boolean
    description?: string
    url?: string
}

const projects: Project[] = [
    {
        title: "FixList \u2013 Service Marketplace Platform",
        category: "Full Stack",
        image: "/portfolio/fixlist.png",
        tags: ["React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Redux Toolkit"],
        highlighted: true,
        description: "Developed a service-based marketplace connecting users with service providers. Built user, provider, and admin dashboards covering the complete service lifecycle. Implemented booking, job tracking, and service completion workflows. Integrated payment flow triggered after successful service completion.",
        url: "https://fixlist-frontend.vercel.app/"
    },
    {
        title: "Tape \u2013 SaaS Scheduling & Content Sync Platform",
        category: "Full Stack",
        image: "/portfolio/tape.png",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "SaaS"],
        highlighted: false,
        description: "Developed a SaaS platform for profile management, scheduling, and content synchronization. Built scalable user and admin dashboards using Next.js and TypeScript. Implemented offline-first support enabling access after initial synchronization. Designed role-based UI components and optimized data fetching.",
        url: "https://lawalax.vercel.app/signin"
    },
    {
        title: "Scorells \u2013 Build Better Credit Platform",
        category: "Full Stack",
        image: "/portfolio/scorells.png",
        tags: ["React.js", "TypeScript", "Tailwind CSS", "AI"],
        highlighted: false,
        description: "Built an AI-powered credit improvement platform for individuals and businesses. Implemented credit report analysis, tailored dispute letter generation, and progress tracking. Focused on clean UX and performance-optimized interfaces.",
        url: "https://scorels-frontend.vercel.app/"
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

// const cardBgs = [
//     "#f5f5f5",
//     "#eef2ff",
//     "#fff7ed",
//     "#f0fdf4",
//     "#fdf4ff",
//     "#f0f9ff",
// ]

const cardBgs = [
    "#f5f5f5",
    "#101010",
    "#89AC9A",
    "#472132",
    "#E6DF8D",
    "#101010",
]

export function Portfolio() {
    const [activeFilter, setActiveFilter] = useState("All")
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const ctxRef = useRef<gsap.Context | null>(null)

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter))

    useEffect(() => {
        // Kill previous context cleanly before re-init
        if (ctxRef.current) {
            ctxRef.current.revert()
        }

        ctxRef.current = gsap.context(() => {
            // Header fade-in
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

            // Title color: character-by-character gray → black on scroll
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll(".portfolio-char")
                gsap.fromTo(chars,
                    { color: "#b0b0b0" },
                    {
                        color: "#050C1C",
                        duration: 0.1,
                        stagger: 2 / chars.length,
                        ease: "none",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            end: "top 30%",
                            scrub: 1,
                        },
                    }
                )
            }

            const cards = gsap.utils.toArray<HTMLElement>(".portfolio-slide")

            cards.forEach((card, i) => {
                const content = card.querySelector<HTMLElement>(".slide-content")

                // Fade + slide content in when card enters viewport
                if (content) {
                    gsap.fromTo(content,
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.85,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            }
                        }
                    )
                }

                // Scale THIS card down as the NEXT card scrolls over it
                // scrub: true = perfectly tied to scroll position, zero jank/shake
                // if (i < cards.length - 1) {
                //     const nextCard = cards[i + 1]
                //     gsap.to(card, {
                //         scale: 0.94,
                //         borderRadius: "32px",
                //         ease: "none",
                //         scrollTrigger: {
                //             trigger: nextCard,
                //             start: "top bottom",  // next card enters from bottom
                //             end: "top top",       // next card fully covers this one
                //             scrub: true,          // tied to scroll — buttery smooth
                //         }
                //     })
                // }
            })
        }, sectionRef)

        return () => {
            ctxRef.current?.revert()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredProjects])

    return (
        <section id="portfolio" ref={sectionRef} className="pt-24 bg-[#f5f5f5]">
            {/* Section Header */}
            <CommonWrapper>
                <div className="portfolio-header mb-12">
                    <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
                        <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
                        Portfolio
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] max-w-3xl tracking-tight"
                        >
                            {"Let's have a look at my latest projects".split("").map((char, i) => (
                                <span
                                    key={i}
                                    className="portfolio-char"
                                    style={{ color: "#b0b0b0", whiteSpace: char === " " ? "pre" : "normal" }}
                                >
                                    {char}
                                </span>
                            ))}
                        </h2>

                        {/* Filter Tags */}
                        {/* <div className="flex flex-wrap gap-3">
                            {filterTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
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
                        </div> */}
                    </div>
                </div>
            </CommonWrapper>

            {/* 
                    Pure CSS sticky stack — NO GSAP pin at all.
                    Browser handles sticky natively = zero layout recalculation = zero shake.
                    GSAP only handles scale + opacity animations via scrub.
                */}
            <div className="portfolio-stack relative mt-16">
                {filteredProjects.map((project, index) => (
                    <div
                        key={`${project.title}-${index}`}
                        className="portfolio-slide"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: index + 1,
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: cardBgs[index % cardBgs.length],
                            overflow: "hidden",
                            // willChange tells browser to promote to its own layer
                            // so transforms happen on GPU — critical for no shake
                            willChange: "transform, border-radius",
                            transformOrigin: "top center",
                        }}
                    >
                        <CommonWrapper>
                            <div
                                className="slide-content grid md:grid-cols-2 gap-12 items-center w-full"
                                style={{ opacity: 0 }}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-[#FF5C00]/20">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-6">
                                    <span className="text-[#FF5C00] font-bold text-lg uppercase tracking-widest">
                                        Project // 0{index + 1}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-black text-[#050C1C] leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                                        {project.description || `Innovative ${project.category.toLowerCase()} solution developed with technical precision and design elegance.`}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={project.url || "#"}
                                        target={project.url ? "_blank" : undefined}
                                        rel={project.url ? "noopener noreferrer" : undefined}
                                        className="inline-flex items-center gap-3 mt-6 text-[#050C1C] font-bold text-lg group/link"
                                    >
                                        View Project
                                        <div className="w-12 h-12 rounded-full bg-[#050C1C] text-white flex items-center justify-center transition-all duration-300 group-hover/link:bg-[#FF5C00] group-hover/link:translate-x-2">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </CommonWrapper>
                    </div>
                ))}
            </div>
        </section>
    )
}

