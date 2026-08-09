import { escape } from "html-escaper";
import { Sheet, Value } from "@poly-sheets/types";

export function viewSheet(sheet: Sheet): string {
  return `
    <html lang="en">
    <head>
    <link rel="stylesheet" href="/styles/sheet.css" />
    </head>
    <body>
      ${viewTable(sheet)}
    </body>
    </html>
  `;
}

function viewTable(sheet: Sheet): string {
  return `
    <table>
      <thead>
        <tr>
          <th></th>
          ${viewColumnNumbers(sheet.columns)}
        <tr>
          <th></th>
          ${viewColumnHeaders(sheet.columns)}
        </tr>
      </thead>
      <tbody>
        ${viewRows(sheet.cells)}
      </tbody>
    </table>
  `;
}


function viewColumnHeaders(columns: string[]): string {
  // TODO: Write a function which outputs a string
  //       containing a series of `<th>` elements, each
  //       of which contains the name of the column,
  //       which is provided in the `columns` array
  //
  // example input: columns=["A", "B", "C"]
  // output: "<th>A</th><th>B</th><th>C</th>"
}

function viewColumnNumbers(columns: string[]): string {
  // TODO: Write a function which outputs a string
  //       containing a series of `<th>` elements, one
  //       for each column in `columns`. The content
  //       inside the `<th>` should be the column number.
  //       (start with column 0 for the first column)
  //
 // example input: columns=["A", "B", "C"]
  // output: "<th>0</th><th>0</th><th>0</th>"
}

function viewRows(rows: Value[][]): string{
  // TODO: Write a function which outputs a string
  //       containing a series of `<tr>` elements,
  //       one for each row of data in rows.
  //       Each row should contain a `<th>` with the
  //       row number, followed by a series of
  //       `<td>` elements.
  //
  //       Each `<td>` element should contain a
  //             `<input value="...">`
  //       with the value as given in the row data.
  //       (Hint: you can call .toString() on a Value
  //       to get its string representation.)
  //
  // example input: rows = [
  //    ["A", 93.5, 100],
  //    ["A-", 89.5, 93.5 ]
  //    ]
  // output:
  //   <tr>
  //     <th>0</th>
  //     <td><input value="A"></td>
  //     <td><input value="93.5"></td>
  //     <td><input value="100"></td>
  //   </tr>
  //   <tr>
  //     <th>1</th>
  //     <td><input value="A-"></td>
  //     <td><input value="89.5"></td>
  //     <td><input value="93.5"></td>
  //   </tr>

}
