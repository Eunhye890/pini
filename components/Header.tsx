"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFD54F] pixel-border-sm" style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 hover-bounce">
            <Image src="/pini_ch.png" alt="Pini" width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
            <span className="font-pixel text-sm sm:text-base text-[#2d2d2d]">
              Pini
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/games" className="pixel-btn bg-white text-[#2d2d2d] px-3 py-1 font-pixel text-[9px] hover:bg-[#5CA4E7] hover:text-white">
              ALL GAMES
            </Link>
            <Link href="/for-teachers" className="pixel-btn bg-white text-[#2d2d2d] px-3 py-1 font-pixel text-[9px] hover:bg-[#F26B4E] hover:text-white">
              📚 TEACHERS
            </Link>
            <Link href="/for-parents" className="pixel-btn bg-white text-[#2d2d2d] px-3 py-1 font-pixel text-[9px] hover:bg-[#FFD54F] hover:text-[#2d2d2d]">
              👨‍👩‍👧 PARENTS
            </Link>
            <Link href="/my-brain" className="pixel-btn bg-white text-[#2d2d2d] px-3 py-1 font-pixel text-[9px] hover:bg-[#5CA4E7] hover:text-white">
              🧠 MY BRAIN
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden pixel-btn bg-white px-2 py-1 font-pixel text-[9px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t-2 border-[#2d2d2d] mt-1">
            <Link href="/games" className="block px-2 py-2 mt-2 hover:bg-[#FFD54F]/50 font-bold text-sm" onClick={() => setMobileMenuOpen(false)}>
              🎮 All Games
            </Link>
            <Link href="/for-teachers" className="block px-2 py-2 hover:bg-[#FFD54F]/50 font-bold text-sm" onClick={() => setMobileMenuOpen(false)}>
              📚 For Teachers
            </Link>
            <Link href="/for-parents" className="block px-2 py-2 hover:bg-[#FFD54F]/50 font-bold text-sm" onClick={() => setMobileMenuOpen(false)}>
              👨‍👩‍👧 For Parents
            </Link>
            <Link href="/my-brain" className="block px-2 py-2 hover:bg-[#FFD54F]/50 font-bold text-sm" onClick={() => setMobileMenuOpen(false)}>
              🧠 My Brain
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
