export interface CrudModel {
  id: number;
  content: string;
  createdDate: Date;
  type: number;
  email: string;
  count: number;
  activated?: Boolean;
  languages: any[];
}
