"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/30 placeholder-white text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/30 placeholder-white text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-white text-indigo-600 hover:bg-indigo-100">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
