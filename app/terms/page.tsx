import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Pini's terms of service. Rules and conditions for using our free educational gaming platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">Terms of Service</span>
      </nav>

      <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-6">
        TERMS OF SERVICE
      </h1>

      <div className="pixel-border bg-white p-5 sm:p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
        <p className="text-xs text-gray-400">
          Last updated: February 2026
        </p>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            1. ACCEPTANCE OF TERMS
          </h2>
          <p>
            By accessing and using Pini (&quot;the Service&quot;), you agree to
            be bound by these Terms of Service. If you do not agree to these
            terms, please do not use the Service. If you are under 18, you should
            review these terms with a parent or guardian.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            2. DESCRIPTION OF SERVICE
          </h2>
          <p>
            Pini is a free educational gaming platform that provides access to
            brain-training games for children and students in grades K-12. All
            games are provided free of charge with no registration required.
            Games are embedded from third-party providers via iframes.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            3. FREE SERVICE
          </h2>
          <p>
            Pini is and will remain free to use. We do not charge any fees for
            access to games or features. The service is supported by
            advertisements displayed through Google AdSense.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            4. USER CONDUCT
          </h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              Use the Service for any unlawful purpose or in violation of any
              applicable laws.
            </li>
            <li>
              Attempt to interfere with or disrupt the Service or its servers.
            </li>
            <li>
              Use automated tools to scrape, crawl, or extract content from the
              Service.
            </li>
            <li>
              Attempt to bypass any security measures or access restrictions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            5. INTELLECTUAL PROPERTY
          </h2>
          <p>
            The Pini brand, logo, design, and website code are our intellectual
            property. Individual games hosted on the platform are the property of
            their respective developers and are provided through
            gamedistribution.com. You may not copy, modify, or distribute our
            website content without permission.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            6. THIRD-PARTY CONTENT
          </h2>
          <p>
            Games on Pini are provided by third-party developers via
            gamedistribution.com. We do not create or control these games and are
            not responsible for their content, functionality, or any issues
            arising from their use. While we review games for appropriateness, we
            cannot guarantee that all game content meets every standard.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            7. DISCLAIMER OF WARRANTIES
          </h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied. We do not guarantee that the Service will be uninterrupted,
            error-free, or free of harmful components. Game availability and
            functionality may change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            8. LIMITATION OF LIABILITY
          </h2>
          <p>
            To the fullest extent permitted by law, Pini shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages
            arising from your use of or inability to use the Service. Our total
            liability shall not exceed the amount you paid to us (which is $0, as
            the Service is free).
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            9. LOCAL DATA STORAGE
          </h2>
          <p>
            Brain Score and game progress data are stored locally in your browser
            using localStorage. This data is not backed up and may be lost if you
            clear your browser data. We are not responsible for any loss of
            locally stored data.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            10. CHANGES TO TERMS
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be posted on this page with an updated date. Continued use of the
            Service after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            11. CONTACT
          </h2>
          <p>
            For questions about these terms, please visit our{" "}
            <Link href="/contact" className="text-[#5CA4E7] hover:underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
