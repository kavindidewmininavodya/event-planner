"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("flex items-center gap-2 transition-all", className)}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-4 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="size-4" />
          <span>Copy Link</span>
        </>
      )}
    </Button>
  );
}
