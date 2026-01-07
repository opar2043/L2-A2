import { RequestHandler } from "express";

const verify : RequestHandler = (req,res,next) => {
   console.log("Jawa jabe na");
}

export default verify;