// File: src/app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-card shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl text-primary">CityConnect</span>
        </div>
        <div className="space-x-4 hidden md:flex">
          <Link href="#features" className="text-foreground hover:text-primary">Features</Link>
          <Link href="#about" className="text-foreground hover:text-primary">About</Link>
          <Link href="#contact" className="text-foreground hover:text-primary">Contact</Link>
        </div>
        <div>
          {user
            ? <Button asChild variant="secondary"><Link href="/login">My Account</Link></Button>
            : <Button asChild><Link href="/login">Login / Register</Link></Button>
          }
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/60 text-white text-center py-20 px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Report Issues. Get Results.</h1>
          <p className="text-lg md:text-xl">CityConnect is your direct line to city services. Submit and track complaints effortlessly, and help build a better community together.</p>
          <div className="space-x-4">
            <Button asChild size="lg"><Link href="/citizen/submit">File a New Complaint</Link></Button>
            <Button asChild variant="secondary" size="lg"><Link href="/login">Login / Register</Link></Button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-20">
          <img src="/city-silhouette.svg" alt="City graphic" className="w-96 h-auto" />
        </div>
      </header>

      {/* Roles Section */}
      <section id="features" className="py-16 px-6 bg-secondary text-secondary-foreground">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8">Access for Everyone</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <RoleCard href="/citizen/dashboard" icon={<Icons.user className="h-8 w-8" />} title="Citizen Portal" description="Submit and track complaints and view your interaction history." />
          <RoleCard href="/department/dashboard" icon={<Icons.building className="h-8 w-8" />} title="Department Login" description="Manage and resolve assigned complaints efficiently." />
          <RoleCard href="/admin/dashboard" icon={<Icons.shield className="h-8 w-8" />} title="Admin Dashboard" description="Monitor city-wide issues and manage platform-wide settings." />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-card text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CityConnect. All rights reserved.
      </footer>
    </div>
  );
}

function RoleCard({ href, icon, title, description }: { href: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <Link href={href}>
      <div className="p-6 bg-card rounded shadow hover:shadow-lg hover:-translate-y-1 transition-transform h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">{icon}</div>
          <h3 className="text-lg font-headline">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
