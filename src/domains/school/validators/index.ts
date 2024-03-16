import { z } from "zod"

const schoolCodeField = z.string({ required_error: "School code is required" }).min(2, { message: "School code must have a minimum of 2 characters" }).max(8, { message: "School name must have a maximum of 8 characters" })

const createSchoolValidationSchema = z.object({
  code: schoolCodeField,
  name: z.string({ required_error: "School name is required" }).min(3, { message: "School name must have a minimum of 3 characters" }).max(64, { message: "School name must have a maximum of 64 characters" })
})

export { createSchoolValidationSchema }
export { schoolCodeField }