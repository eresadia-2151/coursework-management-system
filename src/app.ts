; import logger from "./utils/logger";
import isAuthenticated from "./middleware/is-authenticated";
import cookieParser from "cookie-parser"
import routes from "./routes";
import express from "express";
import path from "path";
import bodyParser from "body-parser"

const app = express()
const router = express.Router();

//@ts-ignore
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

//@ts-ignore
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
//@ts-ignore
app.use(express.json())
app.use(isAuthenticated)

router.use("/", routes)
app.use(router)

app.use((err, req, res, next) => {
  res.status(500).send({ status: "error", errors: [err.message, 'Something went wrong.  Please try again'] });
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