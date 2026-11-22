"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPasswordPage");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // The emailed link returns to /auth/callback, which exchanges it
    // for a recovery session and forwards to /reset-password (issue
    // #592). Supabase must allow this origin under Authentication →
    // URL Configuration → Redirect URLs, or it silently falls back to
    // its Site URL; see docs/auth-emails.md.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/reset-password")}`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <AuthShell>
        <div className="w-full max-w-sm text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <h1
            className="mb-2 text-2xl font-normal text-foreground"
            style={{ fontFamily: "var(--font-heading, serif)" }}
          >
            {t("checkEmailTitle")}
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {t.rich("checkEmailDesc", {
              email,
              strong: (chunks) => (
                <span className="text-foreground">{chunks}</span>
              ),
            })}
          </p>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {t("backToSignIn")}
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          Account Recovery
        </p>
        <h1
          className="mb-1 text-2xl font-normal text-foreground"
          style={{ fontFamily: "var(--font-heading, serif)" }}
        >
          {t("title")}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {t("desc")}
        </p>

        <form onSubmit={handleReset} className="flex flex-col gap-5">
          {error && (
            <div className="rounded border border-status-critical/30 bg-status-critical/10 px-4 py-3 text-sm text-status-critical">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t("emailLabel")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-1 h-10 w-full bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? t("sending") : t("sendLink")}
          </Button>
        </form>

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToSignIn")}
        </Link>
      </div>
    </AuthShell>
  );
}

