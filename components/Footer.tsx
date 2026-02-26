import Link from "next/link";
import Image from "next/image";
import { categories, gradeLevels } from "@/lib/games";

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-[#FFF8E7] mt-12 pixel-border-sm" style={{ borderBottom: "none", borderLeft: "none", borderRight: "none", borderColor: "#FFD54F" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/pini_ch.png" alt="Pini" width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
              <span className="font-pixel text-sm text-[#FFD54F]">Pini</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free games for all ages. No sign-up needed!
            </p>
            <div className="mt-3 pixel-tag bg-[#F26B4E] text-white inline-block">
              100% FREE
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-pixel text-[9px] text-[#FFD54F] mb-3">GAME TYPE</h3>
            <ul className="space-y-1.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.id}`} className="hover:text-[#FFD54F] transition-colors">
                    {cat.emoji} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Grade Levels */}
          <div>
            <h3 className="font-pixel text-[9px] text-[#FFD54F] mb-3">MY AGE</h3>
            <ul className="space-y-1.5 text-sm">
              {gradeLevels.map((grade) => (
                <li key={grade.level}>
                  <Link href={`/grade/${grade.level}`} className="hover:text-[#FFD54F] transition-colors">
                    Lv.{grade.level} {grade.name} ({grade.ageRange})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Pages */}
          <div>
            <h3 className="font-pixel text-[9px] text-[#FFD54F] mb-3">MORE</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/my-brain" className="hover:text-[#FFD54F] transition-colors">
                  🧠 My Brain
                </Link>
              </li>
              <li>
                <Link href="/for-teachers" className="hover:text-[#FFD54F] transition-colors">
                  📚 For Teachers
                </Link>
              </li>
              <li>
                <Link href="/for-parents" className="hover:text-[#FFD54F] transition-colors">
                  👨‍👩‍👧 For Parents
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD54F] transition-colors">
                  ℹ️ About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD54F] transition-colors">
                  📧 Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="flex justify-center gap-4 mb-3 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-[#FFD54F] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="hover:text-[#FFD54F] transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="font-pixel text-[8px] text-gray-500">
            &copy; {new Date().getFullYear()} PINI &middot; FREE GAMES FOR ALL
          </p>
        </div>
      </div>
    </footer>
  );
}
