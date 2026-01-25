import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
       interface request{
         user?: JwtPayload
       }
    }
}