"use client"

import { cn } from "@/lib/utils"

const skills = ["JavaScript", "TypeScript", "Next.js", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"]

export function BrandStrip() {
    return (
        <div className="w-full border-t border-white/5 bg-zinc-900/30 backdrop-blur-sm z-20 overflow-hidden">
            <div className="py-10 md:py-14">
                {/* Marquee container */}
                <div className="flex animate-marquee">
                    {/* First set of skills */}
                    <div className="flex shrink-0 gap-12 md:gap-20 px-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <span className="text-3xl md:text-5xl font-serif font-bold text-white/30 hover:text-white/60 transition-colors duration-300 whitespace-nowrap">
                                    {skill}
                                </span>
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex shrink-0 gap-12 md:gap-20 px-6">
                        {skills.map((skill, index) => (
                            <div key={`dup-${index}`} className="flex items-center gap-4">
                                <span className="text-3xl md:text-5xl font-serif font-bold text-white/30 hover:text-white/60 transition-colors duration-300 whitespace-nowrap">
                                    {skill}
                                </span>
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
