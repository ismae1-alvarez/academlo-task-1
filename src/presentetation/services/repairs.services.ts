import { Repairs } from "../../data";
import { CustomError, UpdateUserDto } from "../../domain";
import { UpdateRepairsDto } from "../../domain/dtos/repairs/update.repairs.dto";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
}


export class RepairsServices {
    constructor (){}

    async createRepairs (repairsData:any){
        const repairs  =  new Repairs();

        repairs.user_id =  repairsData.user_id
        repairs.date =  repairsData.date


        try {
            console.log("SE creo")
            return repairs.save()
        } catch (error) {
            console.log(error)
        }
    }

    async findAllRapairs (){
        try {
            return await Repairs.find({
                where : {
                    status : Status.PENDING
                }
            })
            
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
    }

    async findRepairsOneById (id:number){
        const repairs = await Repairs.findOne({
            where :{
                id, 
                status: Status.PENDING
            }
        })
        if(!id){
            throw CustomError.notFound(`videogame with id ${id} not found`)
         }
        return repairs
        
    }

    async updateRepairById(userData:UpdateRepairsDto, id:number){
        const repairs =  await this.findRepairsOneById(id)

        repairs!.status = userData.status.trim()

        try {
            return await repairs?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
    }

    async deletePairsById(id:number){
        const repairs = await this.findRepairsOneById(id);

        repairs!.status = Status.CANCELLED
        try {
            return repairs?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
            
        }
    }
    
}