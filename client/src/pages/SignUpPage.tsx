
import { SignUp } from "@clerk/react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
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
