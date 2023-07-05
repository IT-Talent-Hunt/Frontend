export interface Select {
  id: number,
  name: string,
};

export interface InputField {
  id: number,
  type: string,
  name: string,
  value: string,
  message: string,
  isDirty: boolean,
  text: string,
  setlections?: Select[],
};
