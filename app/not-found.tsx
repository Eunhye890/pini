import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-checker px-4">
      <div className="text-center max-w-md">
        {/* Pixel 404 */}
        <div className="font-pixel text-6xl sm:text-8xl text-[#F26B4E] mb-4">404</div>
        <div className="text-5xl mb-4">👾</div>
        <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-3">
          PAGE NOT FOUND
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Oops! This page escaped to another dimension. Let&apos;s get you back to the games!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="pixel-btn bg-[#5CA4E7] text-white px-6 py-2 font-pixel text-[10px]"
          >
            HOME
          </Link>
          <Link
            href="/games"
            className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-6 py-2 font-pixel text-[10px]"
          >
            ALL GAMES
          </Link>
        </div>
      </div>
    </div>
  );
}
