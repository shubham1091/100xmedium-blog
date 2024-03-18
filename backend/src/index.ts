/**
 * @module ServerlessBackend
 * @description Entry point for the serverless backend application.
 */

import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

/**
 * Represents the serverless backend application.
 */
const app = new Hono().basePath("/api/v1/");
app.use("*",cors());

/**
 * Handles the root endpoint "/".
 * @param c The context object containing request and response objects.
 * @returns A response with a text message "Hello Hono!".
 */
app.get("/", (c) => {
    return c.text("Hello Hono!");
});

// Routing user-related requests to userRouter
app.route("/user", userRouter);

// Routing blog-related requests to blogRouter
app.route("/blog", blogRouter);

export default app; // Exporting the configured Hono app as the default module export
