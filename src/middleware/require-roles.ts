import type { TUser } from "../domains/user/models/user";
import type { NextFunction, Request, Response } from "express-serve-static-core";

const requireRoles = (roles: TUser["role"][]) => async (req: Request, res: Response, next: NextFunction) => {
  if (!req?.session) return res.status(403).send({ status: "error", error: ["User not logged in"] })
  //@ts-ignore
  if (!roles.includes(req?.user.role)) return res.status(403).send({ status: "error", error: ["User does not have permission to do that action"] })
  return next();
}

export default requireRoles;
