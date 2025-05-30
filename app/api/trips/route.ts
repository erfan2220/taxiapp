import { NextResponse } from 'next/server';

let trips: any[] = []; // فعلاً حافظه‌ای - بعداً وصلش می‌کنیم به DB

export async function GET() {
    return NextResponse.json(trips);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTrip = {
        id: Date.now(), // شناسه موقت
        ...body,
    };
    trips.push(newTrip);
    return NextResponse.json(newTrip, { status: 201 });
}
