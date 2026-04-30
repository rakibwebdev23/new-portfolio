"use client";

import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section-wrapper";
import { Mail, MapPin, Smartphone, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection.");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/30">
            <Navbar />
            <div className="pt-32 pb-20">
                <SectionWrapper>
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center mb-24">
                        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-300 uppercase mb-4">
                            Get in touch
                        </p>
                        <h1 className="text-6xl md:text-[9rem] leading-none font-bold tracking-tight flex items-center">
                            <span className="text-white">CONT</span>
                            <span
                                className="text-transparent"
                                style={{ WebkitTextStroke: "2px #FF5C00" }}
                            >
                                ACT
                            </span>
                        </h1>
                    </div>

                    {/* Content Section */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-8 xl:gap-16">
                        {/* Left Column: Form */}
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-400">
                                    Name <span className="text-[#FF5C00]">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#1c1c1c] border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#FF5C00]/60 transition-colors text-white placeholder:text-zinc-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-400">
                                    Email Address <span className="text-[#FF5C00]">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#1c1c1c] border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#FF5C00]/60 transition-colors text-white placeholder:text-zinc-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-zinc-400">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#1c1c1c] border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#FF5C00]/60 transition-colors text-white placeholder:text-zinc-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-400">
                                    Your Message <span className="text-[#FF5C00]">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full bg-[#1c1c1c] border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#FF5C00]/60 transition-colors text-white placeholder:text-zinc-500 min-h-[160px] resize-none"
                                    placeholder="Write Your Message Here"
                                />
                            </div>

                            {/* Feedback Messages */}
                            {status === "success" && (
                                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 text-green-400">
                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                    <p className="text-sm">Message sent! I'll get back to you soon.</p>
                                </div>
                            )}
                            {status === "error" && (
                                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400">
                                    <XCircle className="w-5 h-5 shrink-0" />
                                    <p className="text-sm">{errorMsg}</p>
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="inline-flex items-center gap-2 px-10 py-4 bg-[#FF5C00] text-white cursor-pointer hover:bg-white hover:text-black font-bold text-sm rounded-full transition-all duration-300 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            SENDING...
                                        </>
                                    ) : (
                                        "SUBMIT"
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Right Column: Cards */}
                        <div className="space-y-6">
                            {/* Card 1 */}
                            <div className="bg-[#1c1c1c] p-8 md:p-10 rounded-2xl flex items-center gap-8">
                                <div className="w-16 h-16 shrink-0 rounded-full bg-[#e8e8e8] flex items-center justify-center">
                                    <Mail className="w-7 h-7 text-black stroke-[1.5]" />
                                </div>
                                <div className="space-y-2 md:space-y-1">
                                    <p className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">Email</p>
                                    <p className="text-zinc-400 text-lg break-all">rh.rakibhasan365@gmail.com</p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-[#1c1c1c] p-8 md:p-10 rounded-2xl flex items-center gap-8">
                                <div className="w-16 h-16 shrink-0 rounded-full bg-[#e8e8e8] flex items-center justify-center">
                                    <MapPin className="w-7 h-7 text-black stroke-[1.5]" />
                                </div>
                                <div className="space-y-2 md:space-y-1">
                                    <p className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">Location</p>
                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        Dhaka<br />
                                        Bangladesh
                                    </p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-[#1c1c1c] p-8 md:p-10 rounded-2xl flex items-center gap-8">
                                <div className="w-16 h-16 shrink-0 rounded-full bg-[#e8e8e8] flex items-center justify-center">
                                    <Smartphone className="w-7 h-7 text-black stroke-[1.5]" />
                                </div>
                                <div className="space-y-2 md:space-y-1">
                                    <p className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">Phone</p>
                                    <p className="text-zinc-400 text-lg">+8801307236959</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
