import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import User from "./user";

const UserLecturerProfile = sqliteTable("user-student-profile", {
  registrationNumber: text("registration_number").notNull().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  personalEmail: text("personal_email").notNull(),
  userId: text("user_id").notNull()
})

const userLecturerProfileRelations = relations(UserLecturerProfile, ({ one }) => ({
  user: one(User, {
    references: [User.id],
    fields: [UserLecturerProfile.userId]
  })
}))

export default UserLecturerProfile;
export {
  userLecturerProfileRelations
}