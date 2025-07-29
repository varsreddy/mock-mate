// import { text } from "drizzle-orm/gel-core";
// import { serial, varchar } from "drizzle-orm/mysql-core";
// import { pgTable } from "drizzle-orm/pg-core";

// export const MockInterview = pgTable('mockInterview',{
//     id:serial('id').primaryKey(),
//     jsonMockResp:text('jsonMockResp').notNull(),
//     jobPosition:varchar('jobPosition').notNull(),
//     jobDesc:varchar('jobDesc').notNull(),
//     jobExperience:varchar('jobExperience').notNull(),
//     createdBy:varchar('createdBy').notNull(),
//     createdAt:varchar('createdAt'),
//     mockId:varchar('mockId').notNull()
// })



import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
  jobDesc: varchar('jobDesc', { length: 500 }).notNull(),
  jobExperience: varchar('jobExperience', { length: 100 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 100 }),
  mockId: varchar('mockId', { length: 100 }).notNull()
});



export const UserAnswer = pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  mockId: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns:text('correctAns'),
  userAns: text('userAns'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  userEmail: varchar('userEmail'),
  createdBy: varchar('createdBy'),
  createdAt: varchar('createdAt'),

})