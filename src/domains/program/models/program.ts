import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import School from "../../school/models/school";

const Program = sqliteTable("program", {
  code: text("code").notNull().primaryKey(),
  name: text("nane").notNull(),
  numberOfYears: integer("number_of_years").notNull(),
  schoolCode: text("school_code").notNull(),
  createdAt: integer("created_at").notNull()
})


const programRelations = relations(Program, ({ one }) => ({
  school: one(School, {
    fields: [Program.schoolCode],
    references: [School.code]
  })
}))

export default Program;
export { programRelations }