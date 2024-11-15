// components/Header.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NavLink = {
    label: string;
    href: string;
};

type HeaderProps = {
    navLinks: NavLink[];
};

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="w-full px-16 bg-black text-white py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link href="/">
                        <Image alt="logo" src="/logo.png" width={60} height={60} className="max-w-[50px]" />
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href}>
                            <span className="cursor-pointer hover:text-gray-400 transition-colors">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* "Let's Talk" Button */}
                <div className="hidden md:block">
                    <Link href="/contact">
                        <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all">
                            Let&apos;s Talk
                        </button>
                    </Link>
                </div>

                {/* Hamburger Menu Icon for Mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <span className="text-3xl">&#9776;</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu with CSS Animation */}
            <div
                className={`mobile-menu ${isOpen ? 'open' : ''}`}
            >
                <nav className="flex flex-col items-center space-y-4 py-4">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href}>
                            <span onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-gray-400 transition-colors">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    <Link href="/contact">
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all">
                            Let&apos;s Talk
                        </button>
                    </Link>
                </nav>
            </div>

            <style jsx>{`
                /* Mobile Menu Styles */
                .mobile-menu {
                    overflow: hidden;
                    max-height: 0;
                    opacity: 0;
                    background-color: black;
                    transition: max-height 0.3s ease, opacity 0.3s ease;
                }

                /* Open state for mobile menu */
                .mobile-menu.open {
                    max-height: 300px; /* Adjust based on menu content height */
                    opacity: 1;
                }
            `}</style>
        </header>
    );
};

export default Header;
