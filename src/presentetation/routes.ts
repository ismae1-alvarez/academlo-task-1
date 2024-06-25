import { Router } from "express";
import { UserRoutes } from "./users/users.routes";
import { RepairsRoutes } from "./repairs/respairs.routes";

export class Approutes {
    static get routes():Router{
        const router = Router();

        router.use("/api/v1/users/", UserRoutes.routes)
        
        router.use("/api/v1/repairs/", RepairsRoutes.routes)

        return router
    }
}