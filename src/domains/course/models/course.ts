import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import Program from "../../program/models/program";

const Course = sqliteTable("course", {
  code: text("code").notNull().primaryKey(),
  name: text("nane").notNull(),
  year: integer("part").notNull(),
  semester: integer("semester").notNull(),
  programCode: text("program").notNull(),
  createdAt: integer("created_at").notNull(),
})

const courseRelations = relations(Course, ({ one }) => ({
  program: one(Program, {
    references: [Program.code],
    fields: [Course.programCode]
  })
}))

export default Course;
export {
  courseRelations
}