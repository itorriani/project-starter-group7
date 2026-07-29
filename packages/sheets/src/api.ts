import express, { Request, Response, Router } from "express";
import sheetSvc from "./sheet-svc.ts";

const router = Router();

router.use(express.json());

router.get("/sheets/:id", (req: Request, res: Response) => {
  // TODO: declare the variable `id`. Initialize it to the
  //       string which occurred in place of `:id` in the URL.
  //
  // const id = ...

  // TODO: declare the variable `sheet`. This will contain
  //       the data we will send back. Use `sheetSvc` to
  //       find the value of `sheet`
  // const sheet = ...

  // TODO: check the value of `sheet` to determine whether
  //       the `sheetSvc` found the data or not. If
  //       data was found, send it back to the client.
  //       Otherwise, send an appropriate HTTP status
});


export default router;
