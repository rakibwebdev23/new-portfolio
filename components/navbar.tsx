"use client"

import { Button } from "@/components/ui/button"
import { Menu, MessageSquare } from "lucide-react"

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
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
