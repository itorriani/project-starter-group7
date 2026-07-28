import { html, ServerRenderedTemplate } from "@lit-labs/ssr";
import { Sheet } from "@poly-sheets/types";

export function viewSheet(sheet: Sheet): ServerRenderedTemplate {
  return html`
<html lang="en">
<head>
<link rel="stylesheet" href="/styles/sheet.css" />
</head>
<body>
  <table>
    <thead>
      <tr>
        <th></th>
        ${sheet.columns.map(
          // TODO: function to render a single column name in a <th>
          (col: string) => html`...`
        )}
      </tr>
    </thead>
    <tbody>
      ${ sheet.cells.map(
        // TODO: function to render a row of data as a <tr> containing
        (row, r) =>
        html`<tr>
          <th>${r}</th>
          ${
            // TODO: write an expression that uses `map()` with a
            //       function to generate the <td>s for the row
          }
        </tr>`
      )}
    </tbody>
  </table>
</body>
</html>
`
}
