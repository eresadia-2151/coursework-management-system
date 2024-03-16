import db from "../../../../config/db";
import { Controller } from "../../../../types";
import User from "../../models/user";
import { ulid } from "ulid"
import bcrypt from "bcryptjs"
import logger from "../../../../utils/logger";

const createUserAdmin: Controller = async (req, res) => {

  await db.insert(User).values({
    createdAt: Date.now(),
    id: ulid(),
    email: req.body.email,
    passwordHash: await bcrypt.hash(req.body.password, 10),
    role: "admin",
    defaultPasswordChangedAt: Date.now()

  })
    .then(() => {
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {
      if (e.message?.includes('UNIQUE constraint failed: user.email'))
        return res.status(409).send({ status: "error", errors: ["Email is already in use"] })
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
      logger("login_user_failed", e)
    })
}

export default createUserAdmin;