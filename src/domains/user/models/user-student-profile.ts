import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import User from "./user";

const UserStudentProfile = sqliteTable("user-student-profile", {
  registrationNumber: text("registration_number").notNull().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  personalEmail: text("personal_email").notNull(),
  programCode: text("program_code").notNull(),
  userId: text("user_id").notNull()
})

const userStudentProfileRelations = relations(UserStudentProfile, ({ one }) => ({
  user: one(User, {
    references: [User.id],
    fields: [UserStudentProfile.userId]
  })
}))

export default UserStudentProfile;
export {
  userStudentProfileRelations
}