"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import CommonWrapper from "./CommonWrapper"

const quickLinks = [
    { label: "About me", href: "/about" },
    { label: "My services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "My blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
]

const utilityPages = [
    { label: "Password protected", href: "#" },
    { label: "404 not found", href: "#" },
    { label: "Style guide", href: "#" },
    { label: "License", href: "#" },
    { label: "Changelog", href: "#" },
]

const socialIcons = [
    {
        label: "Dribbble",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
            </svg>
        )
    },
    {
        label: "YouTube",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
            </svg>
        )
    },
    {
        label: "Behance",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h14c3 0 4 1.5 4 3.5S18 13 15 13H1V6z" />
                <path d="M1 13h14c3 0 5 1.5 5 3.5S18 20 15 20H1V13z" />
                <path d="M16 4h6M17 8h4" />
                <circle cx="19" cy="13" r="4" />
            </svg>
        )
    },
    {
        label: "Upwork",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 9.5a4 4 0 0 1-4 4c-2.5 0-4-2-5-4H4V9h5c1 2 2.5 4 5 4a4 4 0 0 0 4-4V5h-5" />
                <path d="M9 17c0 1.5-1 2.5-2 2.5S5 18.5 5 17" />
            </svg>
        )
    },
]

export function Footer() {
    return (
        <footer className="bg-[#050C1C] pt-20 pb-0">
            <CommonWrapper>
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Logo + tagline + social */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-0 mb-5">
                            <span className="text-3xl font-extrabold text-[#FF5C00] font-sans">F</span>
                            <span className="text-3xl font-extrabold text-white font-sans">olxo</span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-[220px]">
                            Experience the power of visual storytelling
                        </p>
                        <div className="flex gap-3">
                            {socialIcons.map((s) => (
                                <a
                                    key={s.label}
                                    href="#"
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all duration-300"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-6">Quick links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 text-sm hover:text-[#FF5C00] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Utility pages */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-6">Utility pages</h4>
                        <ul className="space-y-4">
                            {utilityPages.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 text-sm hover:text-[#FF5C00] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Newsletter */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-bold text-base mb-6">Contact</h4>
                            <ul className="space-y-3 text-white/60 text-sm">
                                <li>contact@folxo.com</li>
                                <li>(316) 555-0116</li>
                                <li className="leading-relaxed">1901 Thornridge Cir. Shiloh,<br />Hawaii 81063</li>
                            </ul>
                        </div>

                        {/* Stay with me */}
                        <div>
                            <h4 className="text-white font-bold text-base mb-2">Stay with me</h4>
                            <p className="text-white/60 text-sm mb-4">
                                Subscribe my newsletter and get all the latest information
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-full px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#FF5C00] transition-colors"
                                />
                                <Button className="bg-[#FF5C00] hover:bg-[#e65400] text-white rounded-full px-5 text-sm font-semibold shrink-0">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonWrapper>

            {/* Bottom copyright bar */}
            <div className="border-t border-white/10 py-5 text-center">
                <p className="text-white/50 text-sm">
                    Copyright© Folxo | Designed by <strong className="text-white">Brandbes</strong> - Powered by <strong className="text-white">Webflow</strong>
                </p>
            </div>
        </footer>
    )
}
