import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section-wrapper";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-20">
                <SectionWrapper>
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                                Insights & <span className="text-primary italic">Thoughts</span>
                            </h1>
                            <p className="text-zinc-400 text-lg max-w-2xl">
                                Sharing my journey, technical discoveries, and perspectives on the future of web development.
                            </p>
                        </div>

                        <div className="grid gap-12">
                            {[
                                {
                                    date: "June 15, 2024",
                                    title: "The Future of Web Development with AI",
                                    excerpt: "Exploring how artificial intelligence is reshaping the way we build and interact with the web.",
                                    category: "Industry"
                                },
                                {
                                    date: "May 28, 2024",
                                    title: "Mastering Next.js Server Components",
                                    excerpt: "A deep dive into the architecture and benefits of using Server Components in modern applications.",
                                    category: "Technical"
                                },
                                {
                                    date: "May 10, 2024",
                                    title: "Designing for the Modern Web",
                                    excerpt: "Principles of creating accessible and aesthetically pleasing user interfaces that users love.",
                                    category: "Design"
                                }
                            ].map((post, i) => (
                                <article key={i} className="group cursor-pointer">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-full md:w-1/3 aspect-video bg-zinc-900 rounded-xl overflow-hidden">
                                            <div className="w-full h-full bg-primary/20 group-hover:bg-primary/30 transition-colors" />
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                                <span className="text-primary uppercase tracking-widest font-bold">{post.category}</span>
                                            </div>
                                            <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
                                            <p className="text-zinc-400 text-lg line-clamp-2">{post.excerpt}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 border-b border-zinc-800" />
                                </article>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
