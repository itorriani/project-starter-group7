<script lang="ts">
  import { defaultColumnName, newSheet } from "@poly-sheets/types";
    import Cell from "./Cell.svelte";
  let sheet = $state(newSheet(10, 50));
  let error = $state("");
  const ROW_CHUNK_SIZE = 50;

  // TODO: [Assignment 3] Declare variables `rowsLoaded`
  //       and `totalRows`. Compute them from the `sheet`
  //       data. Because we need these values to change
  //       whenever the sheet data changes, you must
  //       wrap the expressions with the `$derived()` rune:
  //
  // let rowsLoaded = $derived( /* code here  */ );
  // let totalRows = $derived( /*  code here */ );

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

    // ======== Assignment 3 ========
    //
    // TODO: Modify the above `fetch` call by adding the `limit`
    //       query parameter to the `url`. Use the value of
    //       `ROW_CHUNK_SIZE` as the limit.
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
            <th>{ `C$${c}` }<br>{ name }</th>
          {/each}
        </tr>
      </thead>
      <tbody onchange={ (event: Event) => {
        // TODO: handle change events by calling `handleChange`
        //       (see the <script> at end of file)
        //
      }}>
        {#each sheet.cells as row, r}
          <tr>
            <th>{ `R$${r}` }</th>
            {#each row as value, c}
              <td>
                <input value={ value } name={ `R$${r}C$${c}` } />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    {#if error}
      <p class="toast"> {error} </p>
    {/if}
  </section>
  <footer>
    <span>{ sheet.name }</span>
    <!-- ======== Assignment 3 ========

      TODO: Add a <span> here, containing either

      {rowsLoaded}/{totalRows} rows loaded
          OR
      {totalRows} rows

            depending on wheter all the rows have been
            loaded or not. Hint: look at the Svelte
            docs for  {#if } ... {:else} ... {/if}

      TODO: Add a <button> inside the <span>. It
            should only be displayed if there are
            more rows waiting to be loaded. When
            the button is clicked, call the
            `loadMoreRows` function defined below

            <button onclick={ /* event handler */ }>Load more</button>
    -->
  </footer>
</main>

<script module lang="ts">
  import type {
    AbsoluteReference,
    MoreRows,
    RCKey,
    Sheet,
    Sparse,
    Value
  } from "@poly-sheets/types";
  import { parseKey } from "@poly-sheets/types";

  // ======== Assignment 3 ========

  function loadMoreRows(
    sheetId: string,
    sheet: Sheet,
    maxRows: number
  ): Promise<MoreRows> {

    // TODO: compute the path portion and query parameters
    //       of the URL here, and replace the empty strings
    //       below:

    const path = ``;
    const start = ``;
    const limit = ``;

    return fetch(`/api/${path}?${start}&${limit}`)
      .then((res: Response) => {
        // TODO: check the response status. If it's not
        //       correct, throw an Error. On success,
        //       return the body as a JSON object
      })
      .then((json: unknown) => {
        const { rows, count } = json as MoreRows;
        // TODO: add the rows to the end of the
        //       sheet's cells. It's fine (and in fact
        //       preferable) if you mutate the cells array
        return json as MoreRows;
      });
  }

  function handleChange(
    event: Event,
    sheetId: string,
    sheet: Sheet
  ): Promise<SheetPatch> {
    // ======== Assignment 3 ========

    // TODO: Find the `<input>` element which changed to trigger
    //       this event. Hint: you will find it in the Event object,
    //       though you will need to use `as HTMLInputElement` to
    //       convince TypeScript it's actually an <input>
    //
    // const input = /* get from event */ as HTMLInputElement;

    // TODO: Compose the correct URL for our PATCH request
    //
    // const url = `/api/...`;

    // TODO: Define `value`, the string or number entered by the user.
    //       This is trickier than it sounds. `input.value` will
    //       contain the value as a string. But if the user enters
    //       a number, we want to convert it to a number. Hint:
    //       calling `parseFloat` on a string will return a number.
    //       If the conversion failed, the special value `NaN` is
    //       returned. You can check if a number is `NaN` with
    //       `isNan(n)`.
    //
    //  const value = ...

    // TODO: Define `key`, which identifies this cell in
    //       sparse patch format. This is made easier by way
    //       we named our `<input>` elements. Basically, the
    //       key is the input's name.
    //
    // const key = /* get name from input */ as RCKey;

    // TODO: Define `ref`, which gives us the row and column
    //       of the cell. We will need this when we update
    //       the local state.
    //
    // const ref: AbsoluteReference = parseKey(key);

    // TODO: Build the `Sparse<Value>` object, which we
    //       will send as the body of our request. It will have
    //       just one entry, mapping `key`: `value`.
    //
    // const patch: Sparse<Value> = ...;

    input.classList.toggle("pending", true);

    return fetch(url, {
      // TODO: build the options for the request. Fill in the
      //       following:
      //
      // method: ...,
      // headers: {
      //    ...
      // },
      // body: ...
    }).then((res) => {
      // TODO: check status, return JSON if ok, else throw
    }).then((json: unknown) => {
      input.classList.toggle("pending", false);
      // TODO: update the value of the one cell in sheet.cells
    }).catch((err) => {
      // TODO: if the request failed, we want to remove
      //       the value which the user entered, and restore
      //       the old value, which is still in sheet.cells
      //
      // const oldValue = ...;
      // input.value = oldValue === null ? "" : oldValue.toString();
      throw err;
    })
  }
</script>
