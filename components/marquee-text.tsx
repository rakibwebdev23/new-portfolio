"use client"

export function MarqueeText() {
    const text = "Empowering user experiences"

    return (
        <section className="py-8 bg-[#f5f5f5] overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 mx-8">
                        <span className="text-6xl md:text-7xl font-bold text-[#050C1C]/10">
                            {text}
                        </span>
                        <svg className="w-10 h-10 text-[#FF5C00]/30" viewBox="0 0 40 40" fill="currentColor">
                            <path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z" />
                        </svg>
                    </div>
                ))}
            </div>
        </section>
    )
}
