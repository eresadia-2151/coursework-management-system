import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";
import Program from "../models/program";

const createProgram: Controller = async (req, res) => {

  const school = await db.query.School.findFirst({ columns: { code: true }, where: ({ code }, { eq }) => eq(code, req.body.schoolCode) })

  if (!school) return res.status(404).send({ status: "error", errors: ["That school was not found."] })

  db.insert(Program).values({
    schoolCode: req.body.schoolCode,
    numberOfYears: Number(req.body.numberOfYears),
    code: req.body.code,
    createdAt: Date.now(),
    name: req.body.name
  })
    .then(() => {
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {
      if (e.message?.includes('UNIQUE constraint failed: program.code'))
        return res.status(409).send({ status: "error", errors: ["A program with that code already exists"] })
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
      logger("create_program_failed", e)
    })
}

export default createProgram;