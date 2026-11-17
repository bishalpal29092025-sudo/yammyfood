
import { SignIn } from "@clerk/react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/"
        appearance={{
          variables: {
            colorPrimary: "#F97316",
            borderRadius: "0.875rem",
          },
        }}
      />
    </main>
  );
}
