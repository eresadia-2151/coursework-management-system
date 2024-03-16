import express from "express"
import userRoutes from "../domains/user";
import schoolRoutes from "../domains/school";
import programRoutes from "../domains/program";
import courseRoutes from "../domains/course";
const routes = express.Router();

routes.use("/user", userRoutes)
routes.use("/school", schoolRoutes)
routes.use("/program", programRoutes)
routes.use("/course", courseRoutes)

export default routes;