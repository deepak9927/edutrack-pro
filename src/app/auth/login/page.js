import { LoginForm } from "@/components/forms/auth/login-form";
import { Suspense } from "react"; // Import Suspense

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <LoginForm />
        </Suspense>
        <div className="text-sm text-center">
          Don't have an account? <a href="/auth/register" className="text-blue-500">Sign up</a>
        </div>
      </div>
    </div>
  );
}
