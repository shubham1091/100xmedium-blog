import { Hono, Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
    createBlogInput,
    updateBlogInput,
} from "@shubham1091/medium-blog-common";

/**
 * Represents the router for blog-related routes.
 */
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string; // Binding for database URL
        JWT_SECRET: string; // Binding for JWT secret key
    };
    Variables: {
        userId: string; // Variable to store user ID
    };
}>();

/**
 * Middleware to authenticate user via JWT token.
 * @param c - The context object containing request and response objects.
 * @param next - The next function to call the next middleware.
 * @returns The next middleware.
 */
blogRouter.use("*", async (c: Context, next: () => Promise<any>) => {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(" ")[1];
    console.log(await c.env.JWT_SECRET);
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    c.set("userId", payload.userId);

    return next();
});

/**
 * Endpoint to create a new blog post.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the ID of the created post.
 */
blogRouter.post("/", async (c: Context) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId"),
                publishDate: new Date(),
            },
        });
        return c.json({ id: post.id });
    } catch (error) {
        console.error(error);
        c.status(403);
        return c.json({ error: "unable to create post" });
    }
});

/**
 * Endpoint to update an existing blog post.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the ID of the updated post.
 */
blogRouter.put("/", async (c: Context) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.update({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                publishDate: new Date(),
            },
            where: {
                id: body.id,
            },
        });
        return c.json({ id: post.id });
    } catch (error) {
        console.error(error);
        c.status(403);
        return c.json({ error: "unable to update post" });
    }
});

/**
 * Endpoint to retrieve a blog post by its ID.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the requested blog post.
 */
blogRouter.get("/", async (c: Context) => {
    const { id } = c.req.query();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            select: {
                content: true,
                id: true,
                title: true,
                auther: { select: { name: true } },
                publishDate: true,
            },
        });
        if (!post) {
            c.status(404);
            return c.json({ error: "unable to find post" });
        }
        if (post && post.auther && !post.auther.name) {
            post.auther.name = "Anonymus";
        }
        return c.json(post);
    } catch (error) {
        console.error(error);
        c.status(404);
        return c.json({ error: "error while fetching post" });
    }
});

/**
 * Endpoint to retrieve all blog posts.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing an array of blog posts.
 */
blogRouter.get("/bulk", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                auther: { select: { name: true } },
                publishDate: true,
            },
        });
        for (const post of posts) {
            if (!post.auther.name) {
                post.auther.name = "Anonymus";
            }
        }
        return c.json(posts);
    } catch (error) {
        console.log(error);
        return c.status(404);
    }
});
