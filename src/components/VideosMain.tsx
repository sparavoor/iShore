"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosMain({ initialContent }: { initialContent: any }) {
    const [content] = useState<any>(initialContent);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const categories = ["All", "Short video", "Campus tour", "Student experience", "Motivational clip"];
    const videos = content?.videos || [];
    
    // Improved filtering logic to be more resilient
    const filteredVideos = selectedCategory === "All" 
        ? videos 
        : videos.filter((v: any) => {
            const vCat = v.category?.trim().toLowerCase();
            const sCat = selectedCategory.trim().toLowerCase();
            return vCat === sCat;
        });

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark">
            <Navbar />
            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <h4 className="text-accent font-bold uppercase tracking-widest text-sm">Visual Journey</h4>
                            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight">Video Gallery</h1>
                            <p className="text-slate-500 max-w-xl text-lg">Experience life at Ishore through our curated collection of campus tours, student stories, and motivational highlights.</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                                        selectedCategory === cat
                                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredVideos.map((video: any) => (
                                <motion.div
                                    key={video.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -10 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-primary/5 shadow-xl shadow-primary/5 h-full flex flex-col">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={video.thumbnail || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop"}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                                    <span className="material-symbols-outlined text-primary text-4xl fill-1">play_arrow</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-accent text-primary text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                                                    {video.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 space-y-3 flex-grow">
                                            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                                                {video.title}
                                            </h3>
                                            <div className="w-10 h-1 bg-accent/30 rounded-full group-hover:w-20 transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredVideos.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <span className="material-symbols-outlined text-6xl text-slate-200">videocam_off</span>
                            <p className="text-slate-400 font-medium">No videos found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                    >
                        <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl" onClick={() => setSelectedVideo(null)}></div>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10"
                        >
                            <iframe
                                src={selectedVideo.url}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer contact={content?.contact} />
        </div>
    );
}
