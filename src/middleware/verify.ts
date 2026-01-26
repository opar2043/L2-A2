import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "node:console";

const auth = (...roles : string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization ;

      if (!token) {
        return res.status(500).json({
          message: "You are not allowed",
        });
      }

      const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      console.log({ decoded });
      req.body.user = decoded ;

      if(roles.length && !roles.includes(decoded.role as string)){
         return res.status(500).json({
          error: "unauthorized !!!"
         })
      }

      next();
    } catch (error) {
      res.status(401).json({
        message: "something happen wrong",
        success: false,
      });
    }
  };
};

export default auth;
