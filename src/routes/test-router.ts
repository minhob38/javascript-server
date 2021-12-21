import express from "express";
import { IResData } from "../types";

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data: IResData = {
    status: "success",
    message: "test conducted",
  };

  return res.status(200).json(data);
});

export default router;