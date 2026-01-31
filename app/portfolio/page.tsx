import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section-wrapper";
import { ProjectCard } from "@/components/project-card";

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-20">
                <SectionWrapper>
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                                Selected <span className="text-primary italic">Works</span>
                            </h1>
                            <p className="text-zinc-400 text-lg max-w-2xl">
                                A collection of projects where I've combined technical excellence with creative problem-solving.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <ProjectCard
                                title="Modern SaaS Platform"
                                description="A full-featured SaaS platform built with Next.js, Stripe integration, and complex dashboard analytics."
                                tags={["Next.js", "Stripe", "Prisma", "Tailwind"]}
                                link="#"
                                github="#"
                            />
                            <ProjectCard
                                title="AI Content Engine"
                                description="An AI-powered content generation tool utilizing OpenAI API for generating marketing copy and blog posts."
                                tags={["React", "OpenAI", "Node.js", "MongoDB"]}
                                link="#"
                                github="#"
                            />
                            <ProjectCard
                                title="Crypto Portfolio Tracker"
                                description="Real-time cryptocurrency portfolio tracking application with live price feeds and performance charts."
                                tags={["TypeScript", "Recharts", "CoinGecko API"]}
                                link="#"
                                github="#"
                            />
                            <ProjectCard
                                title="Collaborative Workspace"
                                description="A real-time collaborative tool for teams to manage tasks and projects together in sync."
                                tags={["Socket.io", "React", "Express", "PostgreSQL"]}
                                link="#"
                                github="#"
                            />
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
