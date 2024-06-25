import { User } from "../../data";
import { CustomError, UpdateUserDto } from "../../domain";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'   
}

export class UserServices {
    constructor(){}

     /**
         * description este metodo crea un videojuego
         * @param UserData este es el objeto que contiene los datos del videojuego
         * @returns retorna un videojuego creado, retorna una instancia del modelo videogame
         * @erros internal server
     **/

     async crateUser(userData:any){
        const user  =  new User();

        user.email  = userData.email;
        user.name =  userData.name;
        user.password  = userData.password;
        user.role =  userData.role;

        try {
            console.log("SE creo")
            return user.save()
        } catch (error) {
            console.log(error)
        }
     }


     async findAllUsers (){
        try {
            return await User.find({
                where : {
                    status : Status.ACTIVE
                }
            })
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
     }

     async findUserById (id:number){
         const user =  await User.findOne({
             where :{
                 id, 
                 status :  Status.ACTIVE
             }
              
         })

         if(!id){
            throw CustomError.notFound(`videogame with id ${id} not found`)
         }
        return user
     }

     async updateUser (userData:UpdateUserDto, id : number){
        const user  = await this.findUserById(id)

        user!.name  = userData.name.toLocaleLowerCase().trim();
        user!.email  = userData.email.toLocaleLowerCase().trim();
        user!.role  = userData.role.trim();
        try {
            return await user?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
        
     }

     async deleteUser(id:number){
        const user = await this.findUserById(id);//esto es soft delete
        //videogame.remove() elimimar el videojuego fisicamente

        user!.status = Status.INACTIVE
        try {
            return user?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
     }

}