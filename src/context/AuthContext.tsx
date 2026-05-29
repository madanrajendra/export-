"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { UserProfile } from "@/types";

// ─── Admin email(s) ──────────────────────────────────────────────────────────
const ADMIN_EMAILS = ["madancse.gcem@gmail.com", "saraagoexim@gmail.com"];
// ─────────────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const isAdminEmail = ADMIN_EMAILS.includes(
          currentUser.email?.toLowerCase() ?? ""
        );

        if (isAdminEmail) {
          // ── Admin path: set profile locally, persist to Firestore in background ──
          const adminProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email ?? "",
            name: currentUser.displayName ?? "Admin",
            role: "admin",
            createdAt: new Date().toISOString(),
          };
          setUserProfile(adminProfile);
          setLoading(false);

          // Non-blocking Firestore write (safe even if offline)
          setDoc(doc(db, "users", currentUser.uid), adminProfile, {
            merge: true,
          }).catch(() => {});

          return;
        }

        // ── Regular user path: fetch from Firestore ──
        try {
          const snap = await getDoc(doc(db, "users", currentUser.uid));
          setUserProfile(snap.exists() ? (snap.data() as UserProfile) : null);
        } catch (err: any) {
          console.warn("Firestore unavailable:", err?.message ?? err);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // isAdmin: Firestore role OR direct email match (works offline)
  const isAdmin =
    userProfile?.role === "admin" ||
    ADMIN_EMAILS.includes(user?.email?.toLowerCase() ?? "");

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
