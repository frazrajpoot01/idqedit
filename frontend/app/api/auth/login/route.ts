import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET || 'supersecretjwtkey',
        { expiresIn: '1d' }
      );
      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
