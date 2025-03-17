import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/next_components/form-message";
import { SubmitButton } from "@/components/next_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-center overflow-hidden">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <form className="flex flex-col items-center min-w-64 max-w-64">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>

        <div className="flex flex-col gap-2 mt-8 w-full">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

      <div className="mt-4">
        <SmtpMessage />
      </div>
    </div>
  );
}
