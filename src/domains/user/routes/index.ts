import express from "express"
import userAdminRoutes from "./admin";
import loginUser from "../controllers/login";
import { loginUserValidationSchema } from "../validators";
import validateRequestBody from "../../../middleware/validate-request-body";
import userStudentRoutes from "./student";
import { SESSION_EXPIRES_IN } from "../../../consts";
const userRoutes = express.Router()

userRoutes.use("/admin", userAdminRoutes)
userRoutes.use("/student", userStudentRoutes)

userRoutes.get("/login/:type", (req,res)=>{
    if(req?.user !== null) return res.redirect("/");
    console.log(req?.user)
    const type = req.params["type"];
    if(!["admin", "exam_board", "lecturers", "student"].includes(type))
        res.render("pages/404")

    res.render("pages/user/login", {
        error:req.query["error"]
    })
})
userRoutes.post("/login/:type", validateRequestBody(loginUserValidationSchema,
    async ({errors},req, res)=>{
        res.redirect(`${req.originalUrl}?error=${encodeURIComponent(errors[0])}`)
    }
    ), async(req,res)=>{
        const cr = await loginUser(req, res)
        if(cr.ok === false) return res.redirect(`${req.originalUrl}?error=${encodeURIComponent(cr.errors[0])}`)

        res.cookie("auth-token", cr.data.token,{maxAge:SESSION_EXPIRES_IN, httpOnly:true})
        res.redirect("/dashboard")
    })

export default userRoutes;