<script lang="ts">
  import { newSheet } from "@poly-sheets/types";
  let sheet = $state(newSheet(10, 50));


  // path: /app/:id  --> ["", "app", "#######-####-..."]
  const path = location.pathname.split("/");

  // TODO: Declare a variable `sheetId`. Initialize it using
  //       the $state() rune, and giving it the value of
  //       `id` from the URL path
  //
  // let sheetId = ...

  $effect(() => {
    // TODO: Use the value of `sheetId` to construct a
    //       the endpoint URL: /api/sheets/<id>. No
    //       protocol or hostname required because
    //       it's the same server we got this page from.
    //
    // const url = ...
    //
    // TODO: Use fetch() to make the request. That
    //       returns a Promise<Response> so you will
    //       need to use .then() (or await) to access
    //       the Response object. The response's body
    //       will contain a JSON-encoded Sheet object,
    //       which should be assigned to `sheet` (see above).
    //
    // fetch(url)
    //   .then( ... )
    //   ...

  })
</script>

<main>
  <header>
    <h1>Poly-Sheets</h1>
  </header>
  <section class="sheet">
    <table class="sticky">
    <thead>
      <tr>
        <th class="origin"></th>
        {#each sheet.columns as name, c}
          <th>{ `C${c}` }<br>{ name }</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sheet.cells as row, r}
        <tr>
          <th>{ `R${r}` }</th>
          {#each row as value, c}
            <td>
              <input value={ value } name={ `R${r}C${c}` } />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  </section>
  <footer>
    <span>{ sheet.name }</span>
  </footer>
</main>
