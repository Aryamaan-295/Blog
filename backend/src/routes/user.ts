import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { signupInput } from '@kaviaryamaan/blog-common';
import { signinInput } from '@kaviaryamaan/blog-common';
import { updateUserInput } from '@kaviaryamaan/blog-common';


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

userRouter.use('/update', async (c, next) => {

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

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
            error: "Bad Inputs",
        })
    }

    try {
        const user = await prisma.user.create({
            data: {
            email: body.email,
            name: body.name,
            password: body.password,
            },
        })

        const token = await sign({id: user.id}, c.env.JWT_SECRET)

        c.status(200)
        return c.json({
            jwt: token
        })
    }
    
    catch(e) {
        c.status(411)
        return c.text("Invalid")
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Bad Inputs",
            body: body,
        })
    }

    try {
        const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
        });

        if (!user) {
            c.status(411);
            return c.json({error: "User not found"});
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    }
    catch(e) {
        c.status(403);
        return c.text("Invalid")
    }

})


userRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try{
        const user = await prisma.user.findFirst({
            where:{
                id: id,
            },
            select: {
                name: true,
                email: true,
                id: true,
                posts: true,
            }
        })

        return c.json({
            user
        })
    } 
    catch(e) {
        c.status(403)
        c.json({error: "Error while fetching profile"})
    }
})

userRouter.post("/update", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();

    const { success } = updateUserInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Bad Inputs",
            body: body,
        })
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            }, 
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            }
        })

        return c.json({
            message: "Updated Details!",
            name: user.name,
        })
    }
    catch(e) {
        c.status(403);
        c.json({error: "Error while updating details"});
    }
})