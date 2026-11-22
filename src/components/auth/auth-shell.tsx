"use client";

/**
 * AuthShell — Foundrio split-panel auth layout.
 *
 * Left panel (hidden below md): dark charcoal brand surface with logo,
 * tagline, and a subtle CSS grid/blueprint line pattern.
 * Right panel: clean white/stone form surface.
 *
 * Usage:
 *   <AuthShell>
 *     <YourFormContent />
 *   </AuthShell>
 */
import type { ReactNode } from "react";
import Image from "next/image";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* ── Brand panel ─────────────────────────────────────── */}
      <div
        className="relative hidden md:flex md:w-[42%] lg:w-[38%] flex-col justify-between overflow-hidden"
        style={{ background: "oklch(0.125 0.008 65)" }}
        aria-hidden
      >
        {/* Blueprint grid pattern — hairline lines on dark surface */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.055]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="auth-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#B5472B"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-grid)" />
        </svg>

        {/* Top: Logo */}
        <div className="relative z-10 p-10">
          <Image
            src="/foundrio-logo.jpg"
            alt="Foundrio Design & Consultant"
            width={110}
            height={110}
            className="rounded-sm"
            priority
          />
        </div>

        {/* Bottom: Brand copy */}
        <div className="relative z-10 p-10">
          {/* Section label in Geist Mono uppercase — architectural touch */}
          <p
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "oklch(0.52 0.15 35)" }}
          >
            Design &amp; Consultant
          </p>
          <p
            className="text-2xl leading-snug font-light"
            style={{
              fontFamily: "var(--font-heading, serif)",
              color: "oklch(0.88 0.006 65)",
            }}
          >
            Precision tools for<br />architecture teams.
          </p>
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "oklch(0.55 0.008 65)" }}
          >
            Manage projects, contacts and<br />client communications from one place.
          </p>

          {/* Thin accent rule */}
          <div
            className="mt-8 h-px w-12"
            style={{ background: "oklch(0.52 0.15 35)" }}
          />
        </div>
      </div>

      {/* ── Form panel ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo — shown only when brand panel is hidden */}
        <div className="mb-8 flex flex-col items-center md:hidden">
          <Image
            src="/foundrio-logo.jpg"
            alt="Foundrio Design & Consultant"
            width={72}
            height={72}
            className="rounded-sm"
          />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Design &amp; Consultant
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
