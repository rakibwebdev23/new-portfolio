import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BrandStrip } from "@/components/brand-strip";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <BrandStrip />
            {/* Additional sections can be added here as the project grows */}
        </main>
    );
}
