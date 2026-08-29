function toE164(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/[^\d+]/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export async function sendText({
  to,
  content,
}: {
  to: string;
  content: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.QUO_API_KEY;
  const from = process.env.QUO_FROM_NUMBER;
  if (!apiKey || !from) {
    return { ok: false, error: "Text isn't set up yet (missing QUO_API_KEY or QUO_FROM_NUMBER)." };
  }

  const formatted = toE164(to);
  if (!formatted) {
    return { ok: false, error: `Couldn't format "${to}" as a valid US phone number.` };
  }

  try {
    const res = await fetch("https://api.quo.com/v1/messages", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, from, to: [formatted] }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Quo error (${res.status}): ${body}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
