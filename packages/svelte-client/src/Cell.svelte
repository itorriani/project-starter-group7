<script lang="ts">
  import { type Value, sparseKeyOf } from "@poly-sheets/types";

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
        value.isEmpty() ? "empty" :
        typeof value.toJSON()
  );
  let inputName = $derived(sparseKeyOf({row, column}));
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
