import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body"
import { createProgramValidationSchema } from "../validators"
import createProgram from "../controllers/create-program"
import requireRoles from "../../../middleware/require-roles"
import deleteProgram from "../controllers/delete-program"

const programRoutes = express.Router()

programRoutes.post("/", requireRoles(["admin"]), validateRequestBody(createProgramValidationSchema), createProgram)

programRoutes.delete("/:code", requireRoles(["admin"]), deleteProgram)


export default programRoutes