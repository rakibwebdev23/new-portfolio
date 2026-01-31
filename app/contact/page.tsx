import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-20">
                <SectionWrapper>
                    <div className="grid md:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                                    Let's <span className="text-primary italic">Connect</span>
                                </h1>
                                <p className="text-zinc-400 text-lg">
                                    Have a project in mind or just want to say hi? I'm always open to new opportunities and interesting conversations.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500 lowercase">Email Me</p>
                                        <p className="text-xl font-medium">rh.rakibhasan365@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500 lowercase">Call Me</p>
                                        <p className="text-xl font-medium">+880 1234 567890</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500 lowercase">Location</p>
                                        <p className="text-xl font-medium">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-zinc-800">
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">First Name</label>
                                        <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors transition-colors" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Last Name</label>
                                        <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Email Address</label>
                                    <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Message</label>
                                    <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors min-h-[150px]" placeholder="Tell me about your project..."></textarea>
                                </div>
                                <Button className="w-full h-14 bg-primary text-black hover:bg-primary/90 font-bold text-lg rounded-xl">
                                    Send Message <Send className="ml-2 w-5 h-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
