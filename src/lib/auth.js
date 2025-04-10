import jwt from 'jsonwebtoken';

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    document.cookie = `token=${token}; path=/; max-age=2592000; secure; samesite=strict`;
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') return value;
  }
  return null;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}; 