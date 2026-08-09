import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET() {
  try {
    const totalVisits = await storage.getVisits();
    return NextResponse.json({ total_visits: totalVisits });
  } catch (error) {
    console.error('Failed to get visits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const totalVisits = await storage.incrementVisits();
    return NextResponse.json({ total_visits: totalVisits });
  } catch (error) {
    console.error('Failed to increment visits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
