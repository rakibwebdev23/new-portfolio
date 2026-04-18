"use client"

export function MarqueeText() {
    const items = [
        "Empowering user experiences",
        "Empowering user experiences",
        "Empowering user experiences",
        "Empowering user experiences",
        "Empowering user experiences",
        "Empowering user experiences",
    ]

    return (
        <section className="py-8 bg-[#f5f5f5] overflow-hidden border-t border-gray-200">
            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((text, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#050C1C]/10 px-8">
                            {text}
                        </span>
                        {/* Star separator */}
                        <svg className="w-8 h-8 text-[#FF5C00]/25 shrink-0" viewBox="0 0 32 32" fill="currentColor">
                            <path d="M16 0L18 14L32 16L18 18L16 32L14 18L0 16L14 14L16 0Z" />
                        </svg>
                    </div>
                ))}
            </div>
        </section>
    )
}
