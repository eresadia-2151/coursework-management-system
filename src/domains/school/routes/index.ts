import express from "express"
import createSchool from "../controllers/create-school"
import validateRequestBody from "../../../middleware/validate-request-body"
import requireRoles from "../../../middleware/require-roles"
import { createSchoolValidationSchema } from "../validators"
import deleteSchool from "../controllers/delete-school"
import getSchools from "../controllers/get-schools"

const schoolRoutes = express.Router()

schoolRoutes.post("/", requireRoles(["admin"]), validateRequestBody(createSchoolValidationSchema), createSchool)
schoolRoutes.get("/", getSchools)
schoolRoutes.delete("/:code", requireRoles(["admin"]), deleteSchool)

export default schoolRoutes;