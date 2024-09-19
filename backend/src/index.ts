import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/user';
import { signRouter } from './routes/sign';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.use("/api/*", cors())

app.route("/api/v1/sign", signRouter);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;