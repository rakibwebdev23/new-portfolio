import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BrandStrip } from "@/components/brand-strip";
import { Services } from "@/components/services";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <BrandStrip />
            <Services />
            {/* Additional sections can be added here as the project grows */}
        </main>
    );
}
