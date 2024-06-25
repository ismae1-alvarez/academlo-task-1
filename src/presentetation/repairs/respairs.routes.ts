import { Router } from "express";
import { RepairsServices } from "../services/repairs.services";
import { RepairsController } from "./repairs.controller";

export class RepairsRoutes{
    static get routes():Router{
        const router = Router();

        const services =  new RepairsServices;
        
        const controller  =  new RepairsController(services)



        router.get("/", controller.getAllRepairs);
        router.get("/:id", controller.getRepairsOneId);
        router.post("/", controller.createRepairs);
        router.patch("/:id", controller.updateRepairsById);
        router.delete("/:id", controller.deleteRepairsById);


        return router;
    }
    

}