import { Value, ErrorValue, IntrinsicValue } from "@poly-sheets/types";

export type Function = (...args: Value[]) => Value;

const expectedNumber = new ErrorValue("expected number");
const expectedString = new ErrorValue("expected string");
const expectedBoolean = new ErrorValue("expected boolean");
const requiresSameType = new ErrorValue("arguments must be same type");

let functions: Record<string, Function> = {
  ABS: (x) => x.isNumber() ?
    new IntrinsicValue(Math.abs(x.toNumber())) :
    expectedNumber,
}

export function evalFunction(name: string, ...args: Value[]): Value {
  for (const a of args) {
    if (a.isError()) return a;
  }

  const fn: Function | undefined = functions[name];
  if (!fn) return new ErrorValue(`no such function: ${name}`);

  return fn(...args);
}
