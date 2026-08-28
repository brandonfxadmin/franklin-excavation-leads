"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(params.get("next") || "/dashboard");
      router.refresh();
    } else {
      setError("Incorrect passcode. Try again.");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 80 }}>
      <div className="card">
        <h1>Franklin Excavation</h1>
        <p className="subtitle">Lead portal — staff access</p>
        <form onSubmit={handleSubmit}>
          <label>Passcode</label>
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            autoFocus
          />
          {error && <div className="error-text">{error}</div>}
          <div style={{ marginTop: 18 }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Enter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
