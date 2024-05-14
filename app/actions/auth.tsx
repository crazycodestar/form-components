"use server";

import { z } from "zod";

const SignUpFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email.",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Should be atleast 8 characteres long.",
    })
    .regex(/[a-zA-Z]/, {
      message: "Should have atleast one letter.",
    })
    .regex(/[0-9]/, {
      message: "Should have atleast one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Should have atleast one special character",
    })
    .trim(),
});

export async function signUp(_: any, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // fake loading state
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
