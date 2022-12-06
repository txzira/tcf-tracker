import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const t = initTRPC.create();

export const appRouter = t.router({
  createFaction: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.faction.create({ data: { name: input.name } });
        return { message: `Faction, ${input.name}, added!`, status: "success" };
      } catch (err: any) {
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Faction already exist",
          });
        }
        throw err;
      }
    }),
  updateFaction: t.procedure
    .input(
      z.object({
        name: z.string(),
        factionId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.faction.update({
          where: { id: input.factionId },
          data: {
            ...(input.name && { name: input.name }),
          },
        });
        return { message: `${input.name}`, status: "success" };
      } catch (err: any) {
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Faction already exist",
          });
        }
        throw err;
      }
    }),
  deleteFaction: t.procedure
    .input(
      z.object({
        factionId: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.faction.delete({
          where: { id: input.factionId },
        });
        return { message: `Faction, ${input.name}, deleted!`, status: "success" };
      } catch (err: any) {
        throw err;
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
        //create create
        console.log("hello");
        const quest = await prisma.quest.create({ data: { name: input.name, factionId: input.factionId } });
        //add quest to quest list of all existing users
        const users = await prisma.user.findMany({ select: { id: true } });
        users.map(async (user) => {
          const playerQuest = await prisma.playerQuest.create({ data: { playerId: user.id, questId: quest.id, completed: false } });

          console.log(playerQuest);
        });
        return { message: `Quest: ${input.name} and ${users[0].id} added!`, status: "success" };
      } catch (err: any) {
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Quest already exist",
          });
        }
        throw err;
      }
    }),
  updateQuest: t.procedure
    .input(
      z.object({
        name: z.string(),
        questId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.quest.update({
          where: { id: input.questId },
          data: {
            ...(input.name && { name: input.name }),
          },
        });
        return { message: `${input.name}`, status: "success" };
      } catch (err: any) {
        throw err;
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
