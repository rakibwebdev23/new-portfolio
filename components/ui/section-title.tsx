"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function SectionTitle({ children, className, ...props }: SectionTitleProps) {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { backgroundPositionX: "100%" },
                {
                    backgroundPositionX: "0%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 85%", // adjust as needed
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            )
        }, textRef);

        return () => ctx.revert();
    }, []);

    return (
        <h2
            ref={textRef}
            className={cn(
                "text-4xl md:text-5xl font-bold mb-10 leading-tight inline-block",
                className
            )}
            style={{
                backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0.15) 50%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: "100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                willChange: "background-position",
            }}
            {...props}
        >
            {children}
        </h2>
    )
}
