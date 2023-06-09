import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express"
import superjson from "superjson"

export const createContext = async ({ req, res}: trpcExpress.CreateExpressContextOptions) => ({})
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter:({shape}) => {
        return shape;
    }
})

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;