import express, { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { Sheet, WithId, newSheet } from "@poly-sheets/types";
// TODO: [Assignment 5] replace the following with
//       SQLiteSheetService
import { InMemorySheetService } from "sheet-svc";
// TODO: [Assignment 6] Add `FormulaSheetService` to the
//       above import from `sheet-svc`

// TODO [Assignment 6] import `DAGComputeService` from
//       `compute-svc`

import { readCSV } from "./csv.ts";

// TODO: [Assignment 2] add this import:
//
//   import createRouter from "./api.ts"

// TODO: [Assignment 4] add these imports:
//
//   import websockets from "./websockets.ts"
//   import wsServer from "./ws-server.ts";

const port = process.env.PORT || 3000;
const useSPA = !!process.env.STATIC;
const publicDir = path.resolve("public");
const staticDir = path.resolve(process.env.STATIC || "public");
const templateDir = path.resolve(process.env.TEMPLATES || "public/templates");

const app = express();
// TODO: [Assignment 5] replace the following with
//       SQLiteSheetService
const sheetService = new InMemorySheetService();

// TODO: [Assignment 6] redefine `sheetService` above
//       by using `new FormulaSheetService`. This class
//       requires that you pass the SQLiteSheetService
//       to its constructor.

// TODO: [Assignment 6] define `computeService` by using
//       `new DAGComputeService`, and passing it
//       the `sheetService` (above) to the constructor
//
// const computeService = ...

app.use(express.static(
  staticDir,
  useSPA ? { index: false } : {}
));
app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded

// TODO: [Assignment 2] create a router by calling createRouter.
//
// const router = ...;

// TODO: [Assignment 2] Have `app` use `router` to handle
//       all requests which begin with `/api`. Note that 
//       this cause the later "app.get("/app/:id..." call
//       from Assignment 1 to have no effect.
//
// app.use( /*   */ );

if (useSPA) {
  // Explicitly send public/index.html for /, regardless of STATIC value
  app.get("/", (req: Request, res: Response) => {
    res.sendFile("index.html", {root: publicDir});
  });

  // Send index.html in STATIC directory for any route starting with /app
  app.get(/\/app(.*)/, (req: Request, res: Response) => {
    // TODO: [Assignment 2] Complete this endpoint, following the
    //       example above, except use `staticDir` in place of `publicDir`
  });
}


app.post("/app", (req: Request, res: Response) => {
  const { sheetName, nrows, ncols, template } = req.body;

  if (!template) {
    const columns = ncols ? parseInt(ncols) : 10;
    const rows = nrows ? parseInt(nrows) : 50;
    const name = sheetName || "New Sheet";

    const sheet = newSheet(columns, rows, name);

    // TODO: [Assignment 1] save the sheet in the sheetService
    //       and pass then result to redirectToSheet
    //
    // const stored = ...;
    // redirectToSheet(stored);

  } else {
    readCSV(template as string, templateDir)
      .then((sheet) => {
        // TODO: [Assignment 1] save the sheet and redirect,
        //       as you did above
      })
      .catch((err: Error) => {
        // TODO: [Assignment 1] an error occurred. Respond
        //       with an HTTP error status. You may assume
        //       the only possible error is that the file
        //       was not found.
      });
  }

  function redirectToSheet(sheet: WithId<Sheet>) {
    res.redirect(`/app/${sheet.id}`)
  }
});

app.get("/app/:id", (req: Request, res: Response) => {
  //        ==== Assignment 1 ===
  // TODO: Declare the variable `id`. Initialize it to the
  //       string which occurred in place of `:id` in the URL.
  //
  // const id = ...

  // TODO: Using `id`, get the corresponding sheet from the
  //       sheetService
  //
  const sheet = undefined; // <- replace with your code

  // TODO: Check for sheet not found, in
  //       which case send the appropriate error status code

  // TODO: Render the template to an HTML-formatted 'string'
  //       using 'viewSheet.ts'.
  //
  // const html = ...;

  // TODO: send the html string as the HTTP response

});

// Start the server

// TODO: [Assignment 4] Save the return value of `app.listen`
//   in a variable called `server`. You will need this to
//   set up websockets, below

app.listen(port, () => {
  const showServerLocMsg : string = 
  `Server listening for HTTP requests at port number ${port} \
on all this computer's IP addresses, i.e., on 0.0.0.0. \
(0.0.0.0 includes 127.0.0.1, aka "localhost").`
  console.log( showServerLocMsg );  
});

// TODO: [Assignment 4] Enable websockets on the HTTP server
//    by calling `websockets` with two inputs: (1) `server` (defined
//    above) and (2) the result of calling `wsServer` on 'sheetService'.
