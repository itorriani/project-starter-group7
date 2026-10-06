import {
  AbsoluteReference,
  RCKey, Sparse, Value,
  parseKey, sparseKeyOf
} from "@poly-sheets/types";
import { DAG } from "./dag.ts";
import calculate from "./calc.ts";

export type Cache = Sparse<Value>;
export type LookupFunction = (ref: AbsoluteReference) => Value;

function lookupWithCache(
  cache: Sparse<Value>,
  lookup: LookupFunction,
): LookupFunction {
  return (ref: AbsoluteReference) => {
    const key = sparseKeyOf(ref);

    if (key in cache) {
      // use cached value
      return cache[key];
    } else {
      // call lookup and cache result
      return cache[key] = lookup(ref);
    }
  }
}

export function addToCache(
  cache: Cache,
  newValues: Sparse<Value>,
) {
  Object.assign(cache, newValues);
}

export function calculateWithCache(
  cache: Cache,
  dag: DAG,
  updatedKeys: RCKey[],
  lookup: LookupFunction
) {
  const computed: Sparse<Value> =
    calculate(dag, updatedKeys, lookupWithCache(cache, lookup));

  addToCache(cache, computed)

  return computed;
}
