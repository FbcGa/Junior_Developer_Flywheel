export const dynamic = "force-dynamic";

import AuthForm from "@/(auth)/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <AuthForm mode="register" />
    </div>
  );
}
