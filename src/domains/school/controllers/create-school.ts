import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";
import School from "../models/school";

const createSchool: Controller = async (req, res) => {
  db.insert(School).values({
    code: req.body.code,
    name: req.body.name,
    createdAt: Date.now()
  })
    .then(() => {
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {
      if (e.message?.includes('UNIQUE constraint failed: school.code'))
        return res.status(409).send({ status: "error", errors: ["A school with that code already exists"] })
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
      logger("create_school_failed", e)
    })


}
export default createSchool