export type ErrorValue = { error: string };
export type UnstableValue = { pending: StableValue };
export type StableValue = string | number | null | ErrorValue;
export type Value = StableValue | UnstableValue;

export function isError(value: Value): boolean {
  return typeof value === "object"
    && value !== null
    && "error" in value;
}

export function isUnstable(value: Value): boolean {
  return typeof value === "object"
    && value !== null
    && "pending" in value;
}
