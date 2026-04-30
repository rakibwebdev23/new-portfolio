import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
// import { BrandStrip } from "@/components/brand-strip";
import { AboutMe } from "@/components/about-me";
// import { Skills } from "@/components/skills";
import { Portfolio } from "@/components/portfolio";
// import { Testimonial } from "@/components/testimonial";
// import { MarqueeText } from "@/components/marquee-text";
import { Footer } from "@/components/footer";
import Skill from "@/components/skill";
import ContactPage from "./contact/page";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            {/* <BrandStrip /> */}
            <AboutMe />
            <Skill />
            {/* <Skills /> */}
            <Portfolio />
            <div id="contact">
                <ContactPage />
            </div>
            {/* <Testimonial /> */}
            {/* <MarqueeText /> */}
            <Footer />
        </main>
    );
}



// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ArrowUpRight } from "lucide-react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Image from "next/image"
// import CommonWrapper from "./CommonWrapper"

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

// const filterTags = ["All", "Branding Design", "UI/UX Design", "Mobile App"]

// export function Portfolio() {
//     const [activeFilter, setActiveFilter] = useState("All")
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
//     const sectionRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const ctx = gsap.context(() => {
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

//             gsap.from(".portfolio-card", {
//                 scrollTrigger: {
//                     trigger: ".portfolio-grid",
//                     start: "top 75%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 40,
//                 opacity: 0,
//                 duration: 0.6,
//                 stagger: 0.1,
//                 ease: "power3.out"
//             })
//         }, sectionRef)

//         return () => ctx.revert()
//     }, [])

//     const filteredProjects = activeFilter === "All"
//         ? projects
//         : projects.filter(p => p.tags.includes(activeFilter))

//     return (
//         <section ref={sectionRef} className="py-24 bg-[#f5f5f5]">
//             <CommonWrapper>
//                 {/* Section Header */}
//                 <div className="portfolio-header mb-12">
//                     <span className="text-[#FF5C00] text-sm font-semibold flex items-center gap-3 mb-5">
//                         <span className="w-8 h-[2px] bg-[#FF5C00] inline-block"></span>
//                         Portfolio
//                     </span>
//                     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
//                         <h2 className="text-4xl md:text-5xl font-bold text-[#050C1C] leading-tight">
//                             Let&apos;s have a look at my<br />
//                             latest projects
//                         </h2>

//                         {/* Filter Tags */}
//                         <div className="flex flex-wrap gap-3">
//                             {filterTags.map((tag) => (
//                                 <button
//                                     key={tag}
//                                     onClick={() => setActiveFilter(tag)}
//                                     className={`
//                                         px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300
//                                         ${activeFilter === tag
//                                             ? 'bg-[#050C1C] text-white border-[#050C1C]'
//                                             : 'bg-transparent text-[#050C1C] border-[#050C1C] hover:bg-[#050C1C] hover:text-white'}
//                                     `}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Projects Grid */}
//                 <div className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {filteredProjects.map((project, index) => (
//                         <div
//                             key={`${project.title}-${index}`}
//                             className="portfolio-card group cursor-pointer"
//                             onMouseEnter={() => setHoveredIndex(index)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                         >
//                             {/* Image Container */}
//                             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
//                                 <Image
//                                     src={project.image}
//                                     alt={project.title}
//                                     fill
//                                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                                 />

//                                 {/* Orange circle on hover */}
//                                 <div className={`
//                                     absolute inset-0 flex items-center justify-center
//                                     transition-all duration-300
//                                     ${hoveredIndex === index ? 'bg-black/20' : 'bg-transparent'}
//                                 `}>
//                                     <div className={`
//                                         w-16 h-16 rounded-full bg-[#FF5C00] flex items-center justify-center
//                                         transition-all duration-300
//                                         ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
//                                     `}>
//                                         <ArrowUpRight className="w-6 h-6 text-white" />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Project Info */}
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h3 className={`
//                                         text-xl font-bold transition-colors duration-300
//                                         ${(hoveredIndex === index || project.highlighted) ? 'text-[#FF5C00]' : 'text-[#050C1C]'}
//                                     `}>
//                                         {project.title}
//                                     </h3>
//                                     <p className="text-gray-500 text-sm mt-1">
//                                         {project.category}
//                                     </p>
//                                 </div>
//                                 <div className={`
//                                     w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0
//                                     ${hoveredIndex === index
//                                         ? 'border-[#FF5C00] text-[#FF5C00]'
//                                         : 'border-gray-300 text-gray-400'}
//                                 `}>
//                                     <ArrowUpRight className="w-4 h-4" />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </CommonWrapper>
//         </section>
//     )
// }

