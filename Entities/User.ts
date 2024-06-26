
export type UserLogin = {
    userName: string,
    password: string
}

export class UserLoginEntity {
    userName: string;
    password: string;

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }
}