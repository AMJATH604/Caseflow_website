import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AdminAuth = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AdminAuth | null>(null);

/**
 * Admin status is profiles.is_admin, read through the existing
 * public.is_platform_admin() function (the same check the CaseFlow admin
 * dashboard uses). Fails closed: any error means "not an admin".
 */
async function checkAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_platform_admin");
  return !error && data === true;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const resolve = useCallback(async (s: Session | null) => {
    setSession(s);
    setIsAdmin(s ? await checkAdmin() : false);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") void resolve(s);
      else setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [resolve]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return error.message === "Invalid login credentials" ? "That email and password don't match a CaseFlow account." : error.message;
    if (!(await checkAdmin())) {
      await supabase.auth.signOut();
      return "This account isn't a CaseFlow administrator.";
    }
    return null;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return <Ctx.Provider value={{ session, isAdmin, loading, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminAuth outside AdminAuthProvider");
  return v;
}
