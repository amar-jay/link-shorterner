import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../db/prisma";

export const appRouter = trpc
  .router()
  .query("allLinks", {
    async resolve({input}) {
      const links = await prisma.shortLink.findMany()

      return {links}
    }
  })
  .query("checkSlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const count = await prisma.shortLink.count({
        where: {
          slug: input.slug,
        },
      });
      return { used: count > 0 };
    },
  })
  .query("aLink", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve ({ input }) {
      const aLink = await prisma.shortLink.findUnique({
        where: {
          slug: input.slug
        }
      })
      return { exist: !!aLink, aLink }
    }
  })
  .mutation("createSlug", {
    input: z.object({
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ input }) {
      try {
        await prisma.shortLink.create({
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
