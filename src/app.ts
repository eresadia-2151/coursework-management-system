; import logger from "./utils/logger";
import isAuthenticated from "./middleware/is-authenticated";
import cookieParser from "cookie-parser"
import routes from "./routes";
import express from "express";

const app = express()
const router = express.Router();

//@ts-ignore
app.use(cookieParser())
//@ts-ignore
app.use(express.json())
app.use(isAuthenticated)

app.get("/", (_, res) => res.send("fire"))

router.use("/api/", routes)
app.use(router)

app.use((err, req, res, next) => {
  res.status(500).send({ status: "error", errors: ['Something went wrong.  Please try again'] });
  logger("internal_error", err)
});


export default app;

declare global {
  namespace Express {
    interface Request {
      session?: Pick<import("./domains/user/models/user-session").TUserSession, "id">
      user?: Pick<import("./domains/user/models/user").TUser, "id" | "role">
    }
    interface Response { }
  }
}