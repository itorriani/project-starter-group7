import {
  AbsoluteReference, MoreRows,
  RCKey, Sparse, Value,
  parseKey, sparseKeyOf
} from "@poly-sheets/types";

export interface ComputeService {

  // Add or replace formulas managed by the service.
  // The service will compute the values
  // of any formulas, as well as any formulas
  // that use the result of these formulas.
  //
  // Return value: the set of all cell values which
  //    changes as a result of the formula updateValues

  updateFormulas(
    sheetId: string,
    formulas?: Sparse<string>
  ): Sparse<Value>;
  // Notifies the service of values changed in the sheet,
  // potentially triggering recalculation of downstream formulas.
  //
  // Return value: The set of all cell values which changed,
  //   as a result of, but not including the changes in `values`.

  updateValues(
    sheetId: string,
    values: Sparse<Value>
  ): Sparse<Value>;
}
