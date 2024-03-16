import { z } from "zod";
import { programCode } from "../../program/validators";

const courseCode = z.string({ required_error: "Course code is required" }).min(2, { message: "Course code must have a minimum of 2 characters" }).max(8, { message: "Course name must have a maximum of 8 characters" })

const createCourseValidationSchema = z.object({
  code: courseCode,
  name: z.string({ required_error: "Course name is required" }).min(3, { message: "Course name must have a minimum of 3 characters" }).max(64, { message: "Course name must have a maximum of 64 characters" }),
  year: z.number({ required_error: "Year is required" }).int(),
  programCode: programCode,
  semester: z.number({ required_error: "Semester is required" }).refine((s) => [1, 2].includes(s), { message: "Semester should either be 1 or 2" })
})

export {
  createCourseValidationSchema
}