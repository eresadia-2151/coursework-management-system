import { Request, Response } from "express";


type ControllerResponse<T extends {}> = {
    ok:false,
    errors:string[]
}|{
    ok:true,
    data?:T
}

type Controller<T> = (req: any, res: any) => Promise<ControllerResponse<T>>
export type { Controller }