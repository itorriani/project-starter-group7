import express, { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { Sheet, WithId, newSheet } from "@poly-sheets/types";
import { InMemorySheetService } from "sheet-svc";
import { readCSV } from "./csv.ts";

// TODO: [Assignment 2] add this import:
//
//   import apiRouter from "./api.ts"

// TODO: [Assignment 4] add these imports:
//
//   import websockets from "./websockets.ts"
//   import wsHandler from "./wsapi.ts";

const port = process.env.PORT || 3000;
const useSPA = !!process.env.STATIC;
const staticDir = process.env.STATIC || "public";
const templateDir = process.env.TEMPLATES || "public/templates";

const app = express();
const sheetService = new InMemorySheetService();

app.use(express.static(
  staticDir,
  useSPA ? { index: false } : {}
));
app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded

// TODO: [Assignment 2] create a router by calling apiRouter.
//
// const router = ...;

// TODO: [Assignment 2] Then, have `app` use `router` tos handle
//       all requests which begin with `/api`
//
// app.use( /*   */ );

if (useSPA) {
  // Explicitly send public/index.html for /, regardless of STATIC value
  app.get("/", (req: Request, res: Response) => {
    const indexHtml = path.resolve("public", "index.html");

    fs.readFile(indexHtml, { encoding: "utf8" })
      .then((html) => res.send(html));
  });

  // Send index.html in STATIC directory for any route starting with /app
  app.get(/\/app(.*)/, (req: Request, res: Response) => {
    // TODO: [Assignment 2] Complete this endpoint, following the
    //       example above, except use `staticDir` in place of "public"
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

  // TODO: Using `id`, get the corresponding sheet from the
  //       sheetService
  //
  const sheet = undefined; // <- replace with your code

  // TODO: Check for sheet not found, in
  //       which case send the appropriate error status code

  // TODO: Render the template with the sheet
  //       data. This returns a promise, so you must use .then()
  //       (or await) to access the actual HTML string. Once
  //       the HTML is available, send it as the response.
  //
  // const html = ...;

  // TODO: send the html string as the HTTP response

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
