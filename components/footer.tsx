"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

const footerLinks = {
    pages: [
        { label: "About Me", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" }
    ],
    services: [
        { label: "UI/UX Design", href: "/services" },
        { label: "Web Design", href: "/services" },
        { label: "Branding", href: "/services" },
        { label: "App Design", href: "/services" }
    ],
    social: [
        { label: "Dribbble", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Behance", href: "#" },
        { label: "Upwork", href: "#" }
    ]
}

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-[#050C1C] pt-20 pb-8">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Logo and Social */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-1 mb-6">
                            <span className="text-3xl font-bold text-[#FF5C00]">F</span>
                            <span className="text-3xl font-bold text-white">olxo</span>
                        </Link>
                        <p className="text-white/60 mb-6 max-w-xs">
                            Dive into a realm where design meets narrative. Creating potent fusion of creativity and user experience.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {['Dribbble', 'Instagram', 'Behance', 'Upwork'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF5C00] transition-colors duration-300"
                                >
                                    <span className="text-xs font-bold">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Pages Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Pages</h4>
                        <ul className="space-y-3">
                            {footerLinks.pages.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-[#FF5C00] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-[#FF5C00] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Stay with me</h4>
                        <p className="text-white/60 text-sm mb-4">
                            Subscribe to my newsletter for updates
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5C00]"
                            />
                            <Button className="bg-[#FF5C00] hover:bg-[#e65400] text-white rounded-full px-6">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">
                        © 2024 Folxo. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full bg-[#FF5C00] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
