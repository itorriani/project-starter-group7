export interface AbsoluteReference {
  column: number;
  row: number;
}

export interface Reference extends AbsoluteReference {
  colrel?: boolean;
  rowrel?: boolean;
}
