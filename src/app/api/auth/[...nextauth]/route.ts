import { NextResponse } from "next/server";

// Top-level exports must exist for Next.js; at runtime we require the real
// handler module and proxy the incoming requests. This avoids conditional
// exports (which TypeScript/ESM disallow) while still supporting dynamic
// initialization in `src/lib/auth/auth.ts`.

async function getAuthModule() {
  try {
    // Use require to avoid async ESM issues at build-time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("@/lib/auth/auth");
    return mod;
  } catch (e) {
    console.error("[NEXTAUTH_REQUIRE_ERROR]", e);
    return null;
  }
}

export async function GET(request: Request) {
  const mod = await getAuthModule();
  if (!mod) {
    return NextResponse.json({ message: "NextAuth initialization failed" }, { status: 500 });
  }

  // prefer handlers object
  const handler = mod.handlers?.GET ?? mod.GET;
  if (typeof handler === "function") {
    return handler(request);
  }
  return NextResponse.json({ message: "NextAuth GET handler not available" }, { status: 500 });
}

export async function POST(request: Request) {
  const mod = await getAuthModule();
  if (!mod) {
    return NextResponse.json({ message: "NextAuth initialization failed" }, { status: 500 });
  }

  const handler = mod.handlers?.POST ?? mod.POST;
  if (typeof handler === "function") {
    return handler(request);
  }
  return NextResponse.json({ message: "NextAuth POST handler not available" }, { status: 500 });
}