export interface User {
    password: string;
    username: string;
    id: string;
  }


export type InsertRow<Obj> = Omit<Obj, 'id'>


