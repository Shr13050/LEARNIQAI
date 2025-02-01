import { json,pgTable, serial, text, varchar,boolean,integer } from "drizzle-orm/pg-core";


export const AIOutput = pgTable("aioutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
});

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  difficulty: varchar("difficulty").notNull(),
  addVideo:varchar('addVideo').notNull().default('Yes'),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  publish:boolean('public').default(false)
});

export const Chapters=pgTable('chapters',{
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    chapterId:integer('chapterId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull(),


})