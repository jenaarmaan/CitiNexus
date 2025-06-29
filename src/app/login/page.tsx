// src/app/login/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  loginUser,
  registerUser,
  getUserRoleAsync,
  logoutUser
} from '@/lib/firebaseAuth';
import { getDashboardRoute } from '@/lib/roles';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'citizen' | 'department' | 'admin'>('citizen');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const redirectToDashboard = async (uid: string) => {
    const r = await getUserRoleAsync(uid);
    if (r) router.push(getDashboardRoute(r));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const u = await loginUser(email, password);
      await redirectToDashboard(u.uid);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const u = await registerUser(email, password, role, name);
      await redirectToDashboard(u.uid);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-2">Hello, {user.email}</h2>
        <div className="space-x-4">
          <Button onClick={() => redirectToDashboard(user.uid)}>Go to Dashboard</Button>
          <Button variant="destructive" onClick={logoutUser}>Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="bg-card p-8 rounded shadow max-w-md w-full space-y-4">
        <h2 className="text-2xl font-headline">{mode === 'login' ? 'Login' : 'Create Account'}</h2>

        {mode === 'register' && (
          <>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full rounded" required />
            <select value={role} onChange={e => setRole(e.target.value as any)} className="border p-2 w-full rounded">
              <option value="citizen">Citizen</option>
              <option value="department">Department Staff</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full rounded" required />
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          {mode === 'login' ? 'Login' : 'Register'}
        </Button>

        <p className="text-sm text-center">
          {mode === 'login' ? (
            <>New user? <span className="text-primary cursor-pointer" onClick={() => setMode('register')}>Register here</span></>
          ) : (
            <>Already have an account? <span className="text-primary cursor-pointer" onClick={() => setMode('login')}>Login here</span></>
          )}
        </p>
      </form>
    </div>
  );
}
