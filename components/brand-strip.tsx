"use client"

import CommonWrapper from "./CommonWrapper"

const brands = [
    {
        name: "Strequry",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 8L12 4L28 12L20 16L28 20L12 28L4 24L12 20L4 16L12 12L4 8Z" stroke="#FF5C00" strokeWidth="2" fill="none" />
            </svg>
        )
    },
    {
        name: "Asprotec",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 28H4L16 4Z" stroke="#FF5C00" strokeWidth="2" fill="none" />
                <path d="M9 20L23 20" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        name: "Hyposis",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="10" width="24" height="4" rx="2" fill="#FF5C00" />
                <rect x="4" y="18" width="24" height="4" rx="2" fill="#FF5C00" />
                <rect x="4" y="10" width="4" height="12" rx="2" fill="#FF5C00" />
                <rect x="24" y="10" width="4" height="12" rx="2" fill="#FF5C00" />
            </svg>
        )
    },
    {
        name: "Promptyl",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#FF5C00" strokeWidth="2" fill="none" />
                <path d="M16 8 L20 16 L16 12 L12 16 Z" fill="#FF5C00" />
            </svg>
        )
    },
    {
        name: "Technic",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="6" width="20" height="20" rx="4" stroke="#FF5C00" strokeWidth="2" fill="none" />
                <path d="M10 16 L22 16M16 10 L16 22" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        name: "Orbix",
        logo: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="11" stroke="#FF5C00" strokeWidth="2" fill="none" />
                <ellipse cx="16" cy="16" rx="6" ry="11" stroke="#FF5C00" strokeWidth="1.5" fill="none" />
            </svg>
        )
    },
]

export function BrandStrip() {
    const doubled = [...brands, ...brands]

    return (
        <div className="w-full bg-white border-t border-gray-100 border-b overflow-hidden py-10">
            <CommonWrapper>
                <p className="text-center text-[#050C1C] font-semibold text-base mb-8">
                    Trusted by <span className="text-[#FF5C00] font-bold">1000+</span> companies around the world
                </p>
                <div className="relative">
                    <div className="flex animate-marquee">
                        {doubled.map((brand, i) => (
                            <div key={i} className="flex items-center gap-3 shrink-0 px-10">
                                {brand.logo}
                                <span className="text-[#050C1C] text-xl font-bold whitespace-nowrap">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CommonWrapper>
        </div>
    )
}
