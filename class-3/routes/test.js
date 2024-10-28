import { Router } from "express";

export const router = new Router();

router.get('/', (req, res)=> {
    console.log("Custom route")

    res.send()
})

router.get('/about', (req, res)=> {
    res.send({message: "We are the best"})
})