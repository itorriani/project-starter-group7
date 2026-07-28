import express, { Request, Response } from "express";
import path from "node:path";
import { renderToString } from "./render.ts";
import { Sheet, WithId, newSheet } from "@poly-sheets/types";
import { readCSV } from "./csv.ts";
import { viewSheet } from "./viewSheet.ts";
import sheetService from "./sheet-svc.ts";

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
const fileDir = path.join(staticDir, "files");

const app = express();
app.use(express.static(staticDir));

app.get("/app", (req: Request, res: Response) => {
  const { file } = req.query;

  if (!file) {
    const sheet = newSheet(10, 50); // 10x50 sheet with no data
    // TODO: call sheetService.create here and pass then
    //       result to redirectToSheet
  } else {
    readCSV(file as string, fileDir)
      // TODO: save the sheet and redirect
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
  const { id } = req.params;

  const sheet: Sheet | undefined =
    // TODO: get the sheet from the sheetService

  // TODO: check for sheet not found 

  const promise = renderToString(viewSheet(sheet);

  // TODO: send the response HTML when the promise is resolved.
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
