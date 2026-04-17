import type { Metadata } from "next";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authclient } from "@/lib/auth/client";
import { AdaptiveHeader } from "@/components/adaptive-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Planner | Manage Your Events",
  description: "A professional platform for planning and managing your events with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <NeonAuthUIProvider authClient={authclient as any} credentials={{ forgotPassword: true }}>
          <AdaptiveHeader />

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-8">
            {children}
          </main>

          <footer className="border-t border-border/20 py-4 bg-surface/5">
            <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Event Planner.
            </div>
          </footer>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
