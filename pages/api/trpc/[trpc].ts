import { initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
  createFaction: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.faction.create({ data: { name: input.name } });
        console.log("hello");
        return { success: `Success: Faction, ${input.name}, added!`, status: 200 };
      } catch (err: any) {
        return { message: `Erro: ${err.message}`, status: 400 };
      }
    }),
  createQuest: t.procedure
    .input(
      z.object({
        name: z.string(),
        factionId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.quest.create({ data: { name: input.name, factionId: input.factionId } });
        console.log("hello");
        return { message: `Success: Quest, ${input.name}, added!`, status: 200 };
      } catch (err: any) {
        return { message: `Erro: ${err.message}`, status: 400 };
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
