"use client";

import Link from "next/link";
import { useState } from "react";

const NavItem = ({ label, href, dropdownItems, isMobile, closeMenu }: { label: string; href?: string; dropdownItems?: { label: string; href: string }[]; isMobile?: boolean; closeMenu?: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (dropdownItems) {
        if (isMobile) {
            return (
                <div className="w-full">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-primary/5"
                    >
                        {label}
                        <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-slate-400'}`}>
                            expand_more
                        </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 bg-primary/5 rounded-lg mt-1 ${isExpanded ? 'max-h-[400px] py-2 mb-2' : 'max-h-0'}`}>
                        {dropdownItems.map((item, idx) => (
                            <Link 
                                key={idx} 
                                href={item.href} 
                                onClick={closeMenu}
                                className="block px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="group relative">
                <button className="nav-link flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2">
                    {label} <span className="material-symbols-outlined text-xs">expand_more</span>
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-[#10221d] shadow-xl border border-primary/5 rounded-xl py-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {dropdownItems.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block px-4 py-2 hover:bg-primary/5 hover:text-primary text-sm transition-colors text-slate-700 dark:text-slate-200">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Link 
            href={href || "#"} 
            onClick={isMobile ? closeMenu : undefined}
            className={`text-sm font-medium hover:text-primary transition-colors py-3 ${isMobile ? 'block border-b border-primary/5 text-slate-700 dark:text-slate-200' : 'nav-link'}`}
        >
            {label}
        </Link>
    );
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {
            label: "About",
            dropdownItems: [
                { label: "Ishore Heritage", href: "/about" },
                { label: "Principal's Message", href: "/principal-message" },
                { label: "Markaz Connection", href: "/markaz" },
            ]
        },
        {
            label: "Admission",
            dropdownItems: [
                { label: "Apply Online", href: "/admission" },
                { label: "Student Login", href: "/student-portal/login" },
            ]
        },
        {
            label: "Academics",
            dropdownItems: [
                { label: "Latest News", href: "/academics" },
                { label: "Videos", href: "/videos" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "#" },
            ]
        },
        { label: "Programmes", href: "/programme" },
        { label: "Facilities", href: "/facilities" },
        { label: "Achievements", href: "/achievements" },
    ];

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-primary/10 px-4 md:px-10 lg:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src="/company-logo.png" alt="iSHORE Educational Institution" className="h-8 md:h-10 w-auto drop-shadow-sm" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <NavItem key={idx} {...link} />
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center justify-center p-2 text-primary dark:text-accent hover:bg-primary/10 rounded-full">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <Link href="/admission" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all border-b-4 border-accent/30">
                        Apply Now
                    </Link>
                    <button
                        className="xl:hidden flex items-center p-2 text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`xl:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#10221d] border-b border-primary/10 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl ${isMenuOpen ? 'max-h-[100vh] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col">
                    {navLinks.map((link, idx) => (
                        <NavItem key={idx} {...link} isMobile closeMenu={() => setIsMenuOpen(false)} />
                    ))}
                    <div className="mt-8 flex gap-4">
                        <Link href="/student-portal/login" className="flex-1 text-center py-3 rounded-xl border border-primary/10 text-sm font-bold text-primary">
                            Portal Login
                        </Link>
                        <Link href="/admission" className="flex-1 text-center py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
