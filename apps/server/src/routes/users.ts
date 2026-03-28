import { Router } from "express";
import { User } from "@bugpilot/shared";

const routes = Router();

const users: User[] = [
    {
        id: "1",
        name: "John",
        email: "john@gmail.com",
        role: "admin",
    },
    {
        id: "2",
        name: "Doe",
        email: "doe@gmail.com",
        role: 'viewer'
    }
]



routes.get("/", (req, res) => {
    res.json(users)
})




export default routes;