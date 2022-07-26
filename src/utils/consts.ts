import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../pages/api/trpc/[trpc]";

export const __prod = process.env.NODE_ENV === "production";
export const trpc = createReactQueryHooks<AppRouter>();
