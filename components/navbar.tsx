"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import CommonWrapper from "./CommonWrapper"

interface DropdownItem {
    label: string
    href: string
}

interface NavLink {
    label: string
    href: string
    hasDropdown?: boolean
    dropdownItems?: DropdownItem[]
}

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 80) {
                    setIsVisible(false)
                } else {
                    setIsVisible(true)
                }
                setLastScrollY(window.scrollY)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)
            return () => {
                window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [lastScrollY])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const scrollToSection = useCallback((sectionId: string) => {
        if (pathname !== "/") {
            router.push(`/#${sectionId}`)
            return
        }
        const el = document.getElementById(sectionId)
        if (el) {
            const offset = 100 // account for fixed navbar
            const top = el.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: "smooth" })
        }
    }, [pathname, router])

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            scrollToSection(href.slice(1))
            setMobileMenuOpen(false)
        }
    }

    const navLinks: NavLink[] = [
        {
            label: "Home",
            href: "/",
        },
        { label: "About me", href: "#about" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Blog", href: "/blog" },
    ]

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <div className={cn(
            "fixed top-6 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
        )}>
            <CommonWrapper>
                <nav
                    className="bg-white rounded-2xl py-5 px-6 shadow-lg relative"
                    ref={dropdownRef}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-[#FF5C00]">R</span>
                            <span className="text-2xl font-bold text-[#050C1C]">akib</span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                const isDropdownOpen = activeDropdown === link.label

                                if (link.hasDropdown) {
                                    return (
                                        <div key={link.label} className="relative">
                                            <button
                                                onClick={() => toggleDropdown(link.label)}
                                                className={cn(
                                                    "flex items-center gap-1 text-sm font-medium transition-colors duration-200",
                                                    isActive ? "text-[#FF5C00]" : "text-gray-700 hover:text-[#FF5C00]"
                                                )}
                                            >
                                                {link.label}
                                                <ChevronDown className={cn(
                                                    "w-4 h-4 transition-transform duration-200",
                                                    isDropdownOpen && "rotate-180"
                                                )} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className={cn(
                                                "absolute top-full left-0 mt-4 bg-white rounded-xl shadow-xl py-3 px-2 min-w-[180px]",
                                                "transition-all duration-300 origin-top",
                                                isDropdownOpen
                                                    ? "opacity-100 scale-100 visible"
                                                    : "opacity-0 scale-95 invisible"
                                            )}>
                                                {link.dropdownItems?.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className={cn(
                                                            "block px-4 py-2.5 text-sm rounded-lg transition-colors duration-200",
                                                            pathname === item.href
                                                                ? "text-[#FF5C00] bg-orange-50"
                                                                : "text-gray-700 hover:text-[#FF5C00] hover:bg-orange-50"
                                                        )}
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={cn(
                                            "relative text-sm font-medium transition-colors duration-200 group py-2",
                                            isActive ? "text-[#FF5C00]" : "text-gray-700 hover:text-[#FF5C00]"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Contact Button */}
                        <div className="hidden md:block">
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="border-2 border-[#FF5C00] text-[#FF5C00] bg-transparent hover:bg-[#FF5C00] hover:text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer"
                            >
                                Contact me
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-gray-700 hover:text-[#FF5C00] transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={cn(
                        "md:hidden overflow-hidden transition-all duration-300",
                        mobileMenuOpen ? "max-h-[400px] mt-4 pt-4 border-t border-gray-100" : "max-h-0"
                    )}>
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <div key={link.label}>
                                    {link.hasDropdown ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(link.label)}
                                                className="flex items-center justify-between w-full text-gray-700 hover:text-[#FF5C00] transition-colors text-sm font-medium py-2"
                                            >
                                                {link.label}
                                                <ChevronDown className={cn(
                                                    "w-4 h-4 transition-transform",
                                                    activeDropdown === link.label && "rotate-180"
                                                )} />
                                            </button>
                                            <div className={cn(
                                                "overflow-hidden transition-all duration-200 pl-4",
                                                activeDropdown === link.label ? "max-h-[200px]" : "max-h-0"
                                            )}>
                                                {link.dropdownItems?.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className="block text-sm text-gray-600 hover:text-[#FF5C00] py-2"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="block text-gray-700 hover:text-[#FF5C00] transition-colors text-sm font-medium py-2"
                                            onClick={(e) => { handleNavClick(e, link.href); setMobileMenuOpen(false) }}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false) }}
                                className="w-full border-2 border-[#FF5C00] text-[#FF5C00] bg-transparent hover:bg-[#FF5C00] hover:text-white rounded-full mt-2 py-2 text-sm font-medium cursor-pointer"
                            >
                                Contact me
                            </button>
                        </div>
                    </div>
                </nav>
            </CommonWrapper>
        </div>
    )
}
