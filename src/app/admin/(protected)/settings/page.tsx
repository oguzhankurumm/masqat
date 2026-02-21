"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <Button variant="destructive" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
