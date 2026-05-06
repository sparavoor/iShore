"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutMain({ initialContent }: { initialContent: any }) {
    const [content] = useState<any>(initialContent);
    const about = content?.about || {};

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-primary mb-6">Our Heritage</h1>
                        <div className="w-24 h-2 bg-accent mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                                    {about.content || "The Markaz Ishore Educational Institution stands as a beacon of academic excellence and moral fortitude..."}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                                    <span className="material-symbols-outlined text-accent text-4xl mb-4">{about.historicalContext?.icon || 'history'}</span>
                                    <h3 className="text-xl font-bold mb-3">{about.historicalContext?.title || 'Historical Context'}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {about.historicalContext?.content || "Founded on the principles of holistic education..."}
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
                                    <span className="material-symbols-outlined text-primary text-4xl mb-4">{about.ethicalCore?.icon || 'psychology'}</span>
                                    <h3 className="text-xl font-bold mb-3">{about.ethicalCore?.title || 'Ethical Core'}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {about.ethicalCore?.content || "At the heart of Ishore is a deep commitment to ethical leadership..."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                                <img
                                    src={about.image || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80"}
                                    alt="Institutional Heritage"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-3xl -z-10 rotate-12"></div>
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent rounded-3xl -z-10 -rotate-12"></div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
                    >
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Continuing the Legacy</h2>
                            <p className="text-white/80 text-lg leading-relaxed mb-10">
                                {about.closingContent || "Today, Markaz Ishore continues to evolve, integrating modern pedagogical approaches with timeless values..."}
                            </p>
                            <Link href="/admission" className="px-12 py-5 bg-accent text-primary font-black rounded-2xl hover:scale-105 transition-transform inline-block shadow-xl shadow-accent/20">
                                Join Our Community
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
                    </motion.div>
                </div>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}
