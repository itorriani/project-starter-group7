import express, { Request, Response, Router } from "express";
import { Sparse, Value } from "@poly-sheets/types";
import sheetSvc from "./sheet-svc.ts";

const router = Router();

router.use(express.json({type: ['application/*+json', 'application/json']}))

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

  // ======== Assignment 3 ========

  // TODO: at the top of the function, declare the variable
  //       `limit`. Initialize it to the string that was
  //       passed in as the `?limit=` query parameter, or
  //       undefined if there was none
  //
  // const limit = ...

  // TODO: modify your call to `sheetSvc.get`, adding the
  //       second parameter if `limit` is defined. (Hint:
  //       use parseInt to convert a string to a number)

});

router.get("/sheets/:id/cells", (req: Request, res: Response) => {
  // ======== Assignment 3 ========

  // TODO: Get the `id` as well as the `limit` and `start`
  //       query parameters from the Request object
  //
  // const id = ...
  // const { limit, start } = ...

  // TODO: Define `moreRows` as the result of calling
  //       the `getRows` sheet service function with
  //       the values of `id`, `start`, and `limit`.
  //       Hint: use parseInt to convert strings to numbers
  //
  // const moreRows = ...

  // TODO: If there was an error (`moreRows` is undefined)
  //       send an error response. Otherwise, send the
  //       `moreRows` object as JSON in the body of the reponse
});

router.patch("/sheets/:id/cells", (req: Request, res: Response) => {
  // TODO: Get the `id` parameter from the Request
  //
  // const id = ...

  // TODO: Call the `patch` service method, passing it the
  //       sparse data that was in the body of the Request.
  //       Save the result so we can check it later.
  //
  // const result = ...

  // TODO: If there was an error (`result` is undefined)
  //       send an error response. Otherwise, send the
  //       `result` object as JSON in the body of the reponse
});

export default router;
