import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section-wrapper";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-20">
                <SectionWrapper>
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                                My <span className="text-primary italic">Services</span>
                            </h1>
                            <p className="text-zinc-400 text-lg max-w-2xl">
                                I provide high-quality development and design services to help your business grow and succeed in the digital world.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Web Development",
                                    description: "Building fast, responsive, and scalable web applications using the latest technologies like Next.js, React, and Tailwind CSS.",
                                    icon: "🌐"
                                },
                                {
                                    title: "UI/UX Design",
                                    description: "Crafting beautiful and intuitive user interfaces that provide exceptional user experiences and drive engagement.",
                                    icon: "🎨"
                                },
                                {
                                    title: "Mobile Optimization",
                                    description: "Ensuring your website looks and performs perfectly on all devices, from smartphones to desktops.",
                                    icon: "📱"
                                },
                                {
                                    title: "SEO Optimization",
                                    description: "Improving your website's visibility on search engines to attract more organic traffic and potential customers.",
                                    icon: "🚀"
                                },
                                {
                                    title: "Performance Tuning",
                                    description: "Optimizing code and assets to ensure lightning-fast load times and smooth interactions.",
                                    icon: "⚡"
                                },
                                {
                                    title: "Cloud Deployment",
                                    description: "Setting up and managing robust cloud infrastructure to ensure your application is always available and scalable.",
                                    icon: "☁️"
                                }
                            ].map((service, i) => (
                                <div key={i} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group">
                                    <div className="text-4xl mb-6">{service.icon}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
