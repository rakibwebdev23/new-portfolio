import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BrandStrip } from "@/components/brand-strip";
import { AboutMe } from "@/components/about-me";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Testimonial } from "@/components/testimonial";
import { MarqueeText } from "@/components/marquee-text";
import { Footer } from "@/components/footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <BrandStrip />
            <AboutMe />
            <Services />
            <Portfolio />
            <Testimonial />
            <MarqueeText />
            <Footer />
        </main>
    );
}
