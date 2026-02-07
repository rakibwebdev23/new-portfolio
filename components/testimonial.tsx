"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
    {
        quote: "Working with Folxo has been an absolute pleasure. Their attention to detail and commitment to delivering a top-notch product is truly commendable. I highly recommend Folxo for anyone looking for a talented and dedicated designer.",
        author: "Sarah Mitchell",
        role: "CEO at TechStart",
        image: "https://i.pravatar.cc/150?img=32"
    },
    {
        quote: "The design work exceeded all our expectations. The team understood our vision perfectly and delivered a product that truly represents our brand. Highly professional and incredibly talented.",
        author: "James Wilson",
        role: "Founder at Designify",
        image: "https://i.pravatar.cc/150?img=33"
    }
]

export function Testimonial() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-[#050C1C]">
            <div className="container mx-auto px-6">
                <div className="testimonial-content grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Quote */}
                    <div className="relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 text-[#FF5C00]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white text-sm font-medium">98% Positive review</span>
                        </div>

                        {/* Quote Icon */}
                        <Quote className="w-12 h-12 text-[#FF5C00] mb-6" />

                        {/* Quote Text */}
                        <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8">
                            "{testimonials[currentIndex].quote}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                <Image
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-semibold">{testimonials[currentIndex].author}</p>
                                <p className="text-white/60 text-sm">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Large Image */}
                    <div className="relative hidden md:block">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                            <Image
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60"
                                alt="Happy client"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
