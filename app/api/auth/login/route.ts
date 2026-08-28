import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { passcode } = await req.json();
  const expected = process.env.ADMIN_PASSCODE || "franklin2026";

  if (passcode === expected) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("fe_admin_auth", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  return NextResponse.json({ error: "Incorrect passcode" }, { status: 401 });
}
