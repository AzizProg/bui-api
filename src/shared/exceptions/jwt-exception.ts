import { HttpException, HttpStatus } from "@nestjs/common";

export class JwtException extends HttpException{
    constructor(message:string,status:HttpStatus){
        super(message,status)
    }
}

export class AccessTokenNotFoundException extends JwtException{
    constructor(message){
super(message,HttpStatus.BAD_REQUEST)
    }
}

export class AccessTokenNotAvailable extends JwtException{
    constructor(message){
super(message,HttpStatus.UNAUTHORIZED)
    }
}