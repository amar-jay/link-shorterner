import { PrismaClient } from "@prisma/client";
import { __prod } from "../utils/consts";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (!__prod) global.prisma = prisma;
