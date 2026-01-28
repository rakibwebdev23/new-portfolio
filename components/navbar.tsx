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
            "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
            "bg-black/40 backdrop-blur-xl border-b border-white/5 py-4",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold">
                        M
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">MD Rakib</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <a href="#" className="text-primary hover:text-primary transition-colors">Home</a>
                    <a href="#services" className="hover:text-white transition-colors">Services</a>
                    <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                    <a href="#blog" className="hover:text-white transition-colors">Blog</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
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
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </Button>
            </div>
        </nav>
    )
}
