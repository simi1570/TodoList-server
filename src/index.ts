import express, {Express, Request, Response } from "express";
import { PrismaClient } from '../generated/prisma';
import cors from "cors";

const app : Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request ,res: any) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
});

app.post("/createTodo/", async (req: Request ,res: any) => {
    try{
        const { title, isCompleted } = req.body;
        const createTodo = await prisma.todo.create({
            data: {
                title,
                isCompleted,
            }
    });
    return res.json(createTodo);
    } catch(e) {
        return res.status(400).json(e);
    }
});

app.put("/editTodo/:id", async (req: Request ,res: any) => {
    try{
        const id = Number(req.params.id);
        const { title, isCompleted } = req.body;
        const createTodo = await prisma.todo.update({
            where: { id },
            data: {
                title,
                isCompleted,
            }
    });
    return res.json(createTodo);
    } catch(e) {
        return res.status(400).json(e);
    }
});

app.delete("/deleteTodo/:id", async (req: Request ,res: any) => {
    try{
        const id = Number(req.params.id);
        const deleteTodo = await prisma.todo.delete({
            where: { id }
    });
    return res.json(deleteTodo);
    } catch(e) {
        return res.status(400).json(e);
    }
});

app.listen(PORT, () => console.log("server is running "));