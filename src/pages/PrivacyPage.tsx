import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy"
        description="Read Vortex's privacy policy to understand how we collect, use, and protect your personal data in our AI-powered knowledge management platform."
        keywords="privacy policy, data protection, GDPR, user privacy, Vortex privacy"
      />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 9, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-foreground/80 mb-4">
                Welcome to Vortex ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered knowledge management platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Email address and name when you create an account</li>
                <li>Profile information you choose to provide</li>
                <li>Payment information when you subscribe to premium plans</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3">Usage Data</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Content you save, organize, and manage within Vortex</li>
                <li>Search queries and interactions with our AI features</li>
                <li>Device information, IP address, and browser type</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-foreground/80 mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information and updates</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
              <p className="text-foreground/80 mb-4">
                Your data is stored securely using industry-standard encryption and security practices. We use secure cloud infrastructure to ensure your information is protected against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
              <p className="text-foreground/80 mb-4">We may use third-party services that collect information, including:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li><strong>Authentication providers:</strong> For secure login (Google, etc.)</li>
                <li><strong>Payment processors:</strong> Stripe for secure payment handling</li>
                <li><strong>AI services:</strong> To power our intelligent features</li>
                <li><strong>Analytics:</strong> To understand how our platform is used</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="text-foreground/80 mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-foreground/80 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Access, update, or delete your personal information</li>
                <li>Export your data at any time</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how your data is processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
              <p className="text-foreground/80 mb-4">
                We retain your personal information only for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your data within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-foreground/80 mb-4">
                Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-foreground/80 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-foreground/80 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-foreground/80">
                <strong>Email:</strong> privacy@vortex.app
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
