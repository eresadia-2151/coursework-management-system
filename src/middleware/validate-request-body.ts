import { z, type AnyZodObject, ZodObject, ZodEffects } from "zod";
import type { NextFunction, Request, Response } from "express-serve-static-core";

const validateRequestBody = (schema: ZodObject<any> | ZodEffects<any>, onError?:(arg0:{errors:string[]}, req:Request, res:Response)=>any) => (req: Request, res: Response, next: any) => {
    const body = schema.safeParse(req.body)

    if (body.success === false) return onError ? onError({errors: body.error.errors.map(e => e.message)}, req, res) :
        res.status(403).send({status:"error", errors:body.error.errors.map(e => e.message)})
    next()
}

export default validateRequestBody;