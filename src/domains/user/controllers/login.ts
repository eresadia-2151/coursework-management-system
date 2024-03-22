import { ulid } from "ulid"
import bcrypt from "bcryptjs"
import { Controller } from "../../../types";
import db from "../../../config/db";
import UserSession from "../models/user-session";
import { SESSION_EXPIRES_IN } from "../../../consts";
import logger from "../../../utils/logger";

const loginUser: Controller<{token:string}> = async (req, res) => {
  const sessionId = ulid();

  const user = await db.query.User.findFirst({
    columns: { passwordHash: true, id: true },
    where: (user, { eq }) => eq(user.email, req.body.email)
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash)))
    return ({ ok:false, errors: ["Invalid credentials"] })

  return await db.insert(UserSession).values({
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_EXPIRES_IN,
    id: sessionId,
    userId: user.id,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip ?? null,
  })
    .then(() => {
      return { ok:true, data: { token: sessionId } } as const
    })
    .catch((e: any) => {
      logger("login_user_failed", e)
      return({ ok:false, errors: ["An internal error has occured"] })
    })

}

export default loginUser;