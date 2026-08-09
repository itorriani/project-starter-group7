export abstract class Value {
  abstract toString(): string;
  abstract toNumber(): number;
  abstract toJSON(): PrimitiveType | object;
  isError(): boolean { return false; }
  isUnstable(): boolean { return false; }
  isEmpty(): boolean { return true; }
  isNumber(): boolean { return false; }

  static fromJSON(
    json: SerializedValue

  ): Value {
    if (typeof json === "object" && json !== null) {
      if ("error" in json)
        return new ErrorValue(json.error)
      if ("pending" in json)
        return new PendingValue(new IntrinsicValue(json.pending));
    }

    return new IntrinsicValue(json);
  }

  static fromUserInput(
    input: string
  ): IntrinsicValue {
    const numVal = parseFloat(input);
    const value = Number.isNaN(numVal) ? input : numVal;
    return new IntrinsicValue(value);
  }
}

export type PrimitiveType = string | number | boolean | null;
export type SerializedValue =
  | PrimitiveType
  | { error: string }
  | { pending: PrimitiveType };

export class IntrinsicValue extends Value {
  value: PrimitiveType;

  constructor(v: PrimitiveType = null) {
    super();
    this.value = v;
  }

  toString() {
    return typeof this.value === "object" ? "" : this.value.toString();
  }
  toNumber() {
    return typeof this.value === "number" ? this.value : parseFloat(this.toString())
  }
  toJSON() { return this.value; }
  isEmpty() { return this.value === null || this.value === ""; }
  isNumber() { return typeof this.value === "number"; }
}

export class ErrorValue extends Value {
  message: string;

  constructor(m: string) {
    super();
    this.message = m;
  }

  toString() { return `#ERR: ${this.message}` }
  toNumber() { return Number.NaN; }
  toJSON() { return { error: this.message }; }
  isError() { return true; }
}

export class PendingValue extends Value {
  placeholder: IntrinsicValue;

  constructor(p: Value) {
    super();
    if (p instanceof PendingValue)
      this.placeholder = p.placeholder;
    else if (p instanceof IntrinsicValue)
      this.placeholder = p;
    else
      this.placeholder = new IntrinsicValue();
  }

  toString() { return `«${this.placeholder}»`; }
  toNumber() { return Number.NaN; }
  toJSON() { return { pending: this.placeholder.toJSON() }; }
  isUnstable() { return true; }
  isEmpty() { return false; }
}
