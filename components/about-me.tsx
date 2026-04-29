"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

// ── Data ───────────────────────────────────────────────────────────────────
const floatingImages = [
    {
        src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60",
        alt: "UI/UX Design work",
        spreadX: "-35vw",
        spreadY: "-30vh",
        rotation: -12,
        width: "360px",
        height: "440px",
    },
    {
        src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60",
        alt: "Branding design work",
        spreadX: "35vw",
        spreadY: "-32vh",
        rotation: 15,
        width: "340px",
        height: "400px",
    },
    {
        src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60",
        alt: "Web design work",
        spreadX: "-38vw",
        spreadY: "32vh",
        rotation: -8,
        width: "420px",
        height: "280px",
    },
    {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=60",
        alt: "App design work",
        spreadX: "35vw",
        spreadY: "30vh",
        rotation: 18,
        width: "320px",
        height: "380px",
    },
]

const education = [
    {
        degree: "B.Sc in Computer Science & Engineering",
        institution: "Green University of Bangladesh",
        year: "2020–2024",
    },
    {
        degree: "HSC in Science",
        institution: "Dhaka City College",
        year: "2018–2020",
    },
    {
        degree: "Certification in MERN Stack Development",
        institution: "Programming Hero",
        year: "2022",
    },
]

const experience = [
    {
        role: "Frontend Developer",
        company: "Softvence Agency, Dhaka",
        year: "2025–Present",
    },
    {
        role: "Junior Frontend Developer",
        company: "Freelance / Remote",
        year: "2023–2025",
    },
    {
        role: "Intern – Web Development",
        company: "Tech Startup, Dhaka",
        year: "2022",
    },
]

const clients = [
    "Softvence Agency",
    "Dream Keeper",
    "SaaS Startups",
    "E-Commerce Brands",
    "Creative Studios",
    "Digital Agencies",
]

