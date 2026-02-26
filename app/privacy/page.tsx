import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Pini's privacy policy. Learn how we handle your data, cookies, and children's privacy (COPPA compliance).",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">Privacy Policy</span>
      </nav>

      <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-6">
        PRIVACY POLICY
      </h1>

      <div className="pixel-border bg-white p-5 sm:p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
        <p className="text-xs text-gray-400">
          Last updated: February 2026
        </p>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            1. WHO WE ARE
          </h2>
          <p>
            Pini (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a free
            educational gaming platform for children and students in grades K-12.
            Our website is located at{" "}
            <strong>https://pini.vercel.app</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            2. INFORMATION WE COLLECT
          </h2>
          <p className="mb-2">
            Pini is designed with privacy in mind. We do <strong>not</strong>{" "}
            require user accounts, logins, or personal information to use our
            service.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>No personal data collected:</strong> We do not collect
              names, emails, addresses, or any personally identifiable
              information.
            </li>
            <li>
              <strong>Local storage only:</strong> Game progress and Brain Score
              data are stored locally on your device using browser localStorage.
              This data never leaves your device and is not transmitted to our
              servers.
            </li>
            <li>
              <strong>No user accounts:</strong> There is no registration or
              sign-up process.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            3. COOKIES AND TRACKING
          </h2>
          <p className="mb-2">We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Google Analytics:</strong> We use Google Analytics to
              understand how visitors use our site (e.g., which pages are
              visited, general location data). Google Analytics uses cookies to
              collect anonymous usage data. No personally identifiable
              information is collected.
            </li>
            <li>
              <strong>Google AdSense:</strong> We display advertisements through
              Google AdSense. Google may use cookies to serve ads based on prior
              visits. Because our site is directed at children, we have enabled
              child-directed treatment (TFCD) which disables personalized
              advertising.
            </li>
            <li>
              <strong>Game Distribution:</strong> Games are embedded via iframes
              from gamedistribution.com. These games may use their own cookies
              and tracking. Please refer to GameDistribution&apos;s privacy
              policy for details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            4. CHILDREN&apos;S PRIVACY (COPPA)
          </h2>
          <p className="mb-2">
            We take children&apos;s privacy seriously. Pini is designed for use
            by children under 13 and complies with the Children&apos;s Online
            Privacy Protection Act (COPPA):
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              We do <strong>not</strong> knowingly collect personal information
              from children under 13.
            </li>
            <li>
              We do <strong>not</strong> require any registration or account
              creation.
            </li>
            <li>
              All advertising on our site is treated as child-directed content
              (TFCD tag enabled), meaning personalized ads are disabled.
            </li>
            <li>
              Brain Score and game progress data is stored only in the
              user&apos;s browser (localStorage) and is never sent to our
              servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            5. THIRD-PARTY LINKS AND CONTENT
          </h2>
          <p>
            Our site embeds games from third-party providers
            (gamedistribution.com). We are not responsible for the privacy
            practices of these third parties. We encourage parents to review the
            privacy policies of any third-party services their children access.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            6. DATA SECURITY
          </h2>
          <p>
            Since we do not collect personal data on our servers, data security
            risks are minimal. All Brain Score data is stored locally in your
            browser and can be cleared at any time by clearing your browser data.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            7. YOUR RIGHTS
          </h2>
          <p>
            You can clear all locally stored data (Brain Score, game progress) at
            any time by clearing your browser&apos;s localStorage. Since we do
            not collect personal information on our servers, there is no personal
            data for us to delete.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            8. CHANGES TO THIS POLICY
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes will
            be posted on this page with an updated date. Continued use of Pini
            after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
            9. CONTACT US
          </h2>
          <p>
            If you have questions about this privacy policy, please visit our{" "}
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
