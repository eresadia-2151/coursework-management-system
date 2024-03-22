import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";

const getSchools: Controller<{
  schools: { code: string; name: string }[];
}> = async (req, res) =>
  await db.query.School.findMany({ columns: { code: true, name: true } })
    .then((schools) => {
      return { ok: true, data: { schools } } as const;
    })
    .catch((e) => {
      logger("create_school_failed", e);
      return { ok: false, errors: ["An internal error has occured"] };
    });

export default getSchools;
