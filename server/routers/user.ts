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

export const userRouter = t.router({
    create: t.procedure.input(z.object({
        name: z.string(),
        age: z.number(),
        email: z.string(),
        password: z.string(),
        address: z.object({
            city: z.string(),
            street: z.string(),
            number: z.number(),
            complement: z.string().optional(),
            cep: z.number()
        })
    })).mutation(async ({input}) => {
        try {
            const newUser = await prisma.user.create({
                data:{
                    name: input.name,
                    age: input.age, 
                    email: input.email,
                    password: input.password,
                    address: {
                        create: {
                             street: input.address.street,
                             city: input.address.city,
                             number: input.address.number, 
                             cep: input.address.cep,
                             complement: input.address.complement
                        }
                    }
                }

            })
            return { newUser};
        } catch (error) {

            throw new TRPCError({
                code:"BAD_REQUEST",
                cause:error,
                message:"Could not create new user."

            })
            
        }
    }),

    getSingle: t.procedure.input(z.object({
        id: z.string(),

    })).query(async ({input}) => {
        try {
            const user = prisma.user.findFirst({
                where:{
                    id: input.id
                }
            })

            return { user };
        } catch (error) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                cause: error, 
                message:"Could not get user."
            })
        }
    })
})