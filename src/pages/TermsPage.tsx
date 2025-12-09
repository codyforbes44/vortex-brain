import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';

const TermsPage = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Use"
        description="Read Vortex's terms of use to understand your rights and responsibilities when using our AI-powered knowledge management platform."
        keywords="terms of use, terms of service, user agreement, Vortex terms"
      />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 9, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 mb-4">
                By accessing or using Vortex ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-foreground/80 mb-4">
                Vortex is an AI-powered personal knowledge management platform that helps you collect, organize, search, and interact with your personal knowledge base. Features include note management, AI-powered search, and various organizational tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Terms</h2>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>You must be at least 13 years old to use this Service</li>
                <li>You must provide accurate and complete registration information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-medium mb-3">Subscriptions</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Some features require a paid subscription</li>
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3">Cancellation</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>You may cancel your subscription at any time</li>
                <li>Cancellation will take effect at the end of your current billing period</li>
                <li>You will retain access to paid features until the end of your billing period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
              <p className="text-foreground/80 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground/80">
                <li>Use the Service for any illegal purpose</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Resell or redistribute the Service without permission</li>
                <li>Use the Service to harass, abuse, or harm others</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <h3 className="text-xl font-medium mb-3">Your Content</h3>
              <p className="text-foreground/80 mb-4">
                You retain ownership of all content you upload to Vortex. By using our Service, you grant us a limited license to store, process, and display your content as necessary to provide the Service.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Our Content</h3>
              <p className="text-foreground/80 mb-4">
                The Vortex platform, including its design, code, and branding, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
              <p className="text-foreground/80 mb-4">
                Your use of the Service is also governed by our Privacy Policy. By using Vortex, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-foreground/80 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-foreground/80 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <p className="text-foreground/80 mb-4">
                We may terminate or suspend your account at any time for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease. You may export your data before termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="text-foreground/80 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
              <p className="text-foreground/80 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="text-foreground/80 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-foreground/80">
                <strong>Email:</strong> legal@vortex.app
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;
