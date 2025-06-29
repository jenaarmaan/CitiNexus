// File: src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout, getUserRole } from "@/lib/firebaseAuth";
import { roleRedirectMap } from "@/lib/roles";

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <header className="w-full bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          CityConnect
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                const role = await getUserRole(user.uid);
                if (role) window.location.href = roleRedirectMap[role];
              }}
              className="text-sm px-4 py-2 rounded bg-primary text-white"
            >
              Go to Dashboard
            </button>
            <button
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
              className="text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded bg-primary text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
