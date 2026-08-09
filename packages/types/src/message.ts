import { Sparse } from "./sparse.ts";
import { Value, SerializedValue } from "./value.ts";

export type ClientMessage =
  | ["PATCH_CELL_DATA", Sparse<SerializedValue>]
  | ["SUBSCRIBE_ROWS", number ]

export type ServerMessage =
  ["UPDATE_VALUES", Sparse<SerializedValue>]
