export default interface ISchema<T> {
  type: T;
  required?: boolean;
  default?: any;
  select?: boolean;
}

export interface IStringSchema<T> extends ISchema<T> {
  lowercase?: boolean;
  uppercase?: boolean;
  trim?: boolean;
  match?: RegExp;
  enum?: any[];
  minLength?: number;
  maxLength?: number;
}

export interface INumberSchema<T> extends ISchema<T> {
  min?: number;
  max?: number;
  enum?: any[];
}
