interface CustomErrorInterface extends Error {
    statusCode: number;
}
export default class CustomError implements CustomErrorInterface {
    public name: string;
    public message: string;
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        this.name = "CustomError";
        this.message = message;
        this.statusCode = statusCode;
    }
}
