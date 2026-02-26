import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Pini team. Questions, feedback, or partnership inquiries — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">Contact</span>
      </nav>

      <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-6">
        CONTACT US
      </h1>

      <div className="pixel-border bg-white p-5 sm:p-8 mb-8">
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Have a question, feedback, or suggestion? We&apos;d love to hear from
          you! Reach out to us using any of the methods below.
        </p>

        <div className="space-y-4">
          <div className="pixel-border bg-[#5CA4E7]/10 p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">📧</span>
            <div>
              <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-1">
                EMAIL
              </h2>
              <p className="text-sm text-gray-600">
                <a
                  href="mailto:thesiskim@naver.com"
                  className="text-[#5CA4E7] hover:underline font-bold"
                >
                  thesiskim@naver.com
                </a>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                We typically respond within 1-2 business days.
              </p>
            </div>
          </div>

          <div className="pixel-border bg-[#FFD54F]/10 p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">💡</span>
            <div>
              <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-1">
                SUGGESTIONS
              </h2>
              <p className="text-sm text-gray-600">
                Have a game suggestion or feature idea? Email us with the subject
                line &quot;Game Suggestion&quot; or &quot;Feature Request&quot;.
              </p>
            </div>
          </div>

          <div className="pixel-border bg-[#F26B4E]/10 p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">🐛</span>
            <div>
              <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-1">
                BUG REPORTS
              </h2>
              <p className="text-sm text-gray-600">
                Found a broken game or a technical issue? Let us know! Please
                include the game name and what went wrong so we can fix it
                quickly.
              </p>
            </div>
          </div>

          <div className="pixel-border bg-[#2d2d2d] p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">🤝</span>
            <div>
              <h2 className="font-pixel text-[10px] text-[#FFD54F] mb-1">
                PARTNERSHIPS
              </h2>
              <p className="text-sm text-gray-300">
                Interested in partnering with Pini? Schools, educational
                organizations, and game developers are welcome to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ shortcut */}
      <div className="text-center pixel-border bg-[#FFD54F]/20 p-6">
        <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
          HAVE A COMMON QUESTION?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Check our Parents page for frequently asked questions about safety,
          privacy, and how Pini works.
        </p>
        <Link
          href="/for-parents"
          className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-6 py-2 font-pixel text-[10px] inline-block"
        >
          ★ VIEW FAQ ★
        </Link>
      </div>
    </div>
  );
}
