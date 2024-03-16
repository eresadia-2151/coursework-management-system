import db from "../../../../config/db";
import { Controller } from "../../../../types";
import User from "../../models/user";
import { ulid } from "ulid"
import bcrypt from "bcryptjs"
import logger from "../../../../utils/logger";
import UserStudentProfile from "../../models/user-student-profile";

const createUserStudent: Controller = async (req, res) => {

  const program = await db.query.Program.findFirst({
    where: ({ code }, { eq }) => eq(code, req.body.programCode),
    columns: {
      code: true
    }
  })
  if (!program) return res.status(404).send({ status: "error", errors: ["That program was not found."] })

  const userId = ulid();

  await db.batch([
    db.insert(User).values({
      createdAt: Date.now(),
      id: userId,
      email: req.body.registrationNumber + "@hit.ac.zw",
      passwordHash: await bcrypt.hash(req.body.defaultPassword, 10),
      role: "student",
    }),
    db.insert(UserStudentProfile).values({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      personalEmail: req.body.personalEmail,
      programCode: req.body.programCode,
      registrationNumber: req.body.registrationNumber,
      userId
    })
  ])
    .then(() => {
      res.status(200).send({ status: "success" })
    })
    .catch((e: any) => {

      if (e.message?.includes('UNIQUE constraint failed: user.email') || e.message?.includes('UNIQUE constraint failed: user-student-profile.registration_number'))
        return res.status(409).send({ status: "error", errors: ["A student by that registration number already exists"] })
      res.status(500).send({ status: "error", errors: ["An internal error has occured"] })
      logger("create_student_failed", e)
    })
}

export default createUserStudent;