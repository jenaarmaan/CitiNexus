// File: src/lib/firebaseAuth.ts
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { roleRedirectMap } from "./roles";

const db = getFirestore();

export async function register(
  name: string,
  email: string,
  password: string,
  role: string
): Promise<User> {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await setDoc(doc(db, "users", user.uid), {
    email,
    role,
    name,
    createdAt: new Date().toISOString(),
  });
  return user;
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function getUserRole(uid: string): Promise<string | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data().role as string) ?? null : null;
}
