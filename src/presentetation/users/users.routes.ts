import { Router } from "express";
import { UserController } from "./users.controller";
import { UserServices } from "../services/user.services";

export class UserRoutes{
    static get routes():Router{
        const router = Router();


        const services  =  new UserServices
        const controller = new UserController(services)

        router.get("/",controller.getUser)
        router.get("/:id", controller.getUserById)
        router.post("/", controller.createUser)
        router.patch("/:id", controller.updateUseById)
        router.delete("/:id", controller.deleteUserById)

        return router
    }
}