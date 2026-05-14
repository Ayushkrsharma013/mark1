import { NextResponse } from 'next/server';
import { getAllSkills } from '@/lib/skills/registry';

export async function GET() {
  try {
    const skills = getAllSkills();
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
