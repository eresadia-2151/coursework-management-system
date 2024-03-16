import { Request, Response } from "express";

type Controller = (req: any, res: any) => Promise<any>
export type { Controller }