import express from "express"
 
export const app = express()

app.listen(4000, () => {
    console.log('Listening at port 4000');
})