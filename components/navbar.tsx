"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 80) { // Scrolling down
                    setIsVisible(false)
                } else { // Scrolling up or at top
                    setIsVisible(true)
                }
                setLastScrollY(window.scrollY)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [lastScrollY])

    return (
        <nav className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out w-[95%] max-w-7xl",
            "bg-black/20 backdrop-blur-md border border-white/10 rounded-lg pt-1 pb-4 shadow-2xl",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between pt-1">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold">
                        M
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">MD Rakib</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    {[
                        { label: "Home", href: "#", active: true },
                        { label: "Services", href: "#services" },
                        { label: "Portfolio", href: "#portfolio" },
                        { label: "Blog", href: "#blog" },
                        { label: "Contact", href: "#contact" },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "relative py-2 transition-colors duration-300 group",
                                link.active ? "text-primary font-bold" : "hover:text-white"
                            )}
                        >
                            {link.label}
                            <span className={cn(
                                "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out origin-left",
                                link.active ? "w-full" : "w-0 group-hover:w-full"
                            )} />
                        </a>
                    ))}
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="mailto:rh.rakibhasan365@gmail.com" className="text-xs text-zinc-500 hover:text-white transition-colors">
                        rh.rakibhasan365@gmail.com
                    </a>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-6 font-bold">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Let's Talk
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-primary transition-colors">
                    <Menu className="w-6 h-6" />
                </Button>
            </div>
        </nav>
    )
}
