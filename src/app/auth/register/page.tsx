import { Suspense } from 'react';
import { RegisterForm } from "@/components/forms/auth/register-form";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <Suspense fallback={<div>Loading form...</div>}>
                    <RegisterForm />
                </Suspense>
                <div className="text-sm text-center">
                    Already have an account? <a href="/auth/login" className="text-blue-500">Log in</a>
                </div>
            </div>
        </div>
    );
}
