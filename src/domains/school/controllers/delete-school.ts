import { eq } from "drizzle-orm";
import db from "../../../config/db";
import { Controller } from "../../../types";
import School from "../models/school";
import logger from "../../../utils/logger";

const deleteSchool: Controller = async (req, res) => {
  if (!req.params.code.toString()) res.status(400).send({ status: "error", errors: ["School code is required"] })

  await db.delete(School).where(eq(School.code, req.params.code.toString()))
    .then((r) => {
      if (r.rowsAffected === 0) return res.status(404).send({ status: "error", errors: ["School not found"] })
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {
      logger("delete_school_failed", e)
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
    })
}

export default deleteSchool