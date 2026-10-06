<script lang="ts">
  import { newSheet, sparseKeyOf, Value } from "@poly-sheets/types";
  import { wsHandleChange, wsSubscribeChanges } from "./ws-client.ts";
  import { type Connection } from "./websocket.ts";
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

  let sheetId = $state(path[2]);

  $effect(() => {

    const url = `api/sheets/${sheetId}`;

    fetch(url)
      .then((res: Response) => {
        if (res.ok){
          res.json()
        } else {
          res.status(400).send(`Sheet with id ${sheetId} cannot be found`);
        }
      })
      .then((json: unknown) => {
        const { cells } = json as { cells: SerializedValue[][] };
        const cellValues = convertCellValues(cells);

        sheet = cellValues;
      })
      .catch((err: Error) => {
        error = err.message;
      });

    // ======== Assignment 3 ========
    //
    // TODO: Modify the above `fetch` call by adding the `limit`
    //       query parameter to the `url`. Use the value of
    //       `ROW_CHUNK_SIZE` as the limit.
  })

  let wsConnection: Connection | undefined;

  // ======== Assignment 4 ========

  // TODO: write an $effect() which calls wsSubscribeChanges.
  //       Use the relevant state variables above as arguments,
  //       so the effect is re-executed if any of them change.
  //       You will need two callback functions: the first,
  //       should set `wsConnection` above; the second should
  //       modify the referenced cell in `sheet.cells`

  // ======== Assignment 6 =========
  //
  // TODO: define a $state variable to toggle the formulas
  //       on and off. The initial value should be false
  //
  // let showFormulas = ...

</script>

<main>
  <header>
    <h1>Poly-Sheets</h1>
    <!--
      TODO: [ Assignment 6 ] Add a labeled checkbox bound to the value of
            `showFormulas`. Write an event handler so that
            when a user changes the value, the `showFormulas`
            variable is updated to the current state of the
            checkbox.
    -->
  </header>
  <section class="sheet">
    <table class="sticky">
      <thead>
        <tr>
          <th></th>
          {#each sheet.columns as val, num}
            <th>{num}</th>
          {/each}
        </tr>
        <tr>
          <th></th>
          {#each sheet.columns as col}
            <th> {escape(col)}</th>
          {/each}
        </tr>
      </thead>
      <tbody onchange={ (event: Event) => {
        // TODO: [Assignment 3] handle change events by calling `handleChange`
        //       (see the <script> at end of this file)

        // TODO: [Assignment 4] if wsConnection is set, call `wshandleChange`
        //       instead of handleChange

        // TODO: [Assignment 6] add a `class` attribute to the <tbody>
        //       to control displaying formulas. Set class="hide-formulas"
        //       if `showFormulas` is false, and class="show-formulas"
        //       if `showFormulas` is true.
      }}>
        {#each sheet as row, i}
        <tr>
          <th>{i}</th>
          {#each row as col}
            <td>{escape(col.toString())}</td>
          {/each}
        </tr>
        {/each}
        <!--

          TODO: [Assignment 6] add a formula= property to the
                Cell component instance, like this:

                  formula={ sheet.formulas
                    ? sheet.formulas[sparseKeyOf({row: r, column: c})]
                    : "" }
        -->
      </tbody>
    </table>
    {#if error}
      <p class="toast"> {error} </p>
    {/if}
  </section>
  <footer>
    <span>{ sheet.name }</span>
    <!-- ======== Assignment 3 ========

      TODO: Add a second <span> here, containing either

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
    Sparse
  } from "@poly-sheets/types";
  import { parseKey, PendingValue } from "@poly-sheets/types";

  // Converts rows of values that were sent as JSON
  // into instances of class Value, which is how we store
  // values in memory
  function convertCellValues(cells: SerializedValue[][]): Value[][] {
    return cells.map(
      (row) => row.map(
        (v) => Value.fromJSON(v)
      ));
  }

  function loadMoreRows(
    sheetId: string,
    sheet: Sheet,
    maxRows: number
  ): Promise<MoreRows> {
    // ======== Assignment 3 ========

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
        const { rows, count } = json as {count: number, rows: SerializedValue[][]};
        // TODO: add the rows to the end of the sheet's cells.
        //       It's fine (and in fact preferable) if you
        //       mutate the cells array. As with the $effect you
        //      wrote above, be sure to convert the row data to Values.

        // ======== Assignment 6 ========
        //
        // TODO: If the json includes `formulas`, merge them with
        //       the Sparse<string> `sheet.formulas`. DO NOT create
        //       a new object and assign that to sheet.formulas.
        //       Hint: look up the Object.assign() JavaScript function.
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
    //       the static method Value.fromUserInput can handle
    //       this conversion for you
    //
    //  const value = ...

    // TODO: Define `key`, which identifies this cell in
    //       sparse patch format. This is made easier by way
    //       we named our `<input>` elements. Basically, the
    //       key is the input's name.
    //
    // const key = /* get name from input */ as RCKey;

    // TODO: compute `ref` from the `key`. An AbsoluteReference
    //       gives us the row and column of the cell.
    //       We will need this when we update the local state.
    //       Hint: look at the `parseKey()` function imported above
    //
    // const ref: AbsoluteReference = ...

    // TODO: Save the old value of the cell referenced by `ref`.
    //       We will need this in case the patch fails on the
    //       server.
    //
    // const oldValue: Value = ...

    // TODO: Build the `Sparse<Value>` object, which we
    //       will send as the body of our request. It will have
    //       just one entry, mapping `key`: `value`.
    //
    // const patch: Sparse<Value> = ...;

    // TODO: Let the user know that their change is pending
    //       communication with the server. Do this by creating
    //       a `PendingValue` from `value` and assigning the cell
    //       referenced by `ref` in `sheet.cells`
    //
    // ...

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
      // TODO: update the value of the one cell in sheet.cells
      //
      // ...
    }).catch((err) => {
      // TODO: if the request failed, we want to remove
      //       the value which the user entered, and restore
      //       `input.value` from `oldValue`
      //
      // ...
      throw err;
    })
  }
</script>
