import express from "express"
import { categoryRouter } from "../routers/category";
import { productRouter } from "../routers/product";
import { router } from "./utils/trpc";
 
export const app = express()


const appRouter = router({
    product: productRouter,
    category: categoryRouter
});

export type AppRouter = typeof appRouter;
app.listen(4000, () => {
    console.log('Listening at port 4000');
})