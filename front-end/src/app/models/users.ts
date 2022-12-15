import { UserParams } from "../interface/users";


export class User {
    public id!: number;
    public email!: string;
    public name!: string;
    public password!: string;
    public type!: string;

    constructor(params: UserParams  = {}) {
        Object.assign(this, params);
      }
}