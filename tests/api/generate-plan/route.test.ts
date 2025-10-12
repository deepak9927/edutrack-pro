import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/generate-plan/route";

// Mock the Google Generative AI SDK to avoid external calls
vi.mock("@google/generative-ai", () => {
  let mockGenerateContent = vi.fn();
  let mockGetGenerativeModel = vi.fn(() => ({ generateContent: mockGenerateContent }));
  const GoogleGenerativeAI = vi.fn(() => ({ getGenerativeModel: mockGetGenerativeModel }));
  return { GoogleGenerativeAI, mockGenerateContent, mockGetGenerativeModel };
});

// Utilities to work with NextResponse or our shim
async function getStatus(res: any): Promise<number> {
  if (typeof res?.status === "number") return res.status;
  return (res as Response).status;
}

async function getText(res: any): Promise<string> {
  if (typeof (res as any)?.text === "function") return await (res as Response).text();
  if (typeof (res as any)?.body !== "undefined") return String((res as any).body);
  return "";
}

async function getJson<T = unknown>(res: any): Promise<T | undefined> {
  if (typeof (res as any)?.json === "function") return ((res as Response).json() as unknown) as Promise<T>;
  const t = await getText(res);
  try {
    return JSON.parse(t) as T;
  } catch {
    return undefined;
  }
}

// Helper to construct a minimal NextRequest-like object
const makeReq = (body: any) => ({
  json: async () => body,
}) as any;

const validBody = {
  subject: "Next.js",
  goal: "Build a full-stack application",
  duration: 4,
};

let originalKey: string | undefined;

beforeEach(() => {
  originalKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = "test-api-key";
  vi.clearAllMocks();
});

afterEach(() => {
  process.env.GEMINI_API_KEY = originalKey;
});

describe("POST /api/generate-plan", () => {
  it("returns 400 when body fails validation (ZodError)", async () => {
    const badBody = { ...validBody, goal: "too short" }; // min 10
    const res = await POST(makeReq(badBody));
    expect(await getStatus(res)).toBe(400);
    const text = await getText(res);
    expect(text).toMatch(/String must contain at least|Too short/i);
  });

  it("returns 500 when GEMINI_API_KEY is missing", async () => {
    delete process.env.GEMINI_API_KEY;
    const res = await POST(makeReq(validBody));
    expect(await getStatus(res)).toBe(500);
    const text = await getText(res);
    expect(text).toContain("Missing Gemini API Key");
  });

  it("returns 500 when the model.generateContent throws", async () => {
    const { mockGenerateContent } = await import("@google/generative-ai");
    mockGenerateContent.mockRejectedValueOnce(new Error("boom"));

    const res = await POST(makeReq(validBody));
    expect(await getStatus(res)).toBe(500);
    const text = await getText(res);
    expect(text).toContain("Internal Server Error");
  });

  it("creates a model and returns the generated plan JSON", async () => {
    const { mockGenerateContent } = await import("@google/generative-ai");
    mockGenerateContent.mockResolvedValueOnce({
      response: { text: () => "Week 1: Basics\nWeek 2: Advanced" },
    });

    const res = await POST(makeReq(validBody));
    expect(await getStatus(res)).toBe(200);
    const data = await getJson<{ plan: string }>(res);
    expect(data).toBeDefined();
    expect(data!.plan).toContain("Week 1");
  });

  it("uses the 'gemini-pro' model and passes a well-formed prompt", async () => {
    const { mockGenerateContent, mockGetGenerativeModel } = await import("@google/generative-ai");
    mockGenerateContent.mockResolvedValueOnce({ response: { text: () => "Plan" } });

    await POST(makeReq(validBody));

    // Model selection
    expect(mockGetGenerativeModel).toHaveBeenCalledTimes(1);
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: "gemini-pro" });

    // Prompt contents
    const promptArg = mockGenerateContent.mock.calls[0][0];
    expect(promptArg).toContain("Create a detailed study plan");
    expect(promptArg).toContain(validBody.subject);
    expect(promptArg).toContain(validBody.goal);
    expect(promptArg).toContain(String(validBody.duration));
  });

  it("initializes GoogleGenerativeAI with the API key", async () => {
    const { GoogleGenerativeAI, mockGenerateContent } = await import("@google/generative-ai");
    mockGenerateContent.mockResolvedValueOnce({ response: { text: () => "Plan" } });

    await POST(makeReq(validBody));

    expect(GoogleGenerativeAI).toHaveBeenCalledWith("test-api-key");
  });
});
