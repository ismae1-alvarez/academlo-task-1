import { regularExps } from "../../../config";

export class RegisterDto {
    private constructor(
        public readonly name : string,
        public readonly email :  string,
        public readonly password  : string,
        public readonly role : string,
    ){}
  /**
     * @description esta metodo valida los datos para crear un User
     * @param object este objeto es el que recibimos de el cliente
     * @returns un arreglo con el mensaje de error y el objeto de tipo CreateVideogameDto
     *   
  **/

    static create ( object : {[key:string] : any}) : [string?, RegisterDto?]{
        const {name, email, password, role } = object

        if(!name) return ["Missing name", undefined];
        if(!email) return ["Missing email", undefined];
        if(!password) return ["Missing password", undefined];
        if(!role) return ["Missing role", undefined];
        if(!regularExps.email.test(email)) return ['Invalid email'];
        if(!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'];



        return [undefined, new RegisterDto(name, email, password, role)]
    }
}