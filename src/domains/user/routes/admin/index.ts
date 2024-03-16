import express from "express"
import validateRequestBody from "../../../../middleware/validate-request-body"
import { createAdminValidationSchema } from "../../validators"
import createUserAdmin from "../../controllers/admin/create"

const userAdminRoutes = express.Router()

userAdminRoutes.post("/create", validateRequestBody(createAdminValidationSchema), createUserAdmin)

export default userAdminRoutes;