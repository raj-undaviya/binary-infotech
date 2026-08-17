"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin } from "@/app/actions";
import { Lock, User, Loader2, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      disabled={pending}
      className="w-full justify-center text-xs py-3.5"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
          Signing In...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleAction(formData: FormData) {
    setError(null);
    const result = await loginAdmin(null, formData);
    
    if (result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Authentication failed.");
    }
  }

  return (
    <Card variant="default" className="p-8 sm:p-10 border border-border relative bg-surface/50 backdrop-blur-sm card-border">
      <div className="absolute inset-0 bg-accent/5 rounded-2xl filter blur-xl pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="mx-auto w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 shadow-sm">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-lg font-extrabold text-foreground tracking-tight">Admin Authentication</h1>
        <p className="text-xs text-muted mt-1">Binary Infotech Corporate Access</p>
      </div>

      <form action={handleAction} className="space-y-5 relative z-10">
        {/* Username */}
        <div className="space-y-1.5">
          <label htmlFor="username" className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter admin username"
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter admin password"
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-semibold text-center">
            {error}
          </div>
        )}

        <SubmitButton />
      </form>

      {/* Tip Banner */}
      {/* <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/15 text-[11px] text-muted leading-relaxed text-center font-medium">
        <span className="font-bold text-accent block mb-1">Development Mode Credentials:</span>
        Use <code className="text-foreground font-mono bg-background border border-border px-1 py-0.5 rounded">admin</code> / <code className="text-foreground font-mono bg-background border border-border px-1 py-0.5 rounded">admin123</code> to authenticate.
      </div> */}
    </Card>
  );
}
