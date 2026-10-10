import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: ["./lib/db/auth-schema.ts", "./lib/db/schema.ts"],
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_FILE ?? "./data/gothique.db",
  },
  verbose: true,
  strict: true,
});
