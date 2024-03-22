import express from "express";
import validateRequestBody from "../../../../middleware/validate-request-body";
import { createAdminValidationSchema } from "../../validators";
import createUserAdmin from "../../controllers/admin/create";
import getSchools from "../../../school/controllers/get-schools";
import db from "../../../../config/db";

const userAdminRoutes = express.Router();

userAdminRoutes.use((req, res, next) => {
  if (req?.user === null) return res.redirect("/");
  if (req.user.role !== "admin")
    return res.redirect(`/user/${req.user.role}/dashboard`);
  next();
});

userAdminRoutes.post(
  "/create",
  validateRequestBody(createAdminValidationSchema),
  createUserAdmin
);

userAdminRoutes.get("/dashboard", (req, res) => {
  res.render("pages/user/admin/dashboard", {
    error: req.query["error"],
  });
});

userAdminRoutes.get("/dashboard/school", async (req, res) => {
  const schools = await getSchools(req, res);

  if (schools.ok === false)
  return res.render("pages/500")

return res.render("pages/user/admin/dashboard-school", {
    schools: schools.data.schools ?? [],
});
});

userAdminRoutes.get("/dashboard/programs", async (req, res) => {
    const schools = await getSchools(req, res);
    const selectedSchool = req.query["school"] ?? schools[0].code

    const programs = await db.query.Program.findMany({
        where:({schoolCode},{eq})=>eq(schoolCode,selectedSchool)
    })

    console.log(programs)

    if (schools.ok === false)
        return res.render("pages/500")



  return res.render("pages/user/admin/dashboard-programs", {
    schools: schools.data.schools ?? [],
    selectedSchool,
    programs:programs ?? []
  });
  });

export default userAdminRoutes;
