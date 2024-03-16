import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body"
import { createCourseValidationSchema } from "../validators"
import requireRoles from "../../../middleware/require-roles"
import createCourse from "../controllers/create-course"
const courseRoutes = express.Router()

courseRoutes.post("/", requireRoles(["admin"]), validateRequestBody(createCourseValidationSchema), createCourse)

export default courseRoutes;