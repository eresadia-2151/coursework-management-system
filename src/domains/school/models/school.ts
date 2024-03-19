import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import Program from "../../program/models/program";

const School = sqliteTable("school", {
  code: text("code").notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at").notNull()
})

const schoolRelations = relations(School, ({ many }) => ({
  programs: many(Program)
}))

export default School;
export {
  schoolRelations
}