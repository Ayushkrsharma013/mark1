export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import { requireAuthApi } from '@/lib/auth';
import { AgentChat } from '@/components/agents/AgentChat';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentChatPage({ params }: PageProps) {
  const { id } = await params;
  const session = await requireAuthApi();
  const supabase = await createSupabaseServerClientForApi();

  const { data: agent } = await (supabase as any)
    .from('agents')
    .select('*')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single();

  if (!agent) {
    notFound();
  }

  return (
    <div className="h-full">
      <AgentChat agent={agent} />
    </div>
  );
}
