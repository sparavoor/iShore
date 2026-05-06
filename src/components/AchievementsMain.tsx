"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AchievementsMain({ initialContent }: { initialContent: any }) {
    const [content] = useState<any>(initialContent);
    const achievements = content?.achievements || [];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0a1612]">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden border-b border-primary/5 bg-white dark:bg-[#10221d]">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                Milestones of Excellence
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tight leading-[1.1]">
                                Our Proud <br/> Achievements
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                                Since 1994, Ishore Educational Institution has been a beacon of academic excellence and moral leadership. Discover the milestones that define our journey.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Achievements Grid */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 md:px-10">
                        {achievements.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {achievements.map((item: any, idx: number) => (
                                    <motion.div 
                                        key={item.id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-xl shadow-primary/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            <img 
                                                src={item.img || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60"} 
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-black rounded-full shadow-sm">
                                                    {item.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10">
                                            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3.5rem] border border-primary/5 shadow-inner">
                                <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary shadow-lg shadow-primary/10">
                                    <span className="material-symbols-outlined text-5xl">military_tech</span>
                                </div>
                                <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">Gathering Milestones...</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                                    We are currently documenting our newest achievements. Check back soon to see our progress.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Legacy Section */}
                <section className="py-24 bg-primary text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[50px] border-white rounded-full"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 text-center">
                        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
                            Building a Legacy of <span className="text-accent italic">Success</span> and <span className="text-accent italic">Values</span>
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                            Every achievement listed here is a testament to the hard work of our students, the dedication of our faculty, and the unwavering support of our community.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="px-10 py-4 bg-accent text-primary font-black rounded-2xl shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
                                Partner With Us
                            </button>
                            <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">
                                Contact Institution
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}
