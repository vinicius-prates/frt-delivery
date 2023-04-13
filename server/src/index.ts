import express from "express"
import { categoryRouter } from "../routers/category";
import { productRouter } from "../routers/product";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, router } from "./utils/trpc";
 
export const app = express()


const appRouter = router({
    product: productRouter,
    category: categoryRouter
});

export type AppRouter = typeof appRouter;

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
app.listen(4000, () => {
    console.log('Listening at port 4000');
})