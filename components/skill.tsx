"use client"

import Image from "next/image"
import { SectionTitle } from "./ui/section-title"

interface SkillItem {
    name: string;
    icon: string;
    isWhite?: boolean;
}

const frontendStack: SkillItem[] = [
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Zustand", icon: "/images/zustand.svg", isWhite: false },
    { name: "ShadCN UI", icon: "/images/shadcn.png" },
    { name: "Framer Motion", icon: "/images/framer-motion.svg" },
    { name: "GSAP", icon: "/images/gsap.svg" },
]

const backendToolsStack: SkillItem[] = [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", icon: "/images/express.png" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Mongoose", icon: "/images/mongoose.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", isWhite: true },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
    { name: "Vercel", icon: "/images/vercel.svg" },
]

const Skill = () => {
    return (
        <section className="py-24 bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto px-4 mb-20 text-center">
                <SectionTitle className="text-4xl md:text-5xl font-bold mb-10">My Expertise</SectionTitle>
            </div>

            {/* Row 1: Frontend */}
            <div className="relative flex overflow-hidden">
                <div
                    className="animate-marquee-horizontal-slow flex gap-6 whitespace-nowrap px-4 py-6"
                    style={{ willChange: 'transform' }}
                >
                    {[...frontendStack, ...frontendStack, ...frontendStack, ...frontendStack].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#111111] border border-white/5 rounded-2xl w-[190px] h-[190px] flex flex-col items-center justify-center gap-5 group hover:bg-[#161616] hover:border-white/10 transition-all duration-300"
                        >
                            <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                    style={item.isWhite ? { filter: 'brightness(0) invert(1)' } : {}}
                                />
                            </div>
                            <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 left-0 bottom-0 w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Row 2: Backend + Tools */}
            <div className="relative flex overflow-hidden mt-4">
                <div
                    className="animate-marquee-horizontal-slow-reverse flex gap-6 whitespace-nowrap px-4 py-6"
                    style={{ willChange: 'transform' }}
                >
                    {[...backendToolsStack, ...backendToolsStack, ...backendToolsStack, ...backendToolsStack].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#111111] border border-white/5 rounded-2xl w-[190px] h-[190px] flex flex-col items-center justify-center gap-5 group hover:bg-[#161616] hover:border-white/10 transition-all duration-300"
                        >
                            <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                    style={item.isWhite ? { filter: 'brightness(0) invert(1)' } : {}}
                                />
                            </div>
                            <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 left-0 bottom-0 w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    )
}

export default Skill;