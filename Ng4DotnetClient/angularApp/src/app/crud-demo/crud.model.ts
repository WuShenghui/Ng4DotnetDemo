export interface CrudModel {
  id: number;
  content: string;
  date: Date;
  type: number;
  email: string;
  count: number;
  activated?: Boolean;
  languages: string;
}
