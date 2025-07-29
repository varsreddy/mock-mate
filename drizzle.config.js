import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_S9sF5KvLiHNl@ep-small-salad-a8d4qfb2-pooler.eastus2.azure.neon.tech/AIMockInterviewer_Database?sslmode=require'
  }
//   out: 'postgresql://neondb_owner:npg_S9sF5KvLiHNl@ep-small-salad-a8d4qfb2-pooler.eastus2.azure.neon.tech/AIMockInterviewer_Database?sslmode=require',
});