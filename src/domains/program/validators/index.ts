import { z } from "zod"
import { schoolCodeField } from "../../school/validators"

const programCode = z.string({ required_error: "Program code is required" }).min(2, { message: "Program code must have a minimum of 2 characters" }).max(8, { message: "Program name must have a maximum of 8 characters" })

const createProgramValidationSchema = z.object({
  code: programCode,
  name: z.string({ required_error: "Program name is required" }).min(3, { message: "Program name must have a minimum of 3 characters" }).max(64, { message: "Program name must have a maximum of 64 characters" })
  ,
  numberOfYears: z.number({ required_error: "Program number of years are required" }).min(1, { message: "Minimum number of years is 1" }).max(7, { message: "Maximum number of years is 7" }).int(),
  schoolCode: schoolCodeField,
})

export { createProgramValidationSchema };
export { programCode }