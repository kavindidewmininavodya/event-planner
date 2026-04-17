"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { deleteEventAction } from "@/lib/actions/events";
import { cn } from "@/lib/utils";

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEventAction(eventId);
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
        <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive border border-destructive/20">
          <AlertTriangle className="size-3.5" />
          Are you sure?
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <Loader2 className="size-4 animate-spin" /> : "Confirm Delete"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsConfirming(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setIsConfirming(true)}
      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
    >
      <Trash2 className="mr-2 size-4" />
      Delete Event
    </Button>
  );
}
