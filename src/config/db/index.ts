import { drizzle } from 'drizzle-orm/libsql';
//@ts-ignore
import { createClient } from '@libsql/client';
import * as schema from "./schema"

import dotenv from "dotenv"
dotenv.config()

const client = process.env.ENV === "prod" ? createClient({ url: process.env.DB_URL, authToken: process.env.DB_AUTH_TOKEN })
  : createClient({
    url: 'file:./.data/local.sqlite'
  });

const db = drizzle(client, { schema })
export default db
export type DB = typeof db;



