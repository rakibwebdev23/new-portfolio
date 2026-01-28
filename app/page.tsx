"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProjectCard } from "@/components/project-card"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Layers, Zap, Mail, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About Section
      gsap.from(aboutRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Projects Animation
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Contact Animation
      gsap.from(contactRef.current, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      })
    })

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "FixList - Service Marketplace",
      description: "Service-based marketplace connecting users with providers.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Redux"],
      link: "#",
      github: "#",
    },
    {
      title: "Vacanza Greece",
      description: "Travel and home exchange platform for connecting users worldwide.",
      tags: ["Next.js", "TypeScript", "Design", "Mobile-first"],
      link: "#",
      github: "#",
    },
    {
      title: "Tape - SaaS Scheduling",
      description: "Platform for profile management, scheduling, and content synchronization.",
      tags: ["Next.js", "TypeScript", "Offline-first", "SaaS"],
      link: "#",
      github: "#",
    },
    {
      title: "Scorells - Credit Platform",
      description: "AI-powered credit improvement platform with dispute generation.",
      tags: ["React.js", "Tailwind CSS", "TypeScript", "AI"],
      link: "#",
      github: "#",
    },
  ]

  const skills = [
    "Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Redux Toolkit",
    "MongoDB", "Express.js", "ShadCN UI", "GSAP", "Figma", "Zustand"
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <Hero />

      {/* About / Skills Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Tech Stack & Expertise</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I build performant, accessible, and beautiful web applications. My workflow is built around the modern React ecosystem, focusing on speed and user experience.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {skills.map(skill => (
                  <Badge key={skill} variant="outline" className="text-base py-1 px-3 border-zinc-800 bg-zinc-950 text-zinc-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-zinc-950 border-zinc-800 shadow-md">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Fast Performance</CardTitle>
                  <CardDescription>Optimized for Core Web Vitals and speed.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 shadow-md">
                <CardHeader>
                  <Layers className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Scalable Architecture</CardTitle>
                  <CardDescription>Built with best practices for growth.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 shadow-md">
                <CardHeader>
                  <Code2 className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Clean Code</CardTitle>
                  <CardDescription>Maintainable and type-safe solutions.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-24 container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Featured Work</h2>
          <p className="text-muted-foreground text-lg">
            A selection of my recent projects. Each one helps solve a unique problem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 container mx-auto px-6">
        <div ref={contactRef} className="bg-primary text-primary-foreground rounded-xl p-8 md:p-16 text-center max-w-4xl mx-auto overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950">Ready to start a project?</h2>
            <p className="text-zinc-900/80 text-lg md:text-xl max-w-xl mx-auto">
              Let's collaborate to bring your ideas to life. I Am currently available for freelance work and open to new opportunities.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="rounded-none bg-black text-white px-8 h-12 text-base mt-4 hover:bg-black/80">
                <Mail className="mr-2 h-5 w-5" /> Get in Touch
              </Button>
            </div>

          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-white/5 bg-zinc-950">
        <p>© {new Date().getFullYear()} MD Rakib Hasan. All rights reserved.</p>
      </footer>
    </div>
  )
}
