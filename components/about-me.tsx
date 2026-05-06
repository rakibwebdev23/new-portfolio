/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { SectionTitle } from "./ui/section-title"

gsap.registerPlugin(ScrollTrigger)

const SplitChars = ({ text, className, style }: { text: string, className?: string, style?: any }) => {
    return (
        <span className={className} style={style}>
            {text.split("").map((char, i) => (
                <span key={i} className="text-char">
                    {char}
                </span>
            ))}
        </span>
    )
}

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
        institution: "Sonargaon University ( SU )",
        year: "2019–2023",
    },
    {
        degree: "HSC in Science",
        institution: "Shahid Smrity College",
        year: "2015–2016",
    },
    {
        degree: "Certification in Full Stack Web Development",
        institution: "Programming Hero",
        year: "2025",
    },
]

const experience = [
    {
        role: "Frontend Developer",
        company: "Softvence Agency, Dhaka, Bangladesh",
        year: "June 2025–Present",
    }
]

const AnimatedCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const numRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!numRef.current) return

        const ctx = gsap.context(() => {
            const startObj = { val: 0 }
            gsap.to(startObj, {
                val: value,
                duration: 2.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: numRef.current,
                    start: "top 90%",
                },
                onUpdate: () => {
                    if (numRef.current) {
                        numRef.current.innerText = Math.floor(startObj.val) + suffix
                    }
                }
            })
        })

        return () => ctx.revert()
    }, [value, suffix])

    return (
        <div className="flex flex-col items-start group">
            <span ref={numRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter transition-colors duration-300 group-hover:text-[#FF5C00]">
                0{suffix}
            </span>
            <span className="text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] leading-snug">
                {label}
            </span>
        </div>
    )
}

export function AboutMe() {
    const [githubRepos, setGithubRepos] = useState<number>(0)
    const componentRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)
    const imgRefs = useRef<(HTMLDivElement | null)[]>([])
    const headlineRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    const infoRef = useRef<HTMLDivElement>(null)
    const h1Ref = useRef<HTMLHeadingElement>(null)

    // Fetch GitHub Repositories
    useEffect(() => {
        fetch("https://api.github.com/users/rakibwebdev23")
            .then(res => res.json())
            .then(data => {
                if (data.public_repos !== undefined) {
                    setGithubRepos(data.public_repos)
                }
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial setting for the messy pile of images
            // Give them some random rotations so it looks like a pile
            imgRefs.current.forEach((el) => {
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
                    end: "+=2500",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                }
            })

            // Phase 1: Spread out the images and reveal headline
            tl.fromTo(headlineRef.current,
                { opacity: 0, y: 120, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 2.5,
                    ease: "expo.out",
                    force3D: true
                },
                0
            )

            // Text fill effect
            const chars = gsap.utils.toArray(".text-char");
            tl.fromTo(chars,
                {
                    color: "rgba(255,255,255,0.1)",
                    y: 10,
                },
                {
                    color: "rgba(255,255,255,1)",
                    y: 0,
                    duration: 0.1,
                    stagger: 2.5 / chars.length,
                    ease: "power2.out",
                    force3D: true
                },
                0.3
            )

            // Images spread outwards
            imgRefs.current.forEach((el, i) => {
                if (!el) return
                tl.to(el, {
                    x: floatingImages[i].spreadX,
                    y: floatingImages[i].spreadY,
                    rotation: floatingImages[i].rotation,
                    scale: 0.95,
                    duration: 3,
                    ease: "power4.inOut",
                    force3D: true
                }, 0)
            })

            // Phase 2: Profile Image reveal
            tl.fromTo(profileRef.current,
                { y: "65vh", opacity: 0, rotation: -8, scale: 0.8 },
                {
                    y: "5vh",
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 2.5,
                    ease: "expo.out",
                    force3D: true
                },
                "+=0.4"
            )

            // Info sections reveal
            gsap.from(".about-info-section", {
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.25,
                ease: "expo.out",
                force3D: true,
            })

            // Table rows reveal
            gsap.from(".about-row", {
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                force3D: true,
            })
        }, componentRef)

        return () => ctx.revert()
    }, [])

    return (
        <div id="about" ref={componentRef} className="bg-[#080808] text-white">

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
                            willChange: "transform, opacity",
                            backfaceVisibility: "hidden"
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
                    style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
                >
                    <h1
                        ref={h1Ref}
                        className="text-5xl md:text-6xl lg:text-8xl leading-[1.0] font-black mb-8 tracking-tight drop-shadow-2xl"
                    >
                        <SplitChars text="Hello I'm " className="uppercase" />
                        <SplitChars
                            text="Rakib, "
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        />
                        <SplitChars text="a MERN-Stack" className="uppercase" />
                        <br />
                        <SplitChars
                            text="developer"
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        />
                        <SplitChars text=" & " className="uppercase" />
                        <SplitChars
                            text="designer "
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        />
                        <SplitChars text="BASED IN " className="uppercase" />
                        <SplitChars
                            text="Dhaka"
                            className="italic font-normal"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        />
                    </h1>

                    <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-xl">
                        I’m a MERN Stack Developer with a strong focus on frontend engineering. I specialize in building fast, scalable, and visually refined web applications using React and Next.js. My goal is to create seamless user experiences that not only look great but also perform flawlessly across all devices.
                    </p>
                </div>

                {/* Profile Image - Comes up from the bottom over the text */}
                <div
                    ref={profileRef}
                    className="absolute top-1/2 left-1/2 w-[260px] h-[350px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl z-30 pointer-events-none opacity-0"
                >
                    <Image
                        src="/images/about.jpg"
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
                        <SectionTitle className="mb-10 text-4xl md:text-5xl">
                            Education
                        </SectionTitle>
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
                    <div className="about-info-section flex flex-col h-full">
                        <div>
                            <SectionTitle className="mb-10 text-4xl md:text-5xl">
                                Professional Experience
                            </SectionTitle>
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

                        {/* ── Dynamic Stats (Underneath Experience) ── */}
                        <div className="mt-auto pt-10 grid grid-cols-3 gap-6 about-row">
                            <AnimatedCounter value={3} label="Years Experience" suffix="+" />
                            <AnimatedCounter value={40} label="Total Projects" suffix="+" />
                            <AnimatedCounter value={githubRepos || 0} label="GitHub Repositories" suffix="" />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
