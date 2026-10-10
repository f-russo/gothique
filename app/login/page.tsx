import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <FadeIn>
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-foreground">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            The archive has been keeping your place.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-6 shadow-[0_24px_60px_-30px_oklch(0_0_0/90%)]">
          <LoginForm />
        </div>
      </FadeIn>
    </main>
  );
}
