export class CustomError {
    constructor(type, message, cause) {
        this.type = type;
        this.message = message;
        this.cause = cause;
    }
}

export class CustomErrorType {
    constructor(name) {
        this.name = name;
    }

    static DatabaseError = new CustomErrorType("DatabaseError");
}