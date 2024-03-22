import { eq } from "drizzle-orm";
import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";
import Program from "../models/program";

const deleteProgram: any = async (req, res) => {
  if (!req.params.code.toString()) res.status(400).send({ status: "error", errors: ["Program code is required"] })

  await db.delete(Program).where(eq(Program.code, req.params.code.toString()))
    .then((r) => {
      if (r.rowsAffected === 0) return res.status(404).send({ status: "error", errors: ["Program not found"] })
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {
      logger("delete_program_failed", e)
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
    })
}

export default deleteProgram