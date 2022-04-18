class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super(); //Error class ko inherit kiya ha isliya parent ka constructor bi call karaga
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message) {
       
        return new CustomErrorHandler(409, message);
    }


    static wrongCredentials(message = "Username or password is wrong!") {
        return new CustomErrorHandler(401, message);
    }


    static unAuthorized(message = "unAuthorized") {
        return new CustomErrorHandler(401, message);
    }

    static notfound(message = "404 Not Found") {
        return new CustomErrorHandler(404, message);
    }

    static serverError(message = "Internal Server Error") {
        return new CustomErrorHandler(500, message);
    }


    
}

export default CustomErrorHandler;