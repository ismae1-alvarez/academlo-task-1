import { Request, Response } from "express"
import { UserServices } from "../services/user.services"
import { CustomError, RegisterDto, UpdateUserDto } from "../../domain"

export class UserController {
    constructor (
        private readonly userServices  :  UserServices
    ){}

    /**
     * @description este metodo devuelve un error al User, se debe usar en todos los catch
     * @param error error que se quiere devolver
     * @param res response objeto de express Response
    **/

    private handleErrror = (error:unknown, res:Response)=>{

        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({message : error.message})
        }
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    createUser = (req: Request, res: Response)=>{
        const [error, createUserDto]  = RegisterDto.create(req.body)
        if(error) return res.status(400).json({message : error})

        this.userServices.crateUser(createUserDto!)
            .then(user => res.status(200).json(user))
            .catch((error : unknown) => this.handleErrror(error, res))
    }

    getUser =(_: Request, res: Response)=>{
        this.userServices.findAllUsers()
            .then(user=>  res.status(200).json(user))
            .catch((error:unknown) => this.handleErrror(error, res))
    }

    getUserById = (req: Request, res : Response)=>{
        const {id} = req.params
        if(isNaN(+id)){
            return res.status(400).json({message : "El is debe ser un numero"})
        }

        this.userServices.findUserById(+id)
            .then(user => res.status(200).json(user))
            .catch((err : unknown)=> this.handleErrror(err, res))
    }
    
    updateUseById = (req: Request, res : Response)=>{
        const {id} = req.params
        const [error, updateUseById]= UpdateUserDto.update(req.body)
        if(isNaN(+id)){
            return res.status(400).json({message : "El is debe ser un numero"})
        }

        if(error) return res.status(422).json({messge : error})

        this.userServices.updateUser(updateUseById!, +id)
            .then(updateUser => res.status(200).json(updateUser))
            .catch((erro:unknown)=> res.status(500).json(erro))
    }

    deleteUserById = (req: Request, res : Response)=>{
        const {id} = req.params
        if (isNaN(+id)) {
            return res.status(400).json({ message: 'El id debe ser un numero' })
        }

        this.userServices.deleteUser(+id)
            .then(deleteUser=> res.status(204).json(deleteUser))
            .catch((err:unknown)=> res.status(500).json(err))


      
    }
}