import { ArrowRight, Check, TrendingUp, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-white">credex</span>
          </div>
          <Link href="/audit">
            <Button className="gap-2">
              Start Audit <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/10 dark:to-blue-950/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-block">
              <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-500/20">
                ✨ Free AI Spend Audit
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Stop overspending on AI tools
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Get a personalized audit of your AI tool stack in seconds. Discover hidden savings, eliminate redundancy, and optimize your team&apos;s efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/audit">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  Start Free Audit <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                See Example Report
              </Button>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Takes &lt;3 seconds &bull; No credit card required &bull; Instant results
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">$2.4K</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">avg. annual savings per user</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">28%</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">teams have tool overlap</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">45sec</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">average audit time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Three simple steps to audit your AI spend
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Enter your tools',
                description: 'Add your AI subscriptions: ChatGPT, Claude, Cursor, GitHub Copilot, and more.',
                icon: Zap,
              },
              {
                step: 2,
                title: 'Get instant analysis',
                description: 'Our AI engine analyzes pricing, usage patterns, and team size to find savings.',
                icon: BarChart3,
              },
              {
                step: 3,
                title: 'Capture savings',
                description: 'See recommendations, share results, and connect with Credex to optimize further.',
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="p-6 sm:p-8 relative border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  
                  <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4 mt-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Comprehensive analysis
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to make smarter AI spending decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              'Per-tool pricing recommendations',
              'Team size benchmarking',
              'Redundancy detection',
              'Vendor comparison analysis',
              'Alternative tool suggestions',
              'AI-powered insights',
              'Shareable audit reports',
              'Annual savings projection',
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-zinc-700 dark:text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Trusted by founders
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              See what teams are discovering
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Founder, AI Startup',
                quote: 'Found $3,200/year in redundant subscriptions. Game-changing.',
                avatar: '👩‍💼',
              },
              {
                name: 'Marcus Johnson',
                role: 'Engineering Lead',
                quote: 'Identified overlapping tools I didn\'t even know about. Very insightful.',
                avatar: '👨‍💻',
              },
              {
                name: 'Alex Rivera',
                role: 'CFO, B2B SaaS',
                quote: 'Finally have visibility into our AI tool spend. Fantastic tool.',
                avatar: '👨‍✈️',
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Questions?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What AI tools are supported?',
                a: 'We support ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, Windsurf, and API direct access (OpenAI, Anthropic).',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We encrypt all audit data, never share it with third parties, and delete it after 90 days. No login required.',
              },
              {
                q: 'How accurate are the recommendations?',
                a: 'Our engine uses real-time pricing from official vendor pages and industry benchmarks. Recommendations are defensible and based on actual usage patterns.',
              },
              {
                q: 'Can I share my audit?',
                a: 'Absolutely. Each audit gets a unique shareable link with your results (company name and email are hidden from the public version).',
              },
              {
                q: 'What does Credex do?',
                a: 'Credex negotiates directly with AI vendors to unlock discounts on credits. For audits showing >$500/mo savings, we can help you capture more of those savings.',
              },
            ].map((item, idx) => (
              <details key={idx} className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer transition-colors">
                <summary className="flex items-center justify-between font-semibold text-zinc-900 dark:text-white">
                  {item.q}
                  <span className="text-zinc-400 group-open:rotate-180 transition-transform" aria-label="expand">
    &dtrif;
  </span>
                </summary>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Ready to audit your AI spend?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Get instant recommendations and start saving in less than a minute.
          </p>
          <Link href="/audit">
            <Button size="lg" className="h-12 px-8 text-base gap-2">
              Start Free Audit <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No credit card required • Results in &lt;3 seconds • Always free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white mb-4">Product</p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Audit Tool</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white mb-4">Company</p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white mb-4">Follow</p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>&copy; 2026 Credex. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">credex</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}