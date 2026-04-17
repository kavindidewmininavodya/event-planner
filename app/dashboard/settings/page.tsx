import { getUserProfile } from "@/lib/actions/user";
import { SettingsForm } from "@/components/settings-form";
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Settings className="w-6 h-6 text-primary" />
            Settings
          </h1>
          <p className="text-sm text-white/60">Manage your account and profile settings.</p>
        </div>
      </div>

      <div className="py-8">
        <SettingsForm user={user} />
      </div>
    </div>
  );
}
