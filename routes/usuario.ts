import { Router,Request,Response } from "express";

const userRouter= Router();

userRouter.get('/prueba',(req:Request,resp:Response)=>{

        resp.json({

            ok:true,
            mensaje:'Todo funciona'

        });

});

export default userRouter;