import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson"
import { z } from "zod";
import { prisma } from "../src/utils/prisma";
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }){
        return shape;
    }
})

export const productRouter = t.router({
    create: t.procedure.input(z.object({
        name: z.string(),
        priceUnit: z.number(),
        categoryName: z.string(),
        description: z.string()
    })).mutation(async ({input}) => {
        try {
            const product = prisma.product.create({
                data:{
                    name: input.name, 
                    priceUnit: input.priceUnit,
                    description: input.description,
                    categoryName: input.categoryName 
                }
            })

            return {product };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause:error,
            message:"Could not crate new product"
          })  
        }
    }),

    getall: t.procedure.query(async () => {
        try {
            const products = prisma.product.findMany();

            return { products };

        } catch (error) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                cause:error, 
                message:"Could not get any product."
            })
        }
    }
    )

})