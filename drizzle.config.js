import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:yLrJO6jMulS9@ep-black-pine-a5thf006.us-east-2.aws.neon.tech/leariqai?sslmode=require'
  }
});