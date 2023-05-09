import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import ClientError from './lib/client-error.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/requests', async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const question = req.body.question;
    const userId = parseInt(req.body.member);
    const sql = `
    insert into "requests" ("title", "description", "question", "userId")
      values ($1, $2, $3, $4)
      returning *
   `;
    const params = [title, description, question, userId];
    const result = await db.query(sql, params);
    const [todo] = result.rows;
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// presentation below

app.get('/api/users', async (req, res, next) => {
  try {
    const sql = `
      select "name", "userId", "email", "phoneNumber"
        from "users"
        where "managerAccount" = false
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/requests', async (req, res, next) => {
  try {
    const sql = `
    select "r"."requestId", "r"."title", "r"."description", "r"."question", "r"."createdAt", "u"."name", "u"."email", "u"."phoneNumber", "u"."userId"
      from "requests" as "r"
      join "users" as "u" using ("userId")
   `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// presentation below

app.patch('/api/requests/:requestId', async (req, res, next) => {
  try {
    const requestId = Number(req.params.requestId);
    if (!Number.isInteger(requestId) || requestId < 1) {
      throw new ClientError(400, 'requestId must be a positive integer');
    }
    const userIdValue = parseInt(req.body.userId);
    const { title, description, question } = req.body;
    console.log(req.body);
    const sql = `
      update "requests"
        set "updatedAt" = now(),
            "title" = $1,
            "description" = $2,
            "question" = $3,
            "userId" = $4
          where "requestId" = $5
        returning *
    `;
    const params = [title, description, question, userIdValue, requestId];
    const result = await db.query(sql, params);
    const [todo] = result.rows;
    if (!todo) {
      throw new ClientError(404, `cannot find request with requestId ${requestId}`);
    }
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.get('/api/requests/:requestId', async (req, res, next) => {
  try {
    const requestId = Number(req.params.requestId);
    if (!Number.isInteger(requestId) || requestId < 1) {
      throw new ClientError(400, 'requestId must be a positive integer');
    }
    const sql = `
    select "r"."requestId", "r"."title", "r"."description", "r"."question", "u"."name", "r"."userId"
      from "requests" as "r"
      join "users" as "u" using ("userId")
      where "requestId" = $1
   `;
    const params = [requestId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/requests/:requestId', async (req, res, next) => {
  try {
    const requestId = Number(req.params.requestId);
    console.log(requestId);
    if (!Number.isInteger(requestId) || requestId < 1) {
      throw new ClientError(400, 'requestId must be a positive integer');
    }
    const sql = `
    delete
      from "requests"
      where "requestId" = $1
      returning *
   `;
    const params = [requestId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
