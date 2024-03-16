import { z } from "zod"
import { programCode } from "../../program/validators"


const studentRegistrationNumber = z.string({ required_error: "Registration number is required" })
  .toUpperCase()
  .refine((s) => {
    return s.startsWith("H")
      && s.length === 8
      && s.at(-1).toLowerCase() !== s.at(-1).toUpperCase()
      && Number.isInteger(Number(s.slice(1, 7)))
  }, { message: "Registration number must be valid" })


const hitEmailValidationField = z.string({ required_error: "Email is required" }).email({ message: "The email entered is not valid" })
  .refine(s => s.endsWith("@hit.ac.zw"), { message: "The email should be a HIT email" })
const passwordValidationField = z
  .string({ required_error: "Password field is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(1024, { message: "Password must be less than 1024 characters long" })
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      "Password must contain at least one number, one uppercase letter and one one lowercase letter.",
  })

const createAdminValidationSchema = z.object({
  email: hitEmailValidationField,
  password: passwordValidationField,
})

const loginUserValidationSchema = z.object({
  email: hitEmailValidationField,
  password: passwordValidationField,
})

const createStudentValidationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(3, { message: "First name must be at least 3 characters" }).max(64, { message: "First name must be at most 64 characters" }),
  lastName: z.string({ required_error: "Last name is required" }).min(3, { message: "Last name must be at least 3 characters" }).max(64, { message: "Last name must be at most 64 characters" }),

  defaultPassword: passwordValidationField,
  personalEmail: z.string({ required_error: "Personal email is required" }).email({ message: "Email must be valid" }),
  programCode,
  registrationNumber: studentRegistrationNumber
})

export { createAdminValidationSchema, loginUserValidationSchema, createStudentValidationSchema }