// ── Component ──────────────────────────────────────────────────────────────
export function AboutMe() {
    const componentRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)
    const imgRefs = useRef<(HTMLDivElement | null)[]>([])
    const headlineRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    const infoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial setting for the messy pile of images
            // Give them some random rotations so it looks like a pile
            imgRefs.current.forEach((el, i) => {
                if (!el) return
                gsap.set(el, {
                    xPercent: -50,
                    yPercent: -50,
                    rotation: gsap.utils.random(-25, 25),
                    scale: 1.5,
                })
            })

            // Fix the GSAP transform overwriting translate(-50%, -50%) for the profile image
            gsap.set(profileRef.current, {
                xPercent: -50,
                yPercent: -50,
            })

            // SCROLL TRIGGER TIMELINE FOR HERO
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                }
            })

            // Phase 1: Spread out the images and reveal headline
            // The headline starts invisible and moves up
            tl.fromTo(headlineRef.current,
                { opacity: 0, y: 100, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" },
                0
            )

            // Images spread outwards
            imgRefs.current.forEach((el, i) => {
                if (!el) return
                tl.to(el, {
                    x: floatingImages[i].spreadX,
                    y: floatingImages[i].spreadY,
                    rotation: floatingImages[i].rotation,
                    scale: 1,
                    duration: 2,
                    ease: "power2.inOut"
                }, 0)
            })

            // Phase 2: Profile Image comes up from the bottom
            tl.fromTo(profileRef.current,
                { y: "60vh", opacity: 0, rotation: -10 },
                { y: "5vh", opacity: 1, rotation: 0, duration: 2, ease: "power3.out" },
                "+=0.2" // start slightly after spread
            )

            // Info sections
            gsap.from(".about-info-section", {
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            })

            // Table rows animate in
            gsap.from(".about-row", {
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
            })
        }, componentRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={componentRef} className="bg-[#080808] text-white">

            {/* ══════════════════════════════════════════
                SECTION 1: HERO — scattered image collage
            ══════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center justify-center">

                {/* Scattered image cards — positioned absolute in the center initially (messy pile) */}
                {floatingImages.map((img, i) => (
                    <div
                        key={i}
                        ref={(el) => { imgRefs.current[i] = el }}
                        className="absolute top-1/2 left-1/2 rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                        style={{
                            width: img.width,
                            height: img.height,
                            border: "1px solid rgba(255,255,255,0.08)",
                            zIndex: 1,
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="400px"
                            className="object-cover"
                        />
                    </div>
                ))}

                {/* Centre: Headline + Bio (z above background images) */}
                <div
                    ref={headlineRef}
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto opacity-0"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-8xl leading-[1.0] font-black mb-8 tracking-tight drop-shadow-2xl">
                        <span className="uppercase">Hello I&apos;m </span>
                        <span
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Rakib,{" "}
                        </span>
                        <span className="uppercase">a MERN-Stack</span>
                        <br />
                        <span
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            developer
                        </span>
                        <span className="uppercase"> &amp; </span>
                        <span
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            designer{" "}
                        </span>
                        <span className="uppercase">BASED IN </span>
                        <span
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Dhaka
                        </span>
                    </h1>

                    <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-xl">
                        I specialize in crafting high-performance web applications, blending
                        technical precision with creative design thinking. My work bridges
                        scalable backend systems and polished, engaging frontends.
                    </p>
                </div>

                {/* Profile Image - Comes up from the bottom over the text */}
                <div
                    ref={profileRef}
                    className="absolute top-1/2 left-1/2 w-[260px] h-[350px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl z-30 pointer-events-none opacity-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60"
                        alt="My Profile Picture"
                        fill
                        sizes="320px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 border border-white/20 rounded-2xl"></div>
                </div>

                {/* Bottom fade to next section */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent z-20 pointer-events-none" />
            </section>

            {/* ══════════════════════════════════════════
                SECTION 2: Education + Experience (2-col table)
            ══════════════════════════════════════════ */}
            <section ref={infoRef} className="pb-20 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">

                <div className="grid md:grid-cols-2 gap-16 md:gap-24">

                    {/* Education */}
                    <div className="about-info-section">
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                            Education
                        </h2>
                        <div className="flex flex-col">
                            {education.map((item, i) => (
                                <div key={i} className="about-row group">
                                    <div className="border-t border-white/10 py-6 flex items-start justify-between gap-4 hover:border-white/20 transition-colors duration-300">
                                        <div>
                                            <p className="text-white text-base font-medium leading-snug mb-1">
                                                {item.degree}
                                            </p>
                                            <p className="text-white/40 text-sm">
                                                {item.institution}
                                            </p>
                                        </div>
                                        <span className="text-white/30 text-sm shrink-0 mt-0.5">
                                            {item.year}
                                        </span>
                                    </div>
                                    {i === education.length - 1 && (
                                        <div className="border-t border-white/10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="about-info-section">
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                            Experience
                        </h2>
                        <div className="flex flex-col">
                            {experience.map((item, i) => (
                                <div key={i} className="about-row group">
                                    <div className="border-t border-white/10 py-6 flex items-start justify-between gap-4 hover:border-white/20 transition-colors duration-300">
                                        <div>
                                            <p className="text-white text-base font-medium leading-snug mb-1">
                                                {item.role}
                                            </p>
                                            <p className="text-white/40 text-sm">
                                                {item.company}
                                            </p>
                                        </div>
                                        <span className="text-white/30 text-sm shrink-0 mt-0.5">
                                            {item.year}
                                        </span>
                                    </div>
                                    {i === experience.length - 1 && (
                                        <div className="border-t border-white/10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ══════════════════════════════════════════
                    SECTION 3: Clients
                ══════════════════════════════════════════ */}
                <div className="about-info-section mt-20 md:mt-28 border-t border-white/10 pt-16">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-24 mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Clients
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed self-end">
                            I&apos;ve had the opportunity to collaborate with incredible teams
                            and brands on meaningful projects, building lasting partnerships
                            along the way.
                        </p>
                    </div>

                    {/* Client list */}
                    <div className="flex flex-col">
                        {clients.map((client, i) => (
                            <div key={i} className="about-row group">
                                <div className="border-t border-white/10 py-5 flex items-center justify-between cursor-default hover:border-white/20 transition-colors duration-300">
                                    <span className="text-xl md:text-2xl font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                                        {client}
                                    </span>
                                    <span className="text-white/20 text-sm group-hover:text-[#FF5C00] transition-colors duration-300">
                                        ↗
                                    </span>
                                </div>
                                {i === clients.length - 1 && (
                                    <div className="border-t border-white/10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}
