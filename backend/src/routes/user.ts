/**
 * @module UserRouter
 * @description Defines routes and handlers for user-related functionalities in the serverless backend.
 */

import { Hono, Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@shubham1091/medium-blog-common";

/**
 * Represents the router for user-related routes.
 */
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string; // Binding for database URL
        JWT_SECRET: string; // Binding for JWT secret key
    };
}>();

/**
 * Handles user signup operation.
 * @param {Context} c - The context object containing request and response objects.
 * @returns {Promise} A Promise that resolves to the JSON response containing the JWT token.
 */
userRouter.post("/signup", async (c: Context) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "Invalid input" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
        const name = user.name;

        return c.json({ token, name });
    } catch (err) {
        console.error("signup error ", err);
        c.status(403);
        return c.json({ error: "Invalid input" });
    }
});

/**
 * Handles user signin operation.
 * @param {Context} c - The context object containing request and response objects.
 * @returns {Promise} A Promise that resolves to the JSON response containing the JWT token.
 */
userRouter.post("/signin", async (c: Context) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "Invalid input" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const usr = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!usr) {
            c.status(403);
            return c.json({ error: "user not found" });
        }

        const token = await sign({ userId: usr.id }, c.env.JWT_SECRET);
        const name = usr.name;

        return c.json({ token, name });
    } catch (error) {
        console.error("signin error ", error);
        c.status(403);
        return c.json({ error: "Invalid input" });
    }
});

userRouter.put("/:id", async (c: Context) => {
    const id = c.req.param("id");
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        await prisma.user.update({
            where: { id },
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
            },
        });
        return c.json({ message: "User updated" });
    } catch (error) {
        console.error("update error ", error);
        c.status(403);
        return c.json({ error: "unable to update" });
    }
});

userRouter.get("/users", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true },
        });
        return c.json({ users });
    } catch (error) {
        console.error("get users error ", error);
        c.status(403);
        return c.json({ error: "unable to get users" });
    }
});
