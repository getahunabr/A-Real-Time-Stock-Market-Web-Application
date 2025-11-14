"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/Auth";
import { inngest } from "../Inngest/client";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });
    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.log("Signup failed", error);
    return { success: false, error: "Sign up Failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("Sign out failed", error);
    return { success: false, error: "Sign Out failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignUpFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("SignIn failed", error);
    return { success: false, error: "Sign In Failed" };
  }
};
