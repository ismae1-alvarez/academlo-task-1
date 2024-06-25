import 'reflect-metadata'
import { envs } from "./config/env";
import { Approutes } from "./presentetation/routes";
import { Server } from "./presentetation/server";
import { PosgresDatabase } from './data';

(async()=>{
    main()
})();   



async function main(){



    const postgres = new PosgresDatabase({
        host : envs.DB_HOST,
        port : envs.DB_PORT,
        username :  envs.DB_USERNAME,
        password :  envs.DB_PASSWORD,
        database :  envs.DB_DATABASE,
    })

    await postgres.connect()
    
    const server = new Server({
        port : envs.PORT, 
        routes : Approutes.routes
    })

    await server.start()
}