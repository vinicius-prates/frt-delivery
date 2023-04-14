import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson"
import { z } from "zod";
import { prisma } from "../src/utils/prisma";
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    }
})

export const categoryRouter = t.router({

    create: t.procedure.input(z.object({
        name: z.string()
    })).mutation(async ({ input }) => {
        try {
            const category = await prisma.category.create({
                data: {
                    name: input.name
                }
            })

            return { category };
        } catch (error) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                cause: error,
                message: "Could not create a new category"
            })
        }
    }),
    getAll: t.procedure.query(async () => {
        try {
            const categories = prisma.category.findMany();
            return {categories};
        } catch (error) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                cause:error,
                message:"Could not get all categories."
            })
        }
    })
})