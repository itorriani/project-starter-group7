import { Sparse } from "./sparse.ts";
import { Value } from "./value.ts";

export type ClientMessage =
  | ["PATCH_CELL_DATA", Sparse<Value>]
  | ["SUBSCRIBE_ROWS", number ]

export type ServerMessage =
  ["UPDATE_VALUES", Sparse<Value>]
