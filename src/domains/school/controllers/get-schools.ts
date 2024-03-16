import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";

const getSchools: Controller = async (req, res) => {
  await db.query.School.findMany({
    with: {
      programs: {
        columns: {
          code: true,
          name: true
        }
      }
    }
  })
    .then((schools) => {
      res.status(200).send({ status: "success", data: { schools } })
    })
    .catch((e: any) => {
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
      logger("create_school_failed", e)
    })
}

export default getSchools;