<script lang="ts">
  import { type Value } from "@poly-sheets/types";

  interface Props {
    row: number;
    column: number;
    value: Value;
    formula?: string;
  }

  let { value, row, column, formula }: Props = $props();
  let className = $derived(
    value.isUnstable() ? "pending" :
      value.isError() ? "error" :
        value.isEmpty() ? "empty" : typeof value
  );
  let inputName = $derived(`R$${row}C$${column}`);
  let maybePending = $derived(
    value.isUnstable() ? "pending" : ""
  );

</script>

<td class={className}>
  {#if formula }
    <output>{value}</output>
    <textarea name={inputName}>{`=${formula}`}</textarea>
  {:else}
    <input class={maybePending}
      name={inputName}
      value={value}
      disabled={value.isUnstable()}
    />
  {/if }
</td>

<style>
  td {
    font-family: 'Courier New', Courier, monospace;
    vertical-align: baseline;
    line-height: 1em;

    &.number {
      text-align: right;
    }

    > input {
      display: block;
      text-align: inherit;
      border: none;
      background: none;
      font-size: inherit;
      font-family: inherit;
      margin: .25em;
    }

    .pending {
      opacity: 50%;
    }
  }
</style>
