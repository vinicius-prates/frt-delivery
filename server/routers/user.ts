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
                    addresss: input.address
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
    })
})