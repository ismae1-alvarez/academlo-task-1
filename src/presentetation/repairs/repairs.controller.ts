import { CustomError } from "../../domain";
import { CreateRepairsDto } from "../../domain/dtos/repairs/create.repairs.dto";
import { UpdateRepairsDto } from "../../domain/dtos/repairs/update.repairs.dto";
import { RepairsServices } from "../services/repairs.services";
import { Request, Response } from "express";



export class RepairsController {
    constructor (
        private readonly repairsServices : RepairsServices
    ){}

    private handleError = (err:unknown, res:Response)=>{
        if(err instanceof CustomError){
            return res.status(err.statusCode).json({message : err.message})
        }
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    createRepairs = (req:Request, res:Response)=>{
        const [err, createRepairs] =  CreateRepairsDto.create(req.body)
        if(err) return res.status(400).json({message :err});

        this.repairsServices.createRepairs(createRepairs)
            .then(repairs => res.status(200).json(repairs))
            .catch((err:unknown)=> this.handleError(err, res))
    }

    getAllRepairs =(_:Request, res:Response)=>{
        this.repairsServices.findAllRapairs()
            .then(repirs => res.status(200).json(repirs))
            .catch((err:unknown)=> this.handleError(err, res))
    }

    getRepairsOneId =(req:Request, res:Response)=>{
        const {id} = req.params;
        if(isNaN(+id)){
            return res.status(400).json({message : "El is debe ser un numero"})
        }

        this.repairsServices.findRepairsOneById(+id)
            .then(repairs => res.status(200).json(repairs))
            .catch((err:unknown)=> this.handleError(err, res))
    }

    updateRepairsById =(req:Request, res:Response)=>{
        const {id} = req.params;
        const [error, updateRepairsById] = UpdateRepairsDto.update(req.body)
        if(isNaN(+id)){
            return res.status(400).json({message : "El is debe ser un numero"})
        }

        if(error) return res.status(422).json({messge : error})
        
        this.repairsServices.updateRepairById(updateRepairsById!, +id)
            .then(repairs => res.status(200).json(repairs))
            .catch((erro:unknown)=> res.status(500).json(erro))
    }

    deleteRepairsById =(req:Request, res:Response)=>{
        const {id} = req.params
        if (isNaN(+id)) {
            return res.status(400).json({ message: 'El id debe ser un numero' })
        }

        this.repairsServices.deletePairsById(+id)
            .then(deleteRepairs=> res.status(204).json(deleteRepairs))
            .catch((err:unknown)=> res.status(500).json(err))
    }
}