import { supabase } from '@/lib/supabase/server';
import { AuditRecommendation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from('leads')
    .select('total_monthly_savings, total_annual_savings')
    .eq('share_url', params.slug)
    .single();

  return {
    title: `AI Spend Audit Results - $${data?.total_monthly_savings || 0}/mo savings`,
    description: `Check out my AI tool spending audit: Potential savings $${data?.total_annual_savings || 0}/year`,
    openGraph: {
      title: `AI Spend Audit Results`,
      description: `Potential annual savings: $${data?.total_annual_savings || 0}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `I just audited my AI spend...`,
      description: `Potential savings: $${data?.total_monthly_savings || 0}/month`,
    },
  };
}

export default async function SharePage({ params }: { params: Promise<{ slug: string }> }) {
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('share_url', (await params).slug)
    .single();

  if (error || !lead) {
    console.log('Lead not found for slug:', (await params).slug, 'Error:', error);
    return <div className="p-6 text-center">Audit not found</div>;
  }

  const results = lead.audit_results as AuditRecommendation[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <Card className="p-8 mb-6 text-center bg-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ${lead.total_monthly_savings.toFixed(0)}/month
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Potential monthly AI spend savings
          </p>
          <p className="text-2xl font-semibold text-green-600">
            ${lead.total_annual_savings.toFixed(0)}/year
          </p>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {results.map((result, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{result.toolName}</h3>
                <Badge variant="outline" className="text-green-600">
                  Save ${result.monthlySavings}/mo
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Current:</strong> ${result.currentSpend}/mo
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Action:</strong> {result.recommendedAction}
              </p>
              <p className="text-sm text-gray-500 italic">{result.reasoning}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        {lead.total_monthly_savings > 500 && (
          <Card className="p-6 mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <h4 className="font-semibold mb-2">Ready to capture these savings?</h4>
            <p className="text-sm text-gray-700 mb-4">
              Credex negotiates directly with vendors to unlock these discounts.
            </p>
            <a
              href="https://calendly.com/credex/consultation"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Book a consultation
            </a>
          </Card>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Share this audit: {process.env.NEXT_PUBLIC_VERCEL_URL}/share/{lead.share_url}
        </p>
      </div>
    </div>
  );
}