import jwt from 'jsonwebtoken';

export function verifyAuth(request: Request): any {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No authorization header');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
