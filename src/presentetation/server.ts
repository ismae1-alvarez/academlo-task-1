import express, { Router } from "express"

interface Options {
    port : number;
    routes :  Router;
}

export class Server {
    public readonly app = express()
    private readonly port:number;
    private readonly rutes : Router;

    constructor(options:Options){
        this.port =  options.port;
        this.rutes = options.routes;
    }

    async start(){
        // midelware
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        this.app.use(this.rutes)

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port : ${this.port}`)
        })
    }
}