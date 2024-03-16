import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body"
import { createProgramValidationSchema } from "../validators"
import createProgram from "../controllers/create-program"
import requireRoles from "../../../middleware/require-roles"

const programRoutes = express.Router()

programRoutes.post("/", requireRoles(["admin"]), validateRequestBody(createProgramValidationSchema), createProgram)

export default programRoutes