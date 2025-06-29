//src/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/firebaseAuth';
import { roleRedirectMap } from '@/lib/roles';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('citizen');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = await register(name, email, password, role);
      const redirect = roleRedirectMap[role];
      router.push(redirect);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto mt-10 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="border p-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="citizen">Citizen</option>
        <option value="admin">Admin</option>
        <option value="department">Department</option>
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  );
}
