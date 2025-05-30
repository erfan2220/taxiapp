'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-blue-600 dark:text-blue-300">
                TaxiApp 🚕
            </Link>

            <div className="hidden md:flex gap-4">
                <Link href="/profile" className="hover:underline">پروفایل</Link>
                <Link href="/login" className="hover:underline">ورود</Link>
                <button onClick={toggleDarkMode} className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {darkMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

            {menuOpen && (
                <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md p-4 flex flex-col gap-2 md:hidden">
                    <Link href="/profile" onClick={() => setMenuOpen(false)}>پروفایل</Link>
                    <Link href="/login" onClick={() => setMenuOpen(false)}>ورود</Link>
                    <button onClick={() => { toggleDarkMode(); setMenuOpen(false); }}>
                        {darkMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            )}
        </nav>
    );
}
