"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUserProfileAction } from "@/lib/actions/user";
import { Save, User, Mail, AlignLeft } from "lucide-react";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
}

export function SettingsForm({ user }: { user: UserProfile }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await updateUserProfileAction(formData);

    if (result?.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } else {
      setMessage({ type: "error", text: result?.error || "Failed to update profile" });
    }

    setLoading(false);
  }

  return (
    <Card className="max-w-2xl mx-auto border-border/40 shadow-xl bg-card/90 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
          <User className="w-6 h-6 text-primary" />
          Profile Settings
        </CardTitle>
        <CardDescription className="text-white/70">
          Update your public profile details. These will be visible to others.
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2 text-white">
            <Label htmlFor="email" className="flex items-center gap-2 text-white">
              <Mail className="w-4 h-4 text-white/60" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue={user.email}
              disabled
              className="bg-white/5 border-border/40 cursor-not-allowed text-white"
            />
            <p className="text-[10px] text-white/50">Email cannot be changed.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-white">
              <User className="w-4 h-4 text-white/60" />
              Display Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              placeholder="Your full name"
              className="border-border/40 focus:ring-primary/20 text-white placeholder:text-white/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2 text-white">
              <AlignLeft className="w-4 h-4 text-white/60" />
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={user.bio || ""}
              placeholder="Tell us a little about yourself"
              rows={4}
              className="resize-none border-border/40 focus:ring-primary/20 text-white placeholder:text-white/30"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-md text-xs font-bold ${
              message.type === "success" 
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                : "bg-destructive/10 text-destructive border border-destructive/20"
            }`}>
              {message.text}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border/20 pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="font-bold flex items-center gap-2 transition-transform active:scale-95"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
