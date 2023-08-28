export interface Select {
  id: number,
  name: string,
};

export interface InputFieldType {
  id: number,
  type: string,
  name: string,
  value: string,
  message: string,
  isDirty: boolean,
  isSuccess: boolean,
  text: string,
  selections?: Select[],
};

export interface SelectFieldType {
  id: number,
  type: string,
  value: string,
  text: string,
  selections?: Select[],
};
