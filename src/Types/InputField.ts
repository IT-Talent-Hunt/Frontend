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
