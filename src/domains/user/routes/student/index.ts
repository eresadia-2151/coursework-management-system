import express from "express"
import validateRequestBody from "../../../../middleware/validate-request-body"
import { createStudentValidationSchema } from "../../validators"
import requireRoles from "../../../../middleware/require-roles"
import createUserStudent from "../../controllers/student/create"

const userStudentRoutes = express.Router()

userStudentRoutes.post("/", requireRoles(["admin"]), validateRequestBody(createStudentValidationSchema), createUserStudent)

export default userStudentRoutes;