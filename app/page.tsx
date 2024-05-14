"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Errors } from "@/components/errors";

import { signUp } from "@/app/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

const initialState = {
  message: null,
  errors: null,
};

export default function Home() {
  const [state, formAction] = useFormState(signUp, initialState);
  const { pending } = useFormStatus();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="johndoe@acme.com"
                required
              />
              {state?.errors?.email && <Errors>{state.errors.email}</Errors>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setIsPasswordVisible((init) => !init)}
                >
                  <p className="underline text-sm font-medium">
                    {isPasswordVisible ? "Hide" : "Show"}
                  </p>
                </button>
              </div>
              {state?.errors?.password && (
                <Errors>{state.errors.password}</Errors>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button aria-disabled={pending} className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
