import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
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

userRouter.use('/*', async (c, next) => {

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

userRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId")
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
                bio: true,
            }
        })

        const followerCount = await prisma.connection.count({
            where: {
                followingId: id
            }
        })

        const followingCount = await prisma.connection.count({
            where: {
                followerId: id
            }
        })

        const followerEntry = await prisma.connection.findFirst({
            where: {
                followerId: userId,
                followingId: id,
            }
        })

        var isFollowing = false;

        if (followerEntry) {
            isFollowing = true;
        }

        return c.json({
            user: {
                ...user,
                followerCount,
                followingCount,
                isFollowing,
            }
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
                bio: body.bio
            }
        })

        return c.json({
            message: "Updated Details!",
            bio: user.bio,
        })
    }
    catch(e) {
        c.status(403);
        c.json({error: "Error while updating details"});
    }
})

userRouter.post("/follow/:followingId", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    const followingId = c.req.param("followingId");

    try {
        const connection = await prisma.connection.create({
            data: {
                followerId: userId,
                followingId: followingId,
            }
        })
        return c.json({msg: "Followed!"})
    }
    catch(e) {
        c.status(403);
        c.json({error: "Error while following"})
    }
})

userRouter.delete("/unfollow/:followingId", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    const followingId = c.req.param("followingId");

    try{
        const followerEntry = prisma.connection.findFirst({
            where: {
                followerId: userId,
                followingId: followingId,
            }
        })

        console.log(followerEntry);

        if (!followerEntry) {
            c.status(400)
            return c.json({error: "You don't follow this person."})
        }

        await prisma.connection.deleteMany({
            where: {
                followerId: userId,
                followingId: followingId,
            }
        })

        c.status(200);
        return c.json({
            msg: "Unfollowed",
        })
    }
    catch(e) {
        c.status(403);
        return c.json({
            error: "Error while unfollowing."
        })
    }
})