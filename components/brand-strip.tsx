"use client"

import { cn } from "@/lib/utils"

export function BrandStrip() {
    return (
        <div className="w-full border-t border-white/5 bg-zinc-900/30 backdrop-blur-sm z-20">
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-20">
                    {["Kagont", "katerio", "Afregky", "Opilgo", "Kagont"].map((brand, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 group">
                            <h3 className={cn(
                                "text-3xl md:text-5xl font-serif font-bold transition-all duration-500",
                                index === 2 ? "text-white opacity-100" : "text-white/20 group-hover:text-white/40"
                            )}>
                                {brand}
                            </h3>
                            {index === 2 && (
                                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
