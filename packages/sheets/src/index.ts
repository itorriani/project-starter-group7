import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { Sheet, WithId, newSheet } from "@poly-sheets/types";
import { readCSV } from "./csv.ts";
import sheetSvc from "./sheet-svc.ts";

// TODO: [Assignment 2] add this import:
//
//   import apiRouter from "./api.ts"

// TODO: [Assignment 4] add these imports:
//
//   import websockets from "./websockets.ts"
//   import wsHandler from "./wsapi.ts";

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
const fileDir = process.env.DATA || "public/data-files";

const app = express();
app.use(express.static(staticDir));

// TODO: [Assignment 2] have `app` `use` the router
//       from `api.ts` to handle all requests which
//       begin with `/api`

app.get("/app", (req: Request, res: Response) => {
  const { file } = req.query;

  if (!file) {
    const sheet = newSheet(10, 50); // 10x50 sheet with no data
    // TODO: [Assignment 1] call sheetSvc.create here and pass then
    //       result to redirectToSheet
  } else {
    readCSV(file as string, fileDir)
      // TODO: [Assignment 1] save the sheet and redirect
      .catch(handleError);
  }

  function redirectToSheet(sheet: WithId<Sheet>) {
    res.redirect(`/app/${sheet.id}`)
  }

  function handleError(err: unknown) {
    res.status(500).send(`Error reading CSV: ${err}`)
  }
});

app.get("/app/:id", (req: Request, res: Response) => {
  //        ==== Assignment 1 ===
  // TODO: Declare the variable `id`. Initialize it to the
  //       string which occurred in place of `:id` in the URL.
  //
  // const id = ...

  // TODO: Declare the variable `sheet`.
  //       This will contain the data from which we will
  //       generate HTML. Use `sheetSvc` to find the value of `sheet`
  //
  // const sheet = ...

  // TODO: Check for sheet not found, in
  //       which case send the appropriate error status code

  // TODO: Render the template with the sheet
  //       data. This returns a promise, so you must use .then()
  //       (or await) to access the actual HTML string. Once
  //       the HTML is available, send it as the response.
  //
  // renderToString(viewSheet(sheet)
  //    .then( ... )

  //       ==== Assignment 2 ====

  // TODO: First, determine the absolute path name
  //        of the static index.html file using Node's
  //       `path` API like this: (just uncomment the line)
  //
  // const indexHtml = path.resolve(staticDir, "index.html");

  // TODO: [Assignment 2] Now read the file. If it exists,
  //       send it as the response. Otherwise, send an
  //       appropriate error response
  //
  // fs.readFile( ... )
  //    .then( ... )
  //    .catch( ... )
});

// Start the server

// TODO: [Assignment 4] Save the return value of `app.listen`
//   in a variable called `server`. You will need this to
//   set up websockets, below

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// TODO: [Assignment 4] Enable websockets on the HTTP server
//    by calling `websockets`, passing it `server` (defined
//    above) and the `wsHandler` function.
