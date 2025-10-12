import "@testing-library/jest-dom";

// Next.js and Node polyfills for test env
import { TextEncoder, TextDecoder } from "node:util";
// @ts-ignore
if (!global.TextEncoder) global.TextEncoder = TextEncoder as any;
// @ts-ignore
if (!global.TextDecoder) global.TextDecoder = TextDecoder as any;

// Mock next/server minimal APIs used in our code when running in jsdom
vi.mock("next/server", async (orig) => {
  const actual = await (orig as any).importActual?.("next/server").catch(() => ({}));
  // Provide a simple NextResponse shim for unit tests
  class NextResponseShim {
    body: any;
    status: number;
    headers: Record<string, string>;
    constructor(body: any, init?: { status?: number; headers?: Record<string, string> }) {
      this.body = body;
      this.status = init?.status ?? 200;
      this.headers = init?.headers ?? {};
    }
    static json(data: any, init?: { status?: number; headers?: Record<string, string> }) {
      return new NextResponseShim(JSON.stringify(data), init);
    }
  }
  return {
    ...(actual || {}),
    NextResponse: (actual as any)?.NextResponse ?? NextResponseShim,
  };
});
