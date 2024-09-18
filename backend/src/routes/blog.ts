import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>()

blogRouter.use('/*', async (c, next) => {

    const authHeader = c.req.header("Authorization") || "";

    if (!authHeader) {
        c.status(401);
        return c.json({error: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const payload = await verify(token, c.env.JWT_SECRET);

        if (!payload) {
        c.status(401);
        return c.json({error:"Unauthorized"});
        }
        
        c.set('userId', payload.id as string);

        await next();
    }
    catch(e) {
        c.status(403);
        c.json({
            error: "Unauthorized"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get('userId');

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                published: true,
            }
        })

        return c.json({
            id: blog.id
        })
    }

    catch(e) {
        c.status(403);
        c.text("Error")
        console.log(e)
    }
})

blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id: blog.id
        })
    }

    catch(e) {
        c.status(403);
        c.text("Error")
    }
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //Todo: Pagination
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            updatedDate: true,
            author: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                title: true,
                content: true,
                id:true,
                updatedDate: true,
                author: {
                    select: {
                        name: true,
                        id: true,
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }
    catch(e) {
        c.status(403);
        c.json({error: "Error while fetching data"})
    }
})
