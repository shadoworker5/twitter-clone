export class User{
    constructor(
        public name: string,
        public pseudo: string,
        public email: string,
        public password?: string,
        public hobbies?: string[]
    ){}
